"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthService from '../services/AuthService';

export default function PrivateRoute({ children }) {
    const router = useRouter();
    const isAuthenticated = AuthService.isAuthenticated();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return isAuthenticated ? children : null;
}