"use client";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { SideNav } from "../components/Side-Nav";
import { ChangeEvent, FormEvent, useState } from "react";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState({});

    const handleUplaod = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile || null);
        console.log(file?.name);
        if (file) {
            await submitUpload(file);
            console.log(result);
        }
    }

    const submitUpload = async (inputFile: File) => {
        if (!file) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('file', file)

        try {
            const response = await fetch('http://localhost:5000/predict/image', {
                method: "POST",
                body: formData,
            }).then(response => response.json())
                .then(json => {return json})
            console.log(response);
            setResult(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-row w-full h-full bg-gray-300">
            <SideNav />
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-row w-full h-full p-2 space-x-2">
                    <div className="flex w-full h-full bg-white p-2">
                        <label htmlFor="inputfile" className="flex w-full h-full items-center justify-center text-black">
                            Input File
                            <input id="inputfile" type="file" onChange={handleUplaod} className="hidden"></input>
                        </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-1/3 h-full bg-white p-2">
                        <div className="flex flex-col items-center">
                            <div className="w-full h-full bg-gray-500"></div>
                            <div className="text-black">predict 1</div>
                            <div className="text-black text-sm">1/1/2567</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-full h-full bg-gray-500"></div>
                            <div className="text-black">predict 1</div>
                            <div className="text-black text-sm">1/1/2567</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-full h-full bg-gray-500"></div>
                            <div className="text-black">predict 1</div>
                            <div className="text-black text-sm">1/1/2567</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-full h-full bg-gray-500"></div>
                            <div className="text-black">predict 1</div>
                            <div className="text-black text-sm">1/1/2567</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-full h-full bg-gray-500"></div>
                            <div className="text-black">predict 1</div>
                            <div className="text-black text-sm">1/1/2567</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-full h-full bg-gray-500"></div>
                            <div className="text-black">predict 1</div>
                            <div className="text-black text-sm">1/1/2567</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-full h-full bg-gray-500"></div>
                            <div className="text-black">predict 1</div>
                            <div className="text-black text-sm">1/1/2567</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-full h-full bg-gray-500"></div>
                            <div className="text-black">predict 1</div>
                            <div className="text-black text-sm">1/1/2567</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full h-fit justify-between p-2 text-black">
                    <ArrowLeftCircle className="w-10" />
                    <ArrowRightCircle className="w-10" />
                </div>
            </div>
        </div>
    )
}