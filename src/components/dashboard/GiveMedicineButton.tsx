import { useState } from "react";
import { Medicine, Patient } from "../../@types";
import { toastMessage } from "../shared/toast";
import { Modal } from "antd";
import { ApiException, Fetcher } from "../../lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import DataWidget from "../shared/DataWidget";

const GiveMedicineButton = ({ patient }: { patient: Patient }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = (hasResult: boolean = false, message?: string) => {
        setIsModalOpen(false);
        if (hasResult) {
            toastMessage(message || "Patient has consulted successfully!", 'info');
        }
    }
    return (<>
        <button
            onClick={showModal}
            className="bg-primary text-white text-xs p-2 px-4 my-2">
            GIVE MEDICINE
        </button>
        <Modal
            title={<p className="text-lg">Give medicine to {patient.name}</p>}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => handleCancel()}
            footer={false}
            bodyStyle={{ padding: '2px' }}
        >
            <GiveMedicineForm patient={patient} onClose={() => { handleCancel(true, "Patient has given new medicine successfully!") }} />
        </Modal>
    </>
    );
}


const GiveMedicineForm = ({ patient, onClose }: { patient: Patient, onClose: () => void }) => {
    const { isLoading, data: medicinesData, error, refetch } = useQuery<any, ApiException, { data: Medicine[] }>({
        queryKey: ["medicines"],
        queryFn: () => Fetcher.get("/pharmacists/medicines"),
        retry: false,
    });

    return <>
        <DataWidget isLoading={isLoading} error={error} retry={refetch}>
            {!medicinesData?.data?.length ? <p>No medicines added yet, please add medicine first!</p> :
                <div>
                    {medicinesData.data.map((item, index) => {
                        return <div key={index} className="flex items-center gap-2 hover:bg-primary hover:bg-opacity-10 p-2 cursor-pointer" onClick={async () => {
                            try {
                                await Fetcher.post("/pharmacists/giveMedicine", {
                                    patientUsername: patient.username,
                                    name: item.medName,
                                });
                                onClose();
                            } catch (error: any) {
                                toastMessage(error.message);
                            }
                        }}>
                            <div className="p-2"><div className="bg-primary bg-opacity-50 p-2 w-10 h-10 text-center text-white font-bold rounded-full">{index + 1}</div></div>
                            <div>
                                <p className="font-semibold text-lg">Name: {item.medName}</p>
                                <p>Price: {item.medPrice}</p>
                                <p>Description: {item.medExpiration}</p>
                            </div>
                        </div>
                    })}
                </div>}
        </DataWidget>
    </>
}

export default GiveMedicineButton