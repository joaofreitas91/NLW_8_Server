import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
    it("should be able to submit a feedback", async () => {
        await expect(
            submitFeedback.execute({
                type: "OTHER",
                comment: "Example comment...",
                screenshot: "data:image/png;base64",
            })
        ).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it("should NOT be able to submit a feedback with an invalid screenshot", async () => {
        await expect(
            submitFeedback.execute({
                type: "OTHER",
                comment: "Example comment...",
                screenshot: "test.png",
            })
        ).resolves.toThrow();
    });

    it("should NOT be able to submit a feedback without comment", async () => {
        await expect(
            submitFeedback.execute({
                type: "OTHER",
                comment: "",
                screenshot: "test.png",
            })
        ).resolves.toThrow();
    });

    it("should NOT be able to submit a feedback without type", async () => {
        await expect(
            submitFeedback.execute({
                type: "",
                comment: "Example comment...",
                screenshot: "test.png",
            })
        ).resolves.toThrow();
    });
});
