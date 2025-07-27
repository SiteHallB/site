import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configuration du transporteur SMTP via les vars d'env
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP connection error:", err);
  } else {
    console.log("✔ SMTP server is ready to take our messages");
  }
});

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();

        await transporter.sendMail({
            from: `"Site Web" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // changer la destination ici
            subject: `Nouveau message de ${name}`,
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

        return NextResponse.json({ message: "Email envoyé !" }, { status: 200 });

    } catch (err) {
        console.error("API contact error:", err);
        return NextResponse.json(
            { error: "Erreur serveur, envoi impossible." },
            { status: 500 }
        );
    }
}