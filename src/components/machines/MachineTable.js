"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AddMachineButton from "./AddMachineButton";
import EditMachineButton from "./EditMachineButton";
import DeleteMachineButton from "./DeleteMachineButton";

export default function MachineTable() {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        fetchMachines();
    }, []);

    const fetchMachines = async () => {
        try {
            const response = await axios.get("http://localhost:8080/machines/all");
            setMachines(response.data);
        } catch (error) {
            console.error("Error fetching machines:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 relative">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Machine Management System</h1>
                    <p className="text-gray-500 mt-2">A modern collection of machines</p>
                </div>
                <AddMachineButton onMachineAdded={fetchMachines} />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                    <tr className="bg-blue-600 text-white uppercase text-sm">
                        <th scope="col" className="px-6 py-4 text-left font-medium">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-4 text-left font-medium">
                            Equipment Name
                        </th>
                        <th scope="col" className="px-6 py-4 text-left font-medium">
                            Equipment Type
                        </th>
                        <th scope="col" className="px-6 py-4 text-left font-medium">
                            Serial Number
                        </th>
                        <th scope="col" className="px-6 py-4 text-left font-medium">
                            Internal Factory
                        </th>
                        <th scope="col" className="px-6 py-4 text-left font-medium">
                            Hostname
                        </th>
                        <th scope="col" className="px-6 py-4 text-left font-medium">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {machines.map((machine) => (
                        <tr
                            key={machine.id}
                            className="hover:bg-gray-50 transition-colors duration-200"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {machine.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                                {machine.equipmentName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {machine.equipmentType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {machine.serialNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {machine.internalFactory}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {machine.hostname}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <EditMachineButton
                                        machine={machine}
                                        onMachineUpdated={fetchMachines}
                                    />
                                    <DeleteMachineButton
                                        machineId={machine.id}
                                        onMachineDeleted={fetchMachines}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}