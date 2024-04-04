import { Predict } from "./types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export function CardPredict(predict: Predict) {
    // console.log(predict);
    return (
        <div
            className="flex flex-col w-full rounded-md p-2 text-black border-2 bg-white hover:drop-shadow-md"
        >
            <img
                src={`${API_URL}/${predict.imageURL}`}
                className="w-40 hover:w-96 rounded-md transition-all duration-1000 delay-300"
                alt={predict.imageURL}
            />
            <div className="flex flex-row justify-between">
                <div>accident: {predict.accident}</div>
                <div>nonaccident: {predict.nonaccident}</div>
            </div>
            <div>sec: {new Date(predict.sec * 1000).toISOString().substring(11, 19)}</div>
            {predict.nonaccident < predict.accident ? (
                <div className="text-lg font-bold text-red-500">Accident</div>
            ) : (
                <div className="text-lg font-bold text-green-500">Non-Accident</div>
            )}
        </div>
    )
}