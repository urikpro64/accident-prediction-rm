"use client"
import { SideNav } from "../components/Side-Nav";
import { AreaChart } from "./charts/AreaChart";
import { BarChart } from "./charts/BarChart";
import { ChartData } from "./types";

export default function DashBoard() {
    const dataMock: ChartData[] = [
        {
            name: "1",
            value: 10
        },
        {
            name: "2",
            value: 24
        },
        {
            name: "3",
            value: 32
        }
    ]

    return (
        <div className="flex flex-1 overflow-hidden">
            <SideNav></SideNav>
            <div className="flex flex-1 p-4 bg-gray-300 overflow-x-auto">
                <div className="grid grid-flow-col auto-cols-max grid-rows-2 gap-2 flex-1">
                    <div className="flex flex-rows col-span-2 p-2 space-x-2 bg-white rounded-md shadow-md text-4xl font-semibold">
                        <div className="flex flex-1 flex-col justify-center items-center">
                            <div className="flex w-full h-full bg-blue-500 rounded-md items-center justify-center">24</div>
                            <div className="text-xl text-blue-400">per Day</div>
                        </div>
                        <div className="flex flex-1 flex-col justify-center items-center">
                            <div className="flex w-full h-full bg-blue-400 rounded-md items-center justify-center">134</div>
                            <div className="text-xl text-blue-400">per Week</div>
                        </div>
                        <div className="flex flex-1 flex-col justify-center items-center">
                            <div className="flex w-full h-full bg-blue-300 rounded-md items-center justify-center">652</div>
                            <div className="text-xl text-blue-400">per Month</div>
                        </div>
                    </div>
                    <div className="block p-1 bg-white rounded-md shadow-md text-black">
                        <AreaChart title="Accident" data={dataMock}></AreaChart>
                    </div>
                    <div className="block p-1 bg-white rounded-md shadow-md text-black">
                        <BarChart title="Accident" data={dataMock}></BarChart>
                    </div>
                </div>
            </div>
        </div>
    )
}