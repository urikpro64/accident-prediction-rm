"use client"
import { ChartData } from "../types";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function AreaChart({ title, data }: { title: string, data: ChartData[] }) {

    const chartOption: ApexOptions = {
        chart: {
            type: 'area', // Set chart type as area
            width: '100%',
            height: '100%'
        },
        dataLabels: {
            enabled: false // Hide data labels on points
        },
        stroke: {
            curve: 'smooth' // Create a smooth curve for the lines
        },
        xaxis: {
            title: {
                text: 'Date'
            },
            categories: data.map((item) => item.name),
        },
        yaxis: {
            forceNiceScale: false
        },
        title: {
            text: title,
            align: 'left' // Align title to the left
        }
    };

    const series = [
        {
            name: "amount",
            data: data.map((item) => item.value),
        }
    ]
    return (
        <ReactApexChart type="area" options={chartOption} series={series} width={'100%'} height={'100%'}></ReactApexChart>
    )
}