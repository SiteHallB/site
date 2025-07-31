import TextareaAutosize from 'react-textarea-autosize';
import Clickable from "@/components/ui/clickable";
import { useState, FormEvent, useEffect, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import sanitizeHtml from "sanitize-html";

function cleanString(message: string) {
    return sanitizeHtml(message, {
        allowedTags: ["b","i","em","strong","a","br"],
        allowedAttributes: { a: ["href","target"] },
        transformTags: {
            a: (tagName, attribs) => ({
                tagName: "a",
                attribs: {
                    href: attribs.href,
                    target: "_blank",
                    rel: "noopener noreferrer"
                }
            })
        }
    });
}

type StatusType = "typing" | "sending" | "success" | "error" | "captchaExpired";
export default function ContactForm() {
    const [token, setToken] = useState<string | null>(null);
    const [hasConsent, setHasConsent] = useState<boolean | undefined>(undefined);
    const captchaRef = useRef<HCaptcha>(null);
    
    const mailInCaseOfError = "hallb@contact.fr"

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<StatusType>("typing");

    useEffect(() => {
        console.log(window.tarteaucitron?.state?.hcaptcha)
        setHasConsent(window.tarteaucitron?.state?.hcaptcha === true)
    }, [])

    useEffect(() => {
        // Handler qui passe à true quand hcaptcha est autorisé
        const onAllowed = () => setHasConsent(true);
        const onDisallowed = () => setHasConsent(false);

        // Consentement initial (si la page est rechargée)
        if (window.tarteaucitron?.state?.consents?.hcaptcha === true) {
            setHasConsent(true);
        }

        document.addEventListener('hcaptcha_allowed', onAllowed);
        document.addEventListener('hcaptcha_disallowed', onDisallowed);

        return () => {
            document.removeEventListener('hcaptcha_allowed', onAllowed);
            document.removeEventListener('hcaptcha_disallowed', onDisallowed);
        };
    }, []);

    function statusMessage(s: StatusType) {
        switch (s) {
            case "sending": return <span className="text-accent">Envoi en cours...</span>
            case "success": return <span className="text-yes">Message envoyé.</span>
            case "error": return <span className="text-no">{`Erreur, veuillez nous excuser, ci cela persiste vous pouvez nous envoyer un mail traditionnel à ${mailInCaseOfError}`}</span>
            case "captchaExpired": return <span className="text-no">Le délai de validation a expiré, merci de cliquer de nouveau sur Envoyer pour renouveler la vérification.</span>
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!captchaRef.current) return;
        captchaRef.current.execute();
    };

    useEffect(() => {
        console.log("Token:", token);
        if (token) submit(token);
    }, [token])

    async function submit(captchaToken: string) {
        setStatus("sending");

        const payload = {
            name: cleanString(form.name), 
            email:cleanString(form.email), 
            message: cleanString(form.message), 
            captchaToken, 
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
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
        } finally {
            setToken(null);
            captchaRef.current?.resetCaptcha();
        }
    }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-200 bg-background-highlight rounded-xl p-content lg:p-contentLg flex flex-col items-center space-y-contentClose">      
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

        {hasConsent ? (<>
            <HCaptcha
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!}
                onVerify={setToken}
                ref={captchaRef}
                onError={(err) => {setStatus("error");}}
                onExpire={() => {
                    setStatus("captchaExpired")
                    setToken(null);
                }}
            />
            {status !== "sending" && <>
                <Clickable
                    clickableType={{ type: "button", htmlType: "submit" }}
                    style={{ color: "accent", variant: "secondary" }}
                    className="mt-content w-full"
                >
                    Envoyer
                </Clickable>
            </>}
            {status !== "typing" && <p className="mt-2 text-center">{statusMessage(status)}</p>}
        </>) : (<>            
            <p className="text-accent">Veuillez accepter les cookies relatifs à HCaptcha pour envoyer un message.</p>
            <Clickable
                clickableType={{ type: "button", onClick: () => window.tarteaucitron.userInterface.openPanel()}}
                style={{ color: "primarySubdued", variant: "secondary" }}
            >
                Gérer mes cookies
            </Clickable>
        </>)}
    </form>
  );
}