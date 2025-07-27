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
        const { name, email, message } = await request.json();

        await transporter.sendMail({
            from: `"Site Web" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // changer la destination ici
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