import { ReactNode } from "react";
import { ApiException } from "../../lib/fetcher";

interface Props {
    isLoading: boolean;
    error: ApiException | null;
    children: ReactNode;
    retry: () => void;
}

const DataWidget = ({ isLoading, error, children, retry }: Props) => {
    if (isLoading) {
        return (
            <div className="">
                <p>Loading, please wait...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <div className="bg-red-50 text-center p-4 flex flex-col items-center justify-center gap-4">
                    😮
                    {/* <IconExclamationCircle size={40} className="text-red-500" /> */}
                    <p>{error.message}</p>
                    <button onClick={retry} className="text-sm px-6 py-2 bg-red-500 text-white">Retry</button>
                </div>
            </div>
        );
    }
    return <>{children}</>;
}

export default DataWidget;