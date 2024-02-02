import { useQuery } from "@tanstack/react-query";
import { Task } from "../../@types";
import { ApiException, Fetcher } from "../../lib/fetcher";
import DataWidget from "../shared/DataWidget";
import { useState } from "react";
import { toastMessage } from "../shared/toast";
import { Modal, Popover } from "antd";
import { Formik } from 'formik';
import * as Yup from "yup";
import TextInput from "../auth/TextInput";


const SubTaks = ({ currentTask }: { currentTask: Task }) => {
    const { isLoading, data: subTasks, error, refetch } = useQuery<any, ApiException, { data: Task[] }>({
        queryKey: ["sub-tasks", currentTask.taskId],
        queryFn: () => Fetcher.get("/subtask/" + currentTask.taskId),
        retry: false,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSubTask, setCurrentSubTask] = useState<Task | null>(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = (hasResult: boolean = false, edit = false) => {
        setIsModalOpen(false);
        setCurrentSubTask(null);
        if (hasResult) {
            toastMessage(edit ? 'Sub Task updated successfully' : "New sub task has added successfully!", 'info');
            refetch();
        }
    }

    return (<>
        <div className="flex items-center justify-between mb-4">
            <p>{currentTask.title}</p>
            <button className="bg-primary text-xs p-2 px-4 text-white" onClick={showModal}>Add</button>
        </div>
        <DataWidget isLoading={isLoading} error={error} retry={refetch}>
            {subTasks?.data?.map((task, index) => {
                return <div key={index} className={`border-l-2 ${task.completed ? 'border-green-500' : 'border-primary'} p-2.5 bg-primary/10 mb-2`}>
                    <div className='flex items-center gap-4 justify-between'>
                        <div>
                            <p className='font-semibold'>{task.title}</p>
                            <p className='text-sm'>{task.description}</p>
                        </div>
                        <div>
                            <Popover
                                placement="bottomRight"
                                title=""
                                content={
                                    <div className="flex flex-col gap-1">
                                        {
                                            [
                                                {
                                                    hide: task.completed,
                                                    text: "Completed",
                                                    onClick: async () => {
                                                        try {
                                                            await Fetcher.put(`subtask/complete/${task.subTaskId}`, {});
                                                            refetch();
                                                        } catch (error: any) {
                                                            toastMessage(error.message);
                                                        }
                                                    }
                                                },
                                                {
                                                    text: "Edit", onClick: () => {
                                                        setCurrentSubTask(() => task);
                                                        showModal();
                                                    }
                                                },
                                                {
                                                    text: "Delete",
                                                    onClick: async () => {
                                                        try {
                                                            await Fetcher.delete(`subtask/${task.subTaskId}`);
                                                            refetch();
                                                        } catch (error: any) {
                                                            toastMessage(error.message);
                                                        }
                                                    }
                                                }
                                            ].map((action) => {
                                                if (action.hide) return <></>
                                                return <button className='text-left p-1 min-w-[140px] hover:bg-primary hover:text-white rounded px-4' key={action.text} onClick={action.onClick}><span>{action.text}</span></button>
                                            })
                                        }
                                    </div>
                                }
                                trigger="hover"
                            >
                                <button className='p-2 hover:bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center'>
                                    <div className='flex flex-col gap-0.5'>
                                        <div className='bg-primary h-[2px] w-[2px]'></div>
                                        <div className='bg-primary h-[2px] w-[2px]'></div>
                                        <div className='bg-primary h-[2px] w-[2px]'></div>
                                    </div>
                                </button>
                            </Popover>
                        </div>
                    </div>
                </div>
            })}
        </DataWidget>
        <Modal
            title={<p className="text-lg">{currentSubTask ? <>Edit <b>{currentSubTask.title}</b></> : "Add"} sub task</p>}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => handleCancel()}
            footer={false}
            bodyStyle={{ padding: '2px' }}
            destroyOnClose
        >

            <Formik
                initialValues={{ title: currentSubTask?.title || '', description: currentSubTask?.description || '', submit: null }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().max(50).required('Title is required'),
                    description: Yup.string().max(50).required('Description is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, setValues, setTouched }) => {
                    try {
                        if (currentSubTask) {
                            await Fetcher.put('subtask/' + currentSubTask.subTaskId, {
                                ...values,
                            });
                        }
                        else {
                            await Fetcher.post('subtask/create/' + currentTask.taskId, {
                                ...values,
                            });
                        }

                        handleCancel(true, Boolean(currentSubTask));
                        setValues({ title: '', description: '', submit: null });
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
                            name="title"
                            label="Sub task Title"
                            placeholder="Enter task title"
                            error={errors.title}
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isTouched={Boolean(touched.title)}
                            className="outline-none p-3 px-4 bg-primary bg-opacity-10 w-full mb-0.5"
                        />
                        <TextInput
                            type="text"
                            name="description"
                            label="Description"
                            placeholder="Enter sub task description"
                            error={errors.description}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isTouched={Boolean(touched.description)}
                            className="outline-none p-3 px-4 bg-primary bg-opacity-10 w-full mb-0.5"
                        />

                        <div className="flex justify-end pt-2">
                            <button type="submit" className="bg-primary disabled:bg-gray-400 text-white p-2.5 px-6 flex items-center gap-2 hover:bg-opacity-80" disabled={isSubmitting}>
                                <span>
                                    {isSubmitting ? "Please wait..." : "Submit"}
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

export default SubTaks;