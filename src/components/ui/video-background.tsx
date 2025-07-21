import videoData from "@/interface/videos.json"

export default function VideoBackground({ id }: { id: string }) {
    const video = videoData.find(v => v.id === id);
    if (video === undefined) {
        console.log("Aucune vidéo de présentation")
        return;
    }

    return (
        <video src={video.path}
            autoPlay
            playsInline
            muted loop
            preload="auto"
            className="absolute min-w-full h-full object-cover"/>
    );
}