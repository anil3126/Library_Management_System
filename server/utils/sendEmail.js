import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

export const sendEmail = async ({ email, subject, message }) => {
  console.log("--- DEBUG INFO ---");
  console.log(
    "Key Length:",
    process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY.length : "UNDEFINED"
  );
  console.log("Sender:", process.env.BREVO_SENDER_EMAIL);
  console.log("------------------");

  try {
    await brevo.transactionalEmails.sendTransacEmail({
      subject: subject,
      htmlContent: message,
      sender: {
        name: "Bookworm Library",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email }],
    });
  } catch (error) {
    const errMsg = error?.body?.message || error.message;
    throw new Error(errMsg || "Failed to send email");
  }
};