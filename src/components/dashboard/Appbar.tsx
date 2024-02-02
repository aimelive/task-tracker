import { Popover } from "antd"

const DashboardAppbar = () => {
    return (
        <nav className="flex gap-3 items-center">
            <div className="flex-grow">
                <h2>Hi,</h2>
                <span className="text-sm">You're welcome back to <b>Task Tracker</b></span>
            </div>
            <Popover
                placement="bottom"
                title="Account"
                content={
                    <div className="flex flex-col gap-1">
                        <div className="pt-2">
                            <button className="bg-primary text-white p-2 rounded-md disabled:bg-gray-300 w-full"
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.reload();
                                }}>
                                {<span>Logout</span>}
                            </button>
                        </div>
                    </div>
                }
                trigger="click"
            >
                <div className="flex gap-2 p-2 px-4 bg-primary-light bg-opacity-50 items-center cursor-pointer hover:bg-primary hover:bg-opacity-10">
                    <div>
                        <div className="bg-primary bg-opacity-60 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-extrabold text-white">
                            <span>A</span>
                        </div>
                    </div>
                    <div className="flex flex-col -space-y-1">
                        {/* <p>{user.firstName} {user.lastName}</p> */}
                        <span className="text-sm font-semibold">{localStorage.getItem("role")}</span>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z" fill="black" />
                    </svg>
                </div>
            </Popover>
        </nav>
    )
}

export default DashboardAppbar