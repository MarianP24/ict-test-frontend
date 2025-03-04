"use client";
import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [availableRoles] = useState(["ROLE_USER", "ROLE_ADMIN", "ROLE_MODERATOR"]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await AuthService.getAllUsers();
            setUsers(response.data);
        } catch (error) {
            setError("Failed to load users. " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setSelectedRoles(user.roles || []);
    };

    const handleRoleChange = (role) => {
        setSelectedRoles(prev =>
            prev.includes(role)
                ? prev.filter(r => r !== role)
                : [...prev, role]
        );
    };

    const handleUpdateRoles = async () => {
        if (!editingUser) return;

        try {
            await AuthService.updateUserRoles(editingUser.id, selectedRoles);

            setUsers(users.map(user =>
                user.id === editingUser.id
                    ? { ...user, roles: [...selectedRoles] }
                    : user
            ));

            showNotification(`Roles updated for ${editingUser.username}`, "success");
            setEditingUser(null);
        } catch (error) {
            showNotification(
                "Failed to update roles: " + (error.response?.data?.message || error.message),
                "error"
            );
        }
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
        }, 3000);
    };

    const cancelEdit = () => {
        setEditingUser(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mx-4" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">User Management</h1>

            {notification.show && (
                <div className={`px-4 py-3 rounded relative mb-4 ${
                    notification.type === "success"
                        ? "bg-green-100 border border-green-400 text-green-700"
                        : "bg-red-100 border border-red-400 text-red-700"
                }`}>
                    <span className="block sm:inline">{notification.message}</span>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Roles
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {user.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {editingUser?.id === user.id ? (
                                    <div className="space-y-2">
                                        {availableRoles.map((role) => (
                                            <label key={role} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRoles.includes(role)}
                                                    onChange={() => handleRoleChange(role)}
                                                    className="form-checkbox h-4 w-4 text-blue-600"
                                                />
                                                <span className="text-sm text-gray-700">{role}</span>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-x-1">
                                        {user.roles?.map((role) => (
                                            <span
                                                key={role}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                            >
                                                    {role}
                                                </span>
                                        ))}
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {editingUser?.id === user.id ? (
                                    <div className="space-x-2">
                                        <button
                                            onClick={handleUpdateRoles}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Edit Roles
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}