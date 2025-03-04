"use client";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthService from '../services/AuthService';

export default function Navbar() {
    const router = useRouter();
    const currentUser = AuthService.getCurrentUser();
    const isAdmin = AuthService.isAdmin();

    const handleLogout = () => {
        AuthService.logout();
        router.push('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 flex items-center">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <Link
                                href="/machines"
                                className="ml-2 text-white text-xl font-semibold"
                            >
                                Machine Manager
                            </Link>
                        </div>

                        {/* Main Navigation Links */}
                        <div className="flex space-x-4">
                            <Link
                                href="/machines"
                                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Machines
                            </Link>

                            {/* Admin-only Links */}
                            {isAdmin && (
                                <Link
                                    href="/admin/users"
                                    className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    User Management
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* User Status and Actions */}
                    {currentUser && (
                        <div className="flex items-center">
                            <div className="text-white mr-4 text-sm">
                                <span className="block">Welcome, {currentUser.username || 'User'}</span>
                                {currentUser.roles && currentUser.roles.includes('ROLE_ADMIN') && (
                                    <span className="text-xs text-yellow-300">Administrator</span>
                                )}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}