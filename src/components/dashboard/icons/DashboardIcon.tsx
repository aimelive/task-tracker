import { IconProps } from "../../@types";

const DashboardIcon = ({ active }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={active ? 'item-active' : ''}>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.335 22C19.724 22 22 19.622 22 16.084V7.916C22 4.378 19.724 2 16.335 2H7.666C4.277 2 2 4.378 2 7.916V16.084C2 19.622 4.277 22 7.666 22H16.335ZM16.335 20.5H7.666C5.136 20.5 3.5 18.767 3.5 16.084V7.916C3.5 5.233 5.136 3.5 7.666 3.5H16.335C18.865 3.5 20.5 5.233 20.5 7.916V16.084C20.5 18.767 18.865 20.5 16.335 20.5Z" fill={active ? "#287BCB" : "black"} />
            <rect x="6.5" y="9.75" width="2" height="8" rx="1" fill={active ? "#287BCB" : "black"} />
            <rect x="11" y="6.25" width="2" height="11.5" rx="1" fill={active ? "#287BCB" : "black"} />
            <rect x="15.5" y="9.25" width="2" height="8.5" rx="1" fill={active ? "#287BCB" : "black"} />
        </svg>

    );
}

export default DashboardIcon