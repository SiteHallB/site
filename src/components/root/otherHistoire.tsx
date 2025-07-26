import Image from "next/image";


const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]

export default function Histoire() {
    return (
        <div className="image bottom-0 rounded-xl overflow-hidden">
            <Image 
                src={images[0].src}
                width={images[0].width}
                height={images[0].height}
                className="object-cover object-center size-full"
                alt={images[0].alt}
            />
        </div>
    );
}