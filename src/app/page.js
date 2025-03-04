// app/toberena.js
"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AuthService from "@/services/AuthService";

// Import components
import MachineTable from "@/components/machines/MachineTable";
import Login from "@/app/login/Login";
import Register from "@/app/register/Register";
import UserManagement from "@/components/UserManagement";
import Navbar from "@/components/Navbar";

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Handle root path redirect
        if (pathname === "/") {
            router.push("/books");
            return;
        }

        // Handle authentication
        const isAuthenticated = AuthService.isAuthenticated();
        const isAdminRoute = pathname.startsWith("/admin");
        const isPublicRoute = ["/login", "/register"].includes(pathname);

        if (!isAuthenticated && !isPublicRoute) {
            router.push("/login");
            return;
        }

        // Handle admin routes
        if (isAdminRoute) {
            const isAdmin = AuthService.hasRole("ROLE_ADMIN");
            if (!isAdmin) {
                router.push("/books");
                return;
            }
        }
    }, [pathname, router]);

    // Render content based on path
    const renderContent = () => {
        switch (pathname) {
            case "/login":
                return <Login />;
            case "/register":
                return <Register />;
            case "/books":
                return (
                    <>
                        <Navbar />
                        <MachineTable />
                    </>
                );
            case "/admin/users":
                return (
                    <>
                        <Navbar />
                        <UserManagement />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {renderContent()}
        </div>
    );
}