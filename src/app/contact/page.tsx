"use client"

import "@/styles/contact.css";

import Image from "next/image";
import TextareaAutosize from 'react-textarea-autosize';

import Clickable from "@/components/ui/clickable";

import { useState, FormEvent } from "react";

type StatusType = "typing" | "sending" | "success" | "error"
function ContactForm() {
    const mailInCaseOfError = "hallb@contact.fr"

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<StatusType>("typing");

    function statusMessage(s: StatusType) {
        switch (s) {
            case "sending": return <span className="text-accent">Envoi en cours...</span>
            case "success": return <span className="text-yes">Message envoyé.</span>
            case "error": return <span className="text-no">{`Erreur, veuillez nous excuser, ci cela persiste vous pouvez nous envoyer un mail traditionnel à ${mailInCaseOfError}`}</span>
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("error")
                throw new Error(data.error || "Erreur inconnue");
            }

            setStatus("success");
            setForm({ ...form, message: "" });

        } catch (err: any) {
            setStatus("error");
        }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background-highlight rounded-xl p-content lg:p-contentLg flex flex-col items-center space-y-contentClose">
        <div className="flex flex-col items-center">
            <h2 className="text-foreground-base">Message</h2>
            <p className="text-foreground-subdued textSubH2 text-center">N'hesitez pas à nous solliciter</p>
        </div>
        <div className="w-full flex flex-col space-y-2">
            <label htmlFor="name" className="text-foreground-base textNormal">Nom</label>
            <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder="Gauthier Bonhomme"
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="inputColor p-2 resize-none w-full textNormal outline-1 outline-foreground-subdued/10 rounded"
            />
        </div>
        <div className="w-full flex flex-col space-y-2">
            <label htmlFor="email" className="text-foreground-base textNormal">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="gauthier.bonhome@gmail.com"
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="inputColor p-2 resize-none w-full textNormal outline-1 outline-foreground-subdued/10 rounded"
                
            />
        </div>
        <div className="w-full flex flex-col space-y-2">
            <label htmlFor="message" className="text-foreground-base textNormal">Message</label>
            <TextareaAutosize
                name="message"
                id="message"
                placeholder="Votre message"
                value={form.message}
                required
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="resize-none p-2 w-full text-foreground-base textNormal outline-1 outline-foreground-subdued/10 rounded"
                minRows={4}
            />
        </div>
        <Clickable
            clickableType={{
                type: "button",
                htmlType: "submit", 
            }}
            style={{ color: "accent", variant: "secondary"}}
            className="mt-content w-full"
        >
            Envoyer
        </Clickable>
        {status !== "typing" && <p className="mt-2 text-center">{statusMessage(status)}</p>}
    </form>
  );
}

export default function Page() {
    return (
        <div className="bg-background-base w-full h-500 pt-subMenu px-content lg:px-contentLg flex flex-col space-y-10">
            {/* Titre */}
            <div className="flex flex-col items-center space-y-2 mb-subTitle lg:mb-subTitleLg">
                <h1 className="text-foreground-base">Contacts</h1>
                <p className="text-foreground-subdued text-center">
                    Sous titrex
                </p>
            </div>
            <ContactForm/>
        </div>
    );
}