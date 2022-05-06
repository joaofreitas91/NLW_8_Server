export interface SendMailData {
    subject: string;
    body: string;
}

export interface MainAdapter {
    sendMail: (data: SendMailData) => Promise<void>;
}
