export interface SendMailData {
    subject: string;
    body: string;
}

export interface MainAdapter {
    sendMain: (data: SendMailData) => Promise<void>;
}
