"use client"

import { useContact } from "@/context/contact-context";
import Clickable from "@/components/ui/clickable";
import copyToClipboard from "@/utils/copy-to-clipboard";
import clsx from "clsx";
import { toast } from "./toast";
import { Mail, Phone } from "lucide-react";

export function PhoneNumber({ className }: { className?: string }) {
    const { numero } = useContact();

    return (
        <Clickable
            clickableType={{ type: "link", path: `tel:${numero}` }}
            style={{}}
            className={clsx(className, "text-foreground-subdued hoverUnderline")}
            aria-label={`Appeler le ${numero}`}
        >
            <div className="flex flex-row gap-x-1 items-center">
            <Phone className="text-foreground-subdued size-4 lg:size-6"/>
            <p>{numero}</p>
            </div>
        </Clickable>
    );
}

export function Email({ className }: { className?: string }) {
    const { email } = useContact();

    return (
        <Clickable
            clickableType={{ type: "button", onClick: async (e) => {
                const { clientX, clientY } = e;
                const ok = await copyToClipboard(email);
                toast(
                    ok ? "copié" : "erreur",
                    ok ? "default" : "error",
                    clientX, clientY
                )
            }}}
            style={{}}
            className={clsx(className, "text-foreground-subdued hoverUnderline")}
            aria-label={`Copier l'email ${email} dans le presse papier`}
        >
            <div className="flex flex-row gap-x-1 items-center">
                <Mail className="text-foreground-subdued size-4 lg:size-6"/>
                <p>{email}</p>
            </div>
        </Clickable>
    );
}