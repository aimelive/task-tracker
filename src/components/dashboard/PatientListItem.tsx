import { useState } from "react";
import { Patient } from "../../@types";
import { Modal } from "antd";
import * as Yup from 'yup';
import { Formik } from "formik";
import { Fetcher } from "../../lib/fetcher";
import TextInput from "../auth/TextInput";
import { toastMessage } from "../shared/toast";
import GiveMedicineButton from "./GiveMedicineButton";


const PatientListItem = ({ index, patient }: { index: number, patient: Patient }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = (hasResult: boolean = false) => {
        setIsModalOpen(false);
        if (hasResult) {
            toastMessage("Patient has consulted successfully!", 'info');
        }
    }

    return (<>
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                <p className="my-2">{patient.name}</p>
            </td>
            <td>{patient.username}</td>
            <td>{patient.gender}</td>
            <td>{patient.age}</td>
            <td>{patient.role}</td>
            <td>
                {localStorage.getItem("role") === "PHARMACIST" ?
                    <GiveMedicineButton patient={patient} /> :
                    <button
                        onClick={showModal}
                        className="bg-primary text-white text-xs p-2 px-4 my-2">
                        CONSULT
                    </button>
                }
            </td>
        </tr>
        <Modal
            title={<p className="text-lg">Consult patient {patient.name}</p>}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => handleCancel()}
            footer={false}
            bodyStyle={{ padding: '2px' }}
            centered
        >
            <Formik
                initialValues={{ disease: '', description: '', submit: null }}
                validationSchema={Yup.object().shape({
                    disease: Yup.string().max(50).required('Disease is required'),
                    description: Yup.string().max(50).required('Description is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, setValues, setTouched }) => {
                    try {
                        await Fetcher.post('physicians/add-consultation', {
                            ...values,
                            patientUsername: patient.username,
                        });

                        handleCancel(true);
                        setValues({ disease: '', description: '', submit: null });
                        setSubmitting(false);
                        setStatus({ success: true });
                        setTouched({});
                    } catch (err: any) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message || "Something went wrong!" });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
                    return <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-3 my-4">
                        {errors.submit && <p className="bg-red-500 p-2 px-4 text-white text-sm text-center" dangerouslySetInnerHTML={{ __html: errors.submit }}></p>}
                        <TextInput
                            type="text"
                            name="disease"
                            label="Disease"
                            placeholder="Enter disease name"
                            error={errors.disease}
                            value={values.disease}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isTouched={Boolean(touched.disease)}
                            className="outline-none p-3 px-4 bg-primary bg-opacity-10 w-full mb-0.5"
                        />
                        <TextInput
                            name="description"
                            label="Disease description"
                            placeholder="Enter disease description"
                            error={errors.description}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isTouched={Boolean(touched.description)}
                            className="outline-none p-3 px-4 bg-primary bg-opacity-10 w-full resize-none"
                            multiLines
                        />

                        <div className="flex justify-end pt-2">
                            <button type="submit" className="bg-primary disabled:bg-gray-400 text-white p-2.5 px-6 flex items-center gap-2 hover:bg-opacity-80" disabled={isSubmitting}>
                                <span>
                                    {isSubmitting ? "Please wait..." : "Add Disease"}
                                </span>
                            </button>
                        </div>
                    </form>
                }}
            </Formik>
        </Modal>
    </>
    );
}

export default PatientListItem;