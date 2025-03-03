"use client";
import { useState } from "react";
import axios from "axios";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function AddMachineForm({ onClose, onMachineAdded }) {
    const [newMachine, setNewMachine] = useState({
        equipmentName: "",
        equipmentType: "",
        serialNumber: "",
        internalFactory: "",
        hostname: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMachine(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await axios.post("http://localhost:8080/machines", newMachine);
            onMachineAdded();
            onClose();
        } catch (error) {
            console.error("Error saving machine:", error);
        }
    };

    const addIcon = {
        bgColor: "bg-green-100",
        svg: (
            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
        )
    };

    return (
        <ConfirmationModal
            isOpen={true}
            onClose={onClose}
            onConfirm={handleSave}
            title="Add New Machine"
            confirmButtonText="Save"
            confirmButtonColor="green"
            icon={addIcon}
        >
            <div className="space-y-4 mt-4">
                <input
                    type="text"
                    name="equipmentName"
                    placeholder="Equipment Name"
                    value={newMachine.equipmentName}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    name="equipmentType"
                    placeholder="Equipment Type"
                    value={newMachine.equipmentType}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    name="serialNumber"
                    placeholder="Serial Number"
                    value={newMachine.serialNumber}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    name="internalFactory"
                    placeholder="Internal Factory"
                    value={newMachine.internalFactory}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    name="hostname"
                    placeholder="Hostname"
                    value={newMachine.hostname}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                />
            </div>
        </ConfirmationModal>
    );
}