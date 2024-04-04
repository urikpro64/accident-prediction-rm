import Hls from "hls.js";
import { useEffect, useRef } from "react";
import { StreamingDetail } from "../monitor/types";

export function StreamingRender({ source }: StreamingDetail) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && source) {
            const hls = new Hls();
            hls.loadSource(source);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                if (videoRef.current) {
                    videoRef.current.play();
                }
            });
        }
    }, [source]);

    return (
        <video
            className="flex rounded-md"
            ref={videoRef}
            autoPlay
            controls
        />
    );
}