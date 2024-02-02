import { Link, useLocation } from "react-router-dom"
import { SideBarITem } from "../../@types"


const SidebarMenuItem = ({ item }: { item: SideBarITem }) => {
    const { pathname } = useLocation();
    const path = pathname.replace('/dashboard', '');
    const isActive: boolean = path === item.url;

    return (
        <Link to={`/dashboard${item.url}`} className={`flex items-center gap-2 py-2 ${isActive ? 'text-primary font-bold' : ''} hover:bg-primary-light hover:pl-2.5 transition-all duration-300 rounded-md hover:bg-opacity-40`}>
            <div>
                <item.icon active={false} />
            </div>
            <span>{item.title}</span>
        </Link>
    )
}

export default SidebarMenuItem