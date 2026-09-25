import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, subject, message }) => {
    try {
        console.log("RESEND API KEY EXISTS:", !!process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: "BookWorm Library <onboarding@resend.dev>",
            to: [email],
            subject: subject,
            html: message,
        });

        if (error) {
            console.error("RESEND ERROR:", error);
            throw new Error(error.message);
        }

        console.log("EMAIL SENT:", data.id);

        return data;

    } catch (error) {
        console.error("SEND EMAIL ERROR:", error);
        throw error;
    }
};