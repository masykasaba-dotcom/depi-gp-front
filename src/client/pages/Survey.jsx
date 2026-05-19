import { useActionState, useRef } from "react";
import Question from "../features/profile/Question";
import useGetSurvey from "../hooks/useGetSurvey";
import axios from "axios";
import apiUrl from "../../shared/utils/apiUrl";
import { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export default function Survey() {
  const { survey, isLoading } = useGetSurvey();
  const { token } = use(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef(null);

  async function submitSurveyAction(prevState, formData) {
    if (!survey?.questions) return { errors: null };

    // Build answers dynamically from real survey questions
    const answers = [];
    const errors = survey.questions.map(() => ({ error: false }));
    const savedValues = survey.questions.map(() => ({ value: null }));
    let hasError = false;

    for (let i = 0; i < survey.questions.length; i++) {
      const q = survey.questions[i];
      let value;

      if (q.question_type === "multiple_choice") {
        value = formData.getAll(q.mapping_key);
        savedValues[i].value = value;
        if (value.length === 0) {
          errors[i].error = true;
          hasError = true;
        }
      } else if (q.question_type === "scale") {
        // Convert numeric scale index to label string
        const rawIndex = parseInt(formData.get(q.mapping_key) || "0");
        value = q.options[rawIndex] || q.options[0];
        savedValues[i].value = rawIndex;
      } else {
        value = formData.get(q.mapping_key);
        savedValues[i].value = value;
        if (!value) {
          errors[i].error = true;
          hasError = true;
        }
      }

      if (value && (Array.isArray(value) ? value.length > 0 : true)) {
        answers.push({
          question_id: q.question_id,
          answer_value: Array.isArray(value) ? value.join(",") : value,
        });
      }
    }

    if (hasError) {
      return { errors, savedValues };
    }

    try {
      await axios.post(
        `${apiUrl}survey/submit`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Invalidate both profile and skin profile caches
      queryClient.invalidateQueries({ queryKey: ["handleGetProfile"] });
      queryClient.invalidateQueries({ queryKey: ["skinProfile"] });
      navigate("/survey-result");
    } catch (err) {
      console.error(err.response?.data);
    }

    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(submitSurveyAction, {
    errors: null,
  });

  if (isLoading) {
    return <SkinQuizSkeleton />;
  }
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24 px-6">
      <div className="mx-auto max-w-3xl bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-[#E8E4DE]">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="font-display-lg text-[32px] text-[#06373A] mb-3">{survey.title}</h1>
          <p className="font-body-md text-[14px] text-[#555a5b]">
            Answer a few simple questions to understand your skin better and get personalized recommendations.
          </p>
        </div>

        <form action={formAction} className="space-y-12">
          {survey.questions.map((question, index) => (
            <Question
              key={question.question_id}
              mappingKey={question.mapping_key}
              questionId={question.question_id}
              questionTitle={question.question_text}
              questionType={question.question_type}
              options={question.options}
              error={
                formState.errors &&
                formState.errors[index]?.error
              }
              defaultValue={
                formState.savedValues &&
                formState.savedValues[index]?.value
              }
            />
          ))}

          {/* BUTTON */}
          <div className="pt-8 border-t border-[#E8E4DE]">
            <button
              type="submit"
              disabled={pending}
              className="w-full py-4 rounded-xl bg-[#032b26] text-white font-semibold text-[13px] tracking-widest uppercase hover:bg-[#06373A] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {pending ? 'Submitting...' : 'Analyze My Skin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SkinQuizSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24 px-6">
      <div className="mx-auto max-w-3xl bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-[#E8E4DE] animate-pulse">
        {/* HEADER */}
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="h-8 w-64 bg-[#EAEAEA] rounded mb-4"></div>
          <div className="h-4 w-96 bg-[#EAEAEA] rounded"></div>
        </div>

        <div className="space-y-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-4">
              <div className="h-6 w-1/2 bg-[#EAEAEA] rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="h-14 w-full bg-[#EAEAEA] rounded-xl"></div>
                <div className="h-14 w-full bg-[#EAEAEA] rounded-xl"></div>
                <div className="h-14 w-full bg-[#EAEAEA] rounded-xl"></div>
                <div className="h-14 w-full bg-[#EAEAEA] rounded-xl"></div>
              </div>
            </div>
          ))}

          {/* BUTTON */}
          <div className="pt-8 border-t border-[#E8E4DE]">
            <div className="h-14 w-full bg-[#EAEAEA] rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
