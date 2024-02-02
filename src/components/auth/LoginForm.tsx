import * as Yup from 'yup';
import { Formik } from 'formik';
import { Fetcher } from '../../lib/fetcher';
import TextInput from './TextInput';

interface Props {
    onSwitch: () => void;
}

const LoginForm = ({ onSwitch }: Props) => {
    return (
        <div className="w-full">
            <div className="bg-primary-light p-6 rounded-3xl text-center flex flex-col gap-2">
                <h1 className="text-primary font-bold text-3xl">Welcome back !</h1>
                <p className="text-grey">Fill in your credentials</p>
            </div>
            <Formik
                initialValues={{ email: '', password: '', submit: null }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Invalid email').required('Email is required'),
                    password: Yup.string().min(4).max(15).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const result = await Fetcher.post("users/login", {
                            ...values,
                            email: values.email || undefined,
                        });


                        localStorage.setItem("token", result.data?.token);

                        window.location.href = "/dashboard";

                        setSubmitting(false);
                        setStatus({ success: true });
                    } catch (err: any) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message || "Something went wrong abasa" });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
                    return <form className="p-12 flex gap-5 flex-col" noValidate onSubmit={handleSubmit}>
                        {errors.submit && <p className="bg-red-500 p-2 px-4 text-white text-sm rounded-xl text-center" dangerouslySetInnerHTML={{ __html: errors.submit }}></p>}

                        <TextInput
                            name="email"
                            label="Email"
                            placeholder="Enter Your email"
                            error={errors.email}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isTouched={Boolean(touched.email)}
                        />
                        <TextInput
                            name="password"
                            label="Password"
                            placeholder="Enter Your Password"
                            error={errors.password}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isTouched={Boolean(touched.password)}
                        />

                        <button type="submit" className="bg-primary disabled:bg-gray-400 text-white p-3 rounded-2xl w-full" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Log In"}</button>
                    </form>
                }}
            </Formik>

            <div className="flex justify-center gap-2 text-sm">
                <span>Don't have an account?</span> <button className="text-primary hover:underline font-semibold" onClick={onSwitch}>Register here</button>
            </div>
        </div>
    )
}

export default LoginForm