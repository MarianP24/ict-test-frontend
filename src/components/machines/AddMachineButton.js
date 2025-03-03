"use client";
import { useState } from "react";
import AddMachineForm from "./AddMachineForm";

export default function AddMachineButton({ onMachineAdded }) {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowForm(true)}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
                <span className="mr-2 text-xl">+</span> Add New Machine
            </button>

            {showForm && (
                <AddMachineForm
                    onClose={() => setShowForm(false)}
                    onMachineAdded={onMachineAdded}
                />
            )}
        </>
    );
}