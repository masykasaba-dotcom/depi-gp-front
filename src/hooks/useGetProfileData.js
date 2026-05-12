import { AuthContext } from './../store/AuthContext';
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import apiUrl from '../lib/apiUrl';
import axios from "axios";
export default function useGetProfileData() {
  const {token} = use(AuthContext)
  async function handleGetProfile() {
    return await axios.get(`${apiUrl}profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["handleGetProfile",token],
    queryFn: handleGetProfile,
  });

  const profileData = data?.data?.data;

  return {
    profileData,
    isError,
    isLoading
  }
}
