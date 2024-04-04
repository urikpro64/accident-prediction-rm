/* eslint-disable @next/next/no-img-element */
"use client";
import { RefreshCw, Upload } from "lucide-react";
import { SideNav } from "../components/Side-Nav";
import { ChangeEvent, useRef, useState } from "react";
import { ResultChangeModel, ResultPredictImage } from "./types";
import { CardPredict } from "./CardPredict";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<ResultPredictImage | null>(null);
    const [error, setError] = useState('');

    const videoRef = useRef<HTMLVideoElement>(null);

    const handleSetCurrentTime = (timeInSeconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = timeInSeconds;
        }
    };

    const handleReset = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
        setFile(null);
        setResult(null);
    };

    const handleUplaod = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        handleReset();
        setFile(selectedFile || null);
        if (selectedFile) {
            console.log(selectedFile.name);
            await submitUpload(selectedFile, '/predict/video');
        }
    }

    const handleUplaodModel = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        handleReset();
        if (selectedFile) {
            console.log(selectedFile.name);
            await submitUpload(selectedFile, '/predict/changemodel');
        }
    }

    const submitUpload = async (inputFile: File, api_route: string) => {
        const formData = new FormData();
        formData.append('file', inputFile)

        try {
            const response = await fetch(`${API_URL}${api_route}`, {
                method: "POST",
                body: formData,
                // mode: 'no-cors'
            })
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setError('Failed to upload file');
            console.log(error);
        }
    };

    return (
        <div className="flex flex-1 bg-gray-300 overflow-hidden">
            <SideNav />
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-1 overflow-hidden">
                    <div className="flex flex-1 flex-col space-y-4 p-2 bg-gray-300">
                        <div className="w-full flex flex-row space-x-3 justify-center items-center">
                            <label htmlFor="inputmodel" className="flex flex-1 p-2 text-sm drop-shadow-md rounded-lg bg-white text-black cursor-pointer border-2 file:hidden">
                                {"Choose your model file (.h5)"}
                            </label>
                            <input id="inputmodel" type="file" onChange={handleUplaodModel} hidden></input>
                            <button onClick={handleReset} className="flex p-2 bg-red-400 hover:bg-red-500 rounded-lg drop-shadow-md">Reset</button>
                        </div>
                        <div className="flex flex-1 bg-white rounded-lg transition-transform duration-300">
                            {!file &&
                                <label htmlFor="inputfile" className="flex flex-1 flex-col space-y-2 items-center justify-center text-gray-600">
                                    <Upload></Upload>
                                    <div>Upload your video</div>
                                    <input id="inputfile" type="file" onChange={handleUplaod} className="hidden"></input>
                                </label>
                            }
                            {file &&
                                <div className="flex flex-1 items-center justify-center">
                                    <video controls ref={videoRef} className="rounded-md drop-shadow-md">
                                        <source src={URL.createObjectURL(file)} type={file.type} />
                                    </video>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col p-2 space-y-1 overflow-y-auto transition-all">
                        {file && !result &&
                            <div className="flex flex-1 p-2 bg-white justify-center items-center rounded-md">
                                <RefreshCw className="w-40 animate-spin text-black"></RefreshCw>
                            </div>
                        }
                        {result && result.result.map((predict, index) => (
                            <div key={index} onClick={() => handleSetCurrentTime(predict.sec)}>
                                <CardPredict {...predict} ></CardPredict>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}