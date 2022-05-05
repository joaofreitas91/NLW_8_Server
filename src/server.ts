import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json()); // Isso é chamado de midleware

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "5b4eca6d86ba21",
        pass: "205d3a2262aa96",
    },
});

app.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        },
    });

    await transport.sendMail({
        from: "Equipe feedback <oi@email.com>",
        to: "João Paulo <jp@gmail.com>",
        subject: "Novo Feedback",
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
            `<p>Tipo Feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,
        ].join(""),
    });

    return res.status(201).json({ data: feedback });
});

app.listen(3333, () => console.log("Server ON"));
