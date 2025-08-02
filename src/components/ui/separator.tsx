import clsx from "clsx";

export default function Separator({ className }: { className?: string }) {
    return (
        <hr className={clsx(className, "z-10 border-t border-foreground-base my-content lg:my-contentLg w-full max-w-200")}/>
    );
}