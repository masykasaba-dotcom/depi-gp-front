import { useActionState } from "react";
import Question from "../components/Question";
import useGetSurvey from "../hooks/useGetSurvey";
import axios from "axios";
import apiUrl from "../lib/apiUrl";
import { use } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router";

export default function Survey() {
  const { survey, isLoading } = useGetSurvey();
  const {token} = use(AuthContext)

  const navigate = useNavigate()
  async function submitSurveyAction(prevState, formData) {
    const skinType = formData.get("skin_type");
    const sensitivityLevel = formData.get("sensitivity_level");
    const concerns = formData.getAll("concerns");
    const climate = formData.get("climate");
    const routineComplexity = formData.getAll("routine_complexity");

    let errors = [
      {
        error: false,
      },
      {
        error: false,
      },
      {
        error: false,
      },
      {
        error: false,
      },
      {
        error: false,
      },
    ];

    const savedValues = [
      {
        value: skinType,
      },
      {
        value: sensitivityLevel,
      },
      {
        value: concerns,
      },
      {
        value: climate,
      },
      {
        value: routineComplexity,
      },
    ];
    if (!skinType) {
      errors[0].error = true;
    }

    if (concerns.length === 0) {
      errors[2].error = true;
    }

    if (!climate) {
      errors[3].error = true;
    }

    if (routineComplexity.length === 0) {
      errors[4].error = true;
    }

    if (
      errors[0].error ||
      errors[2].error ||
      errors[3].error ||
      errors[4].error
    ) {
      return {
        errors,
        savedValues,
      };
    }
    await axios.post(`${apiUrl}survey/submit`, {
      answers: [
        {
          question_id: 1,
          answer_value: skinType,
        },
        {
          question_id: 2,
          answer_value: sensitivityLevel === 0 ? 'Low' : sensitivityLevel === 1 ? 'Medium' : 'High',
        },
        {
          question_id: 3,
          answer_value: concerns,
        },
        {
          question_id: 4,
          answer_value: climate,
        },
        {
          question_id: 5,
          answer_value: routineComplexity,
        },
      ],
    },{
      headers : {
        Authorization: `Bearer ${token}`,
      }
    }).then(data => {
      navigate('/profile')
    }).catch(err => {
      console.log(err.response)
    });
    return { errors: null };
  }
  const [formState, formAction, pending] = useActionState(submitSurveyAction, {
    errors: null,
  });

  if (isLoading) {
    return <SkinQuizSkeleton />;
  }
  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <div className="mx-auto max-w-3xl bg-base-100 p-8 rounded-2xl shadow-md border border-base-300">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">{survey.title}</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Answer a few simple questions to understand your skin better.
          </p>
        </div>

        <form action={formAction} className="space-y-8">
          {survey.questions.map((question) => (
            <Question
              key={question.question_id}
              mappingKey={question.mapping_key}
              questionId={question.question_id}
              questionTitle={question.question_text}
              questionType={question.question_type}
              options={question.options}
              error={
                formState.errors &&
                formState.errors[question.question_id - 1].error
              }
              defaultValue={
                formState.errors &&
                formState?.savedValues[question.question_id - 1].value
              }
            />
          ))}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={pending}
            className="w-full mt-4 py-3 rounded-xl btn btn-neutral font-medium
        hover:opacity-90 transition"
          >
            {pending ? 'Submiting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

function SkinQuizSkeleton() {
  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <div className="mx-auto max-w-2xl bg-base-100 p-8 rounded-2xl shadow-md border border-base-300 animate-pulse">
        {/* HEADER */}
        <div className="mb-8 space-y-3">
          <div className="h-7 w-1/2 bg-base-300 rounded"></div>
          <div className="h-4 w-2/3 bg-base-300 rounded"></div>
        </div>

        <div className="space-y-8">
          {/* QUESTION 1 */}
          <div className="space-y-3">
            <div className="h-4 w-1/3 bg-base-300 rounded"></div>

            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-base-300 rounded"></div>
              <div className="h-4 w-1/3 bg-base-300 rounded"></div>
              <div className="h-4 w-1/5 bg-base-300 rounded"></div>
            </div>
          </div>

          {/* QUESTION 2 */}
          <div className="space-y-3">
            <div className="h-4 w-1/2 bg-base-300 rounded"></div>
            <div className="h-3 w-1/4 bg-base-300 rounded"></div>

            <div className="space-y-2">
              <div className="h-4 w-1/3 bg-base-300 rounded"></div>
              <div className="h-4 w-1/4 bg-base-300 rounded"></div>
              <div className="h-4 w-1/2 bg-base-300 rounded"></div>
            </div>
          </div>

          {/* QUESTION 3 */}
          <div className="space-y-4">
            <div className="h-4 w-1/3 bg-base-300 rounded"></div>

            <div className="h-2 w-full bg-base-300 rounded"></div>

            <div className="flex justify-between">
              <div className="h-3 w-10 bg-base-300 rounded"></div>
              <div className="h-3 w-12 bg-base-300 rounded"></div>
              <div className="h-3 w-10 bg-base-300 rounded"></div>
            </div>
          </div>

          {/* BUTTON */}
          <div className="h-10 w-full bg-base-300 rounded-xl mt-4"></div>
        </div>
      </div>
    </div>
  );
}
