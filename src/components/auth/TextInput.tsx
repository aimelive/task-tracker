import { ChangeEventHandler, FocusEventHandler, ReactNode } from "react";

interface Props {
    type?: string;
    name: string;
    label: string;
    placeholder: string;
    error?: string,
    value: string | number;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    isTouched: boolean;
    className?: string;
    multiLines?: boolean;
    suffix?: ReactNode;
    disabled?: boolean;
}

const TextInput = ({ name, label, placeholder, error, value, onChange, onBlur, isTouched, className, type, multiLines, suffix, disabled }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <label>{label}</label>
            <div className="w-full">
                {multiLines ?
                    <textarea
                        id={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        placeholder={placeholder}
                        className={className}
                        rows={4}
                    ></textarea> :
                    <div className="relative">
                        <input
                            type={type || name}
                            id={name}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            disabled={disabled}
                            name={name}
                            className={className || `border outline-none p-3 px-4 rounded-xl w-full mb-1.5 ${error && isTouched ? "border-red-500" : "focus:border-primary focus:border-opacity-50"}`}
                            placeholder={placeholder}
                        />
                        {suffix && <div className="absolute top-0 bottom-0.5 right-0 flex items-center px-4"><span>{suffix}</span></div>}
                    </div>
                }
                {isTouched && error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
        </div>
    )
}

export default TextInput