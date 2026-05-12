import React, { useCallback } from 'react'
import { AuthContext } from '../store/AuthContext';
import { use } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import apiUrl from '../lib/apiUrl';

export default function useAddresses() {
  const { token } = use(AuthContext);
   async function getAllAddresses() {
      return await axios.get(
        `${apiUrl}addresses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  
    const { data, refetch, isLoading, isError } = useQuery({
      queryKey: [`getAllAddresses`, token],
      queryFn: getAllAddresses,
    });
  
    const addresses = data?.data?.data;
    const handleDeleteAddress = useCallback(
      async function (id) {
        await axios
          .delete(
            `${apiUrl}addresses/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((data) => {
            refetch();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      [token],
    );
    async function handleAddAddress(newAddress) {
      await axios
        .post(
          `${apiUrl}addresses`,
          newAddress,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          refetch();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  
    const handleUpdateAddress = useCallback( async function (updatedAddress, id) {
      await axios
        .put(
          `${apiUrl}addresses/${id}`,
          updatedAddress,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          refetch();
        })
        .catch((err) => {
          console.log(err);
        });
    },[token])

    return{
      addresses,
      isLoading,
      isError,
      handleAddAddress,
      handleDeleteAddress,
      handleUpdateAddress
    }
}
