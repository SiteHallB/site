"use client";

import { useEffect, useRef, useState } from "react";

type ToastType = "default" | "error";
type ToastDetail = { message: string; type: ToastType; x: number; y: number };

export function toast(message: string, type: ToastType, x: number, y: number) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent<ToastDetail>("toast:show", { detail: { message, type, x, y } }));
}

export function Toast() {
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<ToastType>("default");
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const container = useRef<HTMLDivElement>(null);
    const hideTimer = useRef<number | null>(null);

    useEffect(() => {
        const handler = (e: Event) => {
            const { message, type, x, y } = (e as CustomEvent<ToastDetail>).detail;
            setMessage(message);
            setType(type)
            setPos({ x, y });

            setVisible(true);
                if (hideTimer.current) window.clearTimeout(hideTimer.current);
                hideTimer.current = window.setTimeout(() => setVisible(false), 500);
        };

        window.addEventListener("toast:show", handler as EventListener);
        return () => window.removeEventListener("toast:show", handler as EventListener);
    }, []);

    return (
        <div
            ref={container}
            role="status"
            aria-live="polite"
            className={[
                "fixed z-70 pointer-events-none select-none px-2 py-[1px] rounded-sm border text-foreground-base border border-foreground-subdued",
                type === "error" ? "bg-no" : "bg-background-highlight",
                "transform-gpu transition ease-out duration-200",
                visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
                "motion-reduce:transition-none motion-reduce:transform-none",
            ].join(" ")}
            style={{ left: pos.x, top: pos.y }}
        >
            {message}
        </div>
    );
}
