import Image from "next/image";
import Link from "next/link";

export default function NavigationBar() {
    return (
        <nav className="fixed top-0 left-0 w-screen flex justify-between items-center z-2 px-8 py-2">
            <Link href="/" className="">
                <Image
                src="/images/logo-hallb.png"
                alt="Logo Hall B"
                width={2363}
                height={2363}
                className="h-16 w-auto mr-2"
                />
            </Link>
        </nav>
    );
}