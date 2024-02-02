import { Link } from "react-router-dom"
import { SideBarITem } from "../../@types"
import DashboardIcon from "./icons/DashboardIcon"
import ProductsIcon from "./icons/ProductsIcon"
import SidebarMenuItem from "./SidebarMenuItem"

const sidebarItems: SideBarITem[] = [
    {
        icon: DashboardIcon,
        title: 'Home',
        url: '',
    },
    {
        icon: ProductsIcon,
        title: 'Tasks',
        url: '/tasks',
    },
];

const DashboardSidebar = () => {
    return (
        <>
            <div>
                <Link to='/dashboard' className="flex gap-2 items-center">
                    {/* <img src="/logo.png" alt="My Logo" height={40} width={40} className="" /> */}
                    <h1 className="text-2xl font-[800] text-primary">Task Tracker</h1>
                </Link>
            </div>
            <div className="flex flex-col mt-16 gap-3">
                {
                    sidebarItems.map((item, index) => (<SidebarMenuItem item={item} key={index} />))
                }
            </div>
        </>
    )
}

export default DashboardSidebar