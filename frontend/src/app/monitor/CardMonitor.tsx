import { TriangleAlert } from "lucide-react";
import { StreamingRender } from "../components/StreamingRender";
import { Camera } from "./types";

export function CardMonitor(camera: Camera) {
    // console.log(camera.cameraId);
    return (
        <div className="flex h-full flex-row rounded-md space-x-2 overflow-hidden">
            <div className="">
                <StreamingRender source={camera.address} />
            </div>
            <div className="flex flex-col w-fit h-full p-2 space-y-2 bg-white rounded-md overflow-y-auto">
                <div className="font-semibold">{camera.cameraName}</div>
                <div className="flex w-full flex-row px-2 space-x-2 bg-red-300 rounded-md justify-center items-center">
                    <TriangleAlert className="text-center h-full"></TriangleAlert>
                    <div>{new Date().toLocaleString("TH-th")}</div>
                </div>
            </div>
        </div>
    )
}