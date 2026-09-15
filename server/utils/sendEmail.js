import nodemailer from "nodemailer";

export const sendEmail = async ({email, subject, message}) => {

    console.log("SMTP MAIL:", process.env.SMTP_MAIL);
    console.log("SMTP PASSWORD EXISTS:", !!process.env.SMTP_PASSWORD);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        },
         tls: {
            rejectUnauthorized: false
        }

    });

    console.log("SMTP CONNECTION SUCCESS");

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        html: message
    }

 const info = await transporter.sendMail(mailOptions);

  console.log("EMAIL SENT:", info.messageId);

  return info;
}