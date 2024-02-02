import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import DashboardSidebar from "./Sidebar";
import DashboardAppbar from "./Appbar";


const DashboardLayout = () => {
    const [token, setToken] = useState<string | undefined>();
    const nav = useNavigate();

    useEffect(() => {
        const localAuth = localStorage.getItem("token") || undefined;

        if (localAuth) {
            setToken(localAuth);
        } else {
            nav("/");
        }
    }, [token]);

    if (!token) return <></>

    return (
        <main className="flex bg-primary bg-opacity-10 gap-0.5">
            <div className="w-[250px] h-screen sticky top-0 bg-white p-5 rounded">
                <DashboardSidebar />
            </div>
            <div className="flex flex-col w-full">
                <div className="bg-white p-4 py-2 sticky  top-0 w-full z-30">
                    <DashboardAppbar />
                </div>
                <div className="flex-grow p-4 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout