"use client";
import { useState } from "react";
import axios from "axios";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function DeleteMachineButton({ machineId, onMachineDeleted }) {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/machines/${machineId}`);
            setShowModal(false);
            if (onMachineDeleted) onMachineDeleted();
        } catch (error) {
            console.error("Error deleting machine:", error);
        }
    };

    const deleteIcon = {
        bgColor: "bg-red-100",
        svg: (
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        )
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="text-red-600 hover:text-red-900"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </button>

            <ConfirmationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                title="Delete Machine"
                message="Are you sure you want to delete this machine? This action cannot be undone."
                confirmButtonText="Delete"
                confirmButtonColor="red"
                icon={deleteIcon}
            />
        </>
    );
}