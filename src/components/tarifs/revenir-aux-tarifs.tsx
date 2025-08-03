import { ChevronLeft } from "lucide-react";
import Clickable from "../ui/clickable";


export default function() {
    return (
        <Clickable
            clickableType={{type: "link", path: "/tarifs"}}
            style={{variant: "menuMainButton"}}
            className="mr-auto flexCenter flex-row"
        >
            <ChevronLeft className="size-6"/>
            Revenir aux tarifs
        </Clickable>
    );
}