"use client";
import { Flag, PanelsTopLeft, PlusCircle } from "lucide-react";
import { SideNav } from "../components/Side-Nav";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { InputMonitorForm } from "./ModalInputMonitorForm";
import { StreamingRender } from "../components/StreamingRender";
import { CardMonitor } from "./CardMonitor";
import { Camera } from "./types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function HomePage() {
    const [onClickPlus, setOnClickPlus] = useState<boolean>(false);
    const [cameras, setCameras] = useState<Array<Camera>>();
    const [selectClass, setSelectClass] = useState<string>("");
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/data/getAllCamera`, {
            method: "GET",
        }).then(response => response.json())
            .then((data) => setCameras(data.result))
    }, [selectClass]);
    // console.log(cameras);
    return (
        <div className="flex flex-1 bg-gray-200 overflow-hidden">
            <SideNav></SideNav>
            <div className="flex flex-1 flex-col p-2 bg-gray-300 text-black ">
                <div className="flex flex-row justify-between items-center p-2">
                    <div className="flex flex-row w-full">
                        <select onChange={(e) => {setSelectClass(e.currentTarget.value)}} className="w-1/5 p-1 rounded-md">
                            <option value={"ssss"}>ssss</option>
                            <option value={"aaaa"}>aaaa</option>
                        </select>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <PanelsTopLeft />
                        <button onClick={() => setOnClickPlus(true)}>
                            <PlusCircle className="text-gray-500 hover:text-black hover:outline-black" />
                        </button>
                    </div>
                </div>
                <hr className="mx-2 bg-gray-500 h-px border-0" />
                <div className="md:flex md:flex-col md:space-y-2 lg:grid lg:grid-cols-2 lg:gap-2 p-2 w-full h-full overflow-y-auto justify-center items-center">
                    {cameras && cameras.map((camera, index) => (
                        <CardMonitor key={`camera${index}`} {...camera}></CardMonitor>
                    ))}
                </div>
            </div>
            {onClickPlus ? (
                <InputMonitorForm setOnClickPlus={setOnClickPlus}></InputMonitorForm>
            ) : null}
        </div>
    )
}