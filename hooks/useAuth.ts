"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/app/store/features/authSlice";
import { RootState } from "@/app/store/store";

export function useAuth(requireAuth = true) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    
    if (token && !isAuthenticated) {
      // If token exists but not authenticated in Redux, restore session
      dispatch(login({ 
        user: { email: "user@example.com" }, // You might want to decode JWT or fetch user data
        token 
      }));
    } else if (!token && requireAuth) {
      // If no token and authentication required, redirect to login
      router.push('/login');
    }
  }, [dispatch, isAuthenticated, requireAuth, router]);

  return { isAuthenticated };
}