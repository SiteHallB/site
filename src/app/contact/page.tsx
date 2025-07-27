"use client"

import Image from "next/image";
import TextareaAutosize from 'react-textarea-autosize';

import Clickable from "@/components/ui/clickable";


import { useState, FormEvent } from "react";

function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Envoi en cours…");

    try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur inconnue");
        setStatus("✅ " + data.message);
        setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
        setStatus("❌ " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background-highlight rounded-xl p-content flex flex-col items-center space-y-contentClose">
        <div className="flex flex-col items-center">
            <h2 className="text-foreground-base">Message</h2>
            <p className="text-foreground-subdued textSubH2 text-center">N'hesitez pas à nous solliciter</p>
        </div>
        <div className="w-full flex flex-col">
            <label htmlFor="name" className="text-foreground-base text-center">Nom</label>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Bonhomme Gauthier"
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="resize-none w-full text-foreground-base textNormal p-contentClose outline-1 outline-foreground-subdued rounded-xs"
                
            />
        </div>
        <div className="w-full flex flex-col">
            <label htmlFor="email" className="text-foreground-base text-center">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="gauthier.bonhome@gmail.com"
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="resize-none w-full text-foreground-base textNormal p-contentClose outline-1 outline-foreground-subdued rounded-xs"
                
            />
        </div>
        <div className="w-full flex flex-col">
            <label htmlFor="message" className="text-foreground-base text-center">Message</label>
            <TextareaAutosize
                name="message"
                id="message"
                placeholder="..."
                value={form.message}
                required
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="resize-none w-full text-foreground-base textNormal p-contentClose outline-1 outline-foreground-subdued rounded-xs"
                minRows={4}
            />
        </div>
        <Clickable
            clickableType={{
                type: "button",
                htmlType: "submit", 
                onClick: (e) => {
                    e.preventDefault(); // empêche le reload
                    handleSubmit(e);
                }
            }}
            style={{ color: "accent", variant: "secondary"}}
            className="mt-content w-full"
        >
        Envoyer
      </Clickable>
        {status && <p className="text-accent mt-2 text-center">{status}</p>}
    </form>
  );
}

function Champs({ text, placeholder }: { text: string; placeholder: string }) {
    return (
        <form className="w-full flex flex-col">
            <p className="text-foreground-base text-center">{text}</p>
            <textarea
                className="resize-none w-full text-foreground-base textNormal px-contentClose outline-1 outline-foreground-subdued rounded-xs"
                placeholder={placeholder}
            />
        </form>
    );
}


export default function Page() {
    return (
        <div className="bg-background-base w-full h-500 pt-subMenu px-content flex flex-col space-y-10">
            <h1 className="text-foreground-base text-center">Contacts</h1>
            <ContactForm/>

            {/* Formulaire */}
            {/* <form className="bg-background-highlight rounded-xl p-content flex flex-col items-center space-y-contentClose">
                <div className="flex flex-col items-center">
                    <h2 className="text-foreground-base">Message</h2>
                    <p className="text-foreground-subdued textSubH2 text-center">N'hesitez pas à nous solliciter</p>
                </div>
                <Champs text="Nom" placeholder="Bonhomme"/>
                <Champs text="Prenom" placeholder="Gauthier"/>
                <Champs text="Mail" placeholder="gauthier.bonhomme@gmail.com"/>
                <Champs text="Message" placeholder="..."/>
                <Clickable
                    clickableType={{type: "link", path: ""}}
                    style={{"variant": "secondary", "color": "accent"}}
                    className="mt-content w-full"
                >
                    Envoyer
                </Clickable>
            </form> */}

            {/* <span className="absolute">
                <div className="inset-0 absolute z-10 bg-background-base/80">

                </div>
                <Image
                    src="/images/logo-hallb.png"
                    alt="Logo Hall B"
                    width={1240}
                    height={1328}
                    className="object-cover"
                />
            </span> */}



        </div>
    );
}