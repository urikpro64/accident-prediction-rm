import { Bell, CircleUserRound, History, Home, Monitor, MonitorUp } from "lucide-react";

export function SideNav() {
    return (
        <div className="flex flex-col bg-white w-fit h-full text-black p-2 justify-between font-semibold">
            <div className="flex flex-col w-full h-fit ">
                <button className="flex flex-row items-center p-2 active:bg-blue-600 active:text-white rounded-md text-left">
                    <Home className="mr-1 h-5" />
                    <div>Dashboard</div>
                </button>
                <a href="/home" className="flex flex-row items-center p-2 active:bg-blue-600 active:text-white rounded-md text-left">
                    <Monitor className="mr-1 h-5" />
                    <div>All Monitor</div>
                </a>
                <a href="/upload" className="flex flex-row items-center p-2 active:bg-blue-600 active:text-white rounded-md text-left">
                    <MonitorUp className="mr-1 h-5" />
                    <div>Upload</div>
                </a>
                <hr className="mb-2"></hr>
                <div className="px-2">Folder</div>
                <div className="pl-2 flex flex-col w-full mb-1 font-normal text-sm">
                    <button className="p-2 active:bg-blue-600 active:text-white rounded-md text-left">Group 1</button>
                    <button className="p-2 active:bg-blue-600 active:text-white rounded-md text-left">Group 2</button>
                    <button className="p-2 active:bg-blue-600 active:text-white rounded-md text-left">Group 3</button>
                    <button className="p-2 active:bg-blue-600 active:text-white rounded-md text-left">Group 4</button>
                    <button className="p-2 active:bg-blue-600 active:text-white rounded-md text-left">...</button>
                </div>
                <hr className="mb-2"></hr>
                <button className="flex flex-row items-center p-2 active:bg-blue-600 active:text-white rounded-md text-left">
                    <Bell className="mr-1 h-5" />
                    <div>Notification</div>
                </button>
                <button className="flex flex-row items-center p-2 active:bg-blue-600 active:text-white rounded-md text-left">
                    <History className="mr-1 h-5" />
                    <div>History</div>
                </button>
            </div>
            <div className="flex flex-col">
            <hr className="mb-2"></hr>
                <button className="flex flex-row items-center p-2 active:bg-blue-600 active:text-white rounded-md text-left">
                    <CircleUserRound className="mr-1 h-5" />
                    <div>Profile</div>
                </button>
            </div>
        </div>
    )
}