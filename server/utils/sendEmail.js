import SibApiV3Sdk from '@getbrevo/brevo';

export const sendEmail = async ({ email, subject, message }) => {
  // Initialize the API instance
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  // Set the API key using the proper SDK enum reference
  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  // Initialize the email object using the SDK namespace
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

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