import { MainAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MainAdapter
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error("Type is required.");
        }

        if (!comment) {
            throw new Error("Comment is required.");
        }

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid Screenshot format.");
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
                `<p>Tipo Feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src='${screenshot}' />` : null,
                `</div>`,
            ].join(""),
        });
    }
}
