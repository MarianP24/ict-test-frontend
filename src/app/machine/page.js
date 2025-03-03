import MachineTable from "@/components/machines/MachineTable";

export default function MachinePage() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Machine List</h1>
            <MachineTable />
        </div>
    );
}