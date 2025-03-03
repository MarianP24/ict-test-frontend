"use client";
import { useState } from "react";
import axios from "axios";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function EditMachineButton({ machine, onMachineUpdated }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        equipmentName: machine.equipmentName,
        equipmentType: machine.equipmentType,
        serialNumber: machine.serialNumber,
        internalFactory: machine.internalFactory,
        hostname: machine.hostname
    });

    const handleEdit = async () => {
        try {
            await axios.put(`http://localhost:8080/machines/${machine.id}`, formData);
            setShowModal(false);
            if (onMachineUpdated) onMachineUpdated();
        } catch (error) {
            console.error("Error updating machine:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const editIcon = {
        bgColor: "bg-blue-100",
        svg: (
            <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-8.586 8.586H4v-3.828l8.586-8.586z" />
                <path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
        )
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="text-blue-600 hover:text-blue-900"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                </svg>
            </button>

            <ConfirmationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleEdit}
                title="Edit Machine"
                confirmButtonText="Save Changes"
                confirmButtonColor="blue"
                icon={editIcon}
            >
                <div className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Equipment Name
                        </label>
                        <input
                            type="text"
                            name="equipmentName"
                            value={formData.equipmentName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Equipment Type
                        </label>
                        <input
                            type="text"
                            name="equipmentType"
                            value={formData.equipmentType}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Serial Number
                        </label>
                        <input
                            type="text"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Internal Factory
                        </label>
                        <input
                            type="text"
                            name="internalFactory"
                            value={formData.internalFactory}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Hostname
                        </label>
                        <input
                            type="text"
                            name="hostname"
                            value={formData.hostname}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                            required
                        />
                    </div>
                </div>
            </ConfirmationModal>
        </>
    );
}