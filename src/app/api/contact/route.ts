import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const isDev = process.env.NODE_ENV !== "production";

// Configuration du transporteur SMTP via les vars d'env
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, 
    port: Number(process.env.SMTP_PORT), 
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, 
    }, 
    tls: isDev ? { rejectUnauthorized: false } : undefined,
} as SMTPTransport.Options);

export async function POST(request: NextRequest) {
    try {
        const { name, email, message, captchaToken } = await request.json();

        // Captcha
        if (!captchaToken) {
            return NextResponse.json(
                { error: "hCaptcha token manquant" },
                { status: 400 }
            );
        }

        const secret = process.env.HCAPTCHA_SECRET!;
        const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret,
                response: captchaToken,
            }),
        });
        const verifyJson = await verifyRes.json();

        if (!verifyJson.success) {
            return NextResponse.json(
                {
                    error: "Échec de la vérification hCaptcha",
                    details: verifyJson["error-codes"] || [],
                },
                { status: 400 }
            );
        }

        // Envoie du mail
        await transporter.sendMail({
            from: `"Site Web" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_DEST, 
            subject: `Nouveau message de ${name} via le site web`,
            text: `
                    Nom : ${name}
                    Email : ${email}
                    Message :
                    ${message}
                `, 
            html: `
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Message :</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
                `,
        });

        return NextResponse.json({ message: "Message envoyé." }, { status: 200 });

    } catch (err) {
        console.error("API contact error:", err);
        return NextResponse.json(
            { error: "Erreur serveur, envoi impossible." },
            { status: 500 }
        );
    }
}