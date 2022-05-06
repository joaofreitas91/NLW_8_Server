import { MainAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "5b4eca6d86ba21",
        pass: "205d3a2262aa96",
    },
});

export class NodemailerMailAdapter implements MainAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe feedback <oi@email.com>",
            to: "João Paulo <jp@gmail.com>",
            subject,
            html: body,
        });
    }
}
