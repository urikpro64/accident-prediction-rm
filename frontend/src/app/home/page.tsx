"use client";
import { Flag, PanelsTopLeft, PlusCircle, Search, X } from "lucide-react";
import { SideNav } from "../components/Side-Nav";
import { useState } from "react";

export default function HomePage() {
    const [onClickSearch, setOnClickSearch] = useState<boolean>(false);
    const [onClickPlus, setOnClickPlus] = useState<boolean>(false);
    return (
        <div className="flex flex-row w-full h-full">
            <SideNav></SideNav>
            <div className="w-full h-full bg-gray-300 text-black">
                <div className="flex flex-row justify-between items-center p-2">
                    <div className="flex flex-row w-full justify-center">
                        <div className="flex flex-row w-40 bg-white rounded-full px-3 py-2 space-x-1">
                            <Search className="text-gray-400 text-left" />
                            <input className="w-full bg-transparent outline-none" placeholder="Search..." onFocus={() => { setOnClickSearch(true) }}></input>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <PanelsTopLeft />
                        <button onClick={() => setOnClickPlus(true)}>
                            <PlusCircle className="text-gray-500 hover:text-black hover:outline-black"/>
                        </button>
                    </div>

                </div>
                <hr className="mx-4 my-2 bg-gray-500 h-px border-0" />
            </div>
            {onClickPlus ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-transparent bg-black bg-opacity-40">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="flex flex-col bg-white w-full h-full p-4 text-black rounded-md justify-center items-center">
                                <button className="self-end rounded-md" onClick={() => setOnClickPlus(false)}>
                                    <X className="w-5 text-gray-500 hover:text-black" />
                                </button>
                                <div className="font-semibold mb-4">Add New Monitor</div>
                                <div className="flex flex-col space-y-2 mb-2">
                                    <input type="text" placeholder="Name" className="p-2 border-2 rounded-md" />
                                    <input type="text" placeholder="Serial Number" className="p-2 border-2 rounded-md" />
                                    <input type="text" placeholder="Address(ex. 192.168.1.27)" className="p-2 border-2 rounded-md" />
                                    <input type="text" placeholder="Model" className="p-2 border-2 rounded-md" />
                                    <input type="text" placeholder="Description" className="p-2 border-2 rounded-md" />
                                </div>
                                <button className="self-end rounded-md" onClick={() => setOnClickPlus(false)}>
                                    <div className="p-2 bg-green-400 rounded-md text-white hover:bg-green-500">Save</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            <div className=""></div>
        </div>
    )
}