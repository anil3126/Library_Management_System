import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys, SendSmtpEmail } from '@getbrevo/brevo';

export const sendEmail = async ({ email, subject, message }) => {
  // Initialize the API instance directly
  let apiInstance = new TransactionalEmailsApi();

  // Set the API key
  apiInstance.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  // Initialize the email object directly
  let sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.sender = {
    name: "Bookworm Library",
    email: process.env.BREVO_SENDER_EMAIL,
  };
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = message;

  console.log("--- DEBUG INFO ---");
  console.log(
    "Key Length:",
    process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY.length : "UNDEFINED"
  );
  console.log("Sender:", process.env.BREVO_SENDER_EMAIL);
  console.log("------------------");

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    const errMsg = error?.response?.body?.message || error.message;
    throw new Error(errMsg || "Failed to send email");
  }
};