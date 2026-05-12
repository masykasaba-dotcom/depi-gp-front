import React from 'react'
import { use } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router';
import Cookies from "js-cookie";
export default function useSignOut() {
  const { setToken, token } = use(AuthContext);
  
  const navigate = useNavigate();
  
 

  function handleSignOut() {
    
    Cookies.remove('tkn')
    setToken(null);
    navigate("/sign-in");
    }
    
    return { token,handleSignOut }
}
