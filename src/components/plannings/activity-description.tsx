import Image from "next/image";
import Clickable from "../ui/clickable";

export default function ActivityDescription({ title, illustration, path, description }: { title: string; illustration: string; path: string; description: string; }) {
    return (
        <section id={`${title}-description`} className="w-full bg-background-base flex flex-col items-center pt-content">
            <Clickable
                clickableType={{type: "link", path: path}}
                style={{}}
            >
            <div className="circle bg-background-highlight rounded-full size-35 flexCenter shadow-xl shadow-foreground-subdued/30 mb-contentLg">
                <Image
                    src={illustration}
                    width={50}
                    height={50}
                    alt=""
                    className="z-10"
                />
            </div>
            </Clickable>
            <h2 className="text-center text-foreground-base mb-contentClose">{title}</h2>
            <p className="text-center text-foreground-subdued">{description}</p>
        </section>
    );
}