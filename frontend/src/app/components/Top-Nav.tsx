import { Bell, CircleUserRound, Settings } from "lucide-react";

export function TopNav() {
    return (
        <div className="w-full h-fit flex flex-row bg-white justify-between items-center text-black p-2 drop-shadow-md">
            <div className="flex flex-row items-center space-x-4">
                <a href="/">
                    <div className="text-2xl font-bold p-2">LOGO</div>
                </a>
                <a href="/dashboard">
                    <div className="font-semibold">Home</div>
                </a>
                <a href="/upload">
                    <div className="font-semibold">Upload</div>
                </a>

            </div>
            <div className="flex flex-row space-x-4 justify-center items-center font-semibold">
                {/* <Bell />
                <Settings /> */}
                <CircleUserRound />
            </div>
        </div>
    )
}