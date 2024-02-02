import { toast } from "react-hot-toast";

export const toastMessage = (message: string, type: 'error' | 'info' = 'error') => toast(() => {
  return <div className={` ${type === 'info' ? 'bg-primary' : 'bg-red-600'} text-white text-sm p-3 px-5 text-center rounded-xl`}>
    <p dangerouslySetInnerHTML={{ __html: message }}></p>
  </div>;
}, { id: type });
