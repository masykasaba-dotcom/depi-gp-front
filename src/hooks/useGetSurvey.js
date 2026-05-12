import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import apiUrl from "../lib/apiUrl";

export default function useGetSurvey() {
  async function getSurveyQuestions() {
    return await axios.get(`${apiUrl}survey/active`);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["getSurveyQuestions"],
    queryFn: getSurveyQuestions,
  });

  const survey = data?.data?.data;

  return {
    survey,
    isLoading,
  };
}
