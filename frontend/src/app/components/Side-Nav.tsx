import { Bell, CircleUserRound, History, Home, Monitor, MonitorUp } from "lucide-react";

export function SideNav() {
    return (
        <div className="flex flex-col bg-white w-fit h-full text-black p-2 justify-between font-semibold">
            <div className="flex flex-col w-full h-fit ">
                <a href="/dashboard" className="flex flex-row items-center p-2 active:bg-blue-600 active:text-white rounded-md text-left">
                    <Home className="mr-1 h-5" />
                    <div>Dashboard</div>
                </a>
                <a href="/monitor" className="flex flex-row items-center p-2 active:bg-blue-600 active:text-white rounded-md text-left">
                    <Monitor className="mr-1 h-5" />
                    <div>All Monitor</div>
                </a>
                <a href="/upload" className="flex flex-row items-center p-2 active:bg-blue-600 active:text-white rounded-md text-left">
                    <MonitorUp className="mr-1 h-5" />
                    <div>Upload</div>
                </a>
                <hr className="mb-2"></hr>
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