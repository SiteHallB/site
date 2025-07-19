import Image from "next/image";
import Link from "next/link";
import { Menu, X } from 'lucide-react';
import LinkedButton from "@/components/ui/linked-buttons";

export default function NavigationBar() {
    return (
        <nav className="fixed top-0 left-0 w-screen flex justify-between items-center z-2 px-4 lg:px-8 py-1 bg-background-subdued/70">
            <Link href="/" className="">
                <Image
                src="/images/logo-hallb.png"
                alt="Logo Hall B"
                width={2363}
                height={2363}
                className="h-16 w-auto mr-2"
                />
            </Link>
            <div className="flex space-x-4">
                <LinkedButton id="Subscribe" text="Je m'inscris"/>
                <Menu size={24} className="text-white"/>
            </div>
        </nav>
    );
}