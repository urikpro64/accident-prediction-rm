"use client";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { SideNav } from "../components/Side-Nav";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Result } from "./types";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<Result>();
    const [error, setError] = useState('');

    const videoRef = useRef<HTMLVideoElement>(null);

    const handleSetCurrentTime = (timeInSeconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = timeInSeconds;
        }
    };

    const handleUplaod = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile || null);
        if (selectedFile) {
            console.log(selectedFile.name);
            await submitUpload(selectedFile);
        }
    }

    const submitUpload = async (inputFile: File) => {
        const formData = new FormData();
        formData.append('file', inputFile)

        try {
            const response = await fetch('http://localhost:5000/predict/video', {
                method: "POST",
                body: formData,
            })
            const data = await response.json();
            setResult(data);
            console.log(data);
        } catch (error) {
            setError('Failed to upload file');
            console.log(error);
        }
    };

    return (
        <div className="flex flex-row w-full max-h-full h-full  bg-gray-300">
            <SideNav />
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-row w-full h-full p-2 space-x-2">
                    <div className="w-full h-full bg-gray-500">
                        {!file &&
                            <label htmlFor="inputfile" className="flex w-full h-full items-center justify-center text-black">
                                Input File
                                <input id="inputfile" type="file" onChange={handleUplaod} className="hidden"></input>
                            </label>
                        }
                        {file &&
                            <div className="flex w-full h-full items-center justify-center text-black">
                                <video controls ref={videoRef}>
                                    <source src={URL.createObjectURL(file)} type={file.type} />
                                </video>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col space-y-2 bg-white p-2 overflow-y-scroll">
                        {result && result.result.map((predict, index) => (
                            <div
                                key={`predict_${index}`}
                                onClick={() => handleSetCurrentTime(predict.sec)}
                                className="flex flex-col w-full rounded-md p-1 text-black border-2 active:border-black"
                            >
                                <div>accident: {predict.accident}</div>
                                <div>nonaccident: {predict.nonaccident}</div>
                                <div>sec: {new Date(predict.sec*1000).toISOString().substring(11, 19)}</div>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <div className="flex flex-row w-full h-fit justify-between text-black">
                    <ArrowLeftCircle className="w-10" />
                    <ArrowRightCircle className="w-10" />
                </div>
            </div>
        </div>
    )
}