export const generateVerificationOtpEmailTemplate = (
  verificationCode,
  expiryMinutes = 15,
  appName = "BookWorm"
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0"
               style="max-width:480px; background:#ffffff; border-radius:8px; padding:24px;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <h2 style="margin:0; color:#333;">${appName}</h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="color:#555; font-size:14px;">
              <p>Your One-Time Password (OTP) for verification is:</p>

              <p style="text-align:center; margin:24px 0;">
                <span style="
                  display:inline-block;
                  font-size:24px;
                  letter-spacing:4px;
                  font-weight:bold;
                  color:#000;
                  background:#f1f3f5;
                  padding:12px 24px;
                  border-radius:6px;">
                  ${verificationCode}
                </span>
              </p>

              <p>
                This code is valid for <strong>${expiryMinutes} minutes</strong>.
                Please do not share this code with anyone.
              </p>

              <p>
                If you did not request this verification, you can safely ignore this email.
              </p>

              <p style="margin-top:24px;">
                Regards,<br />
                <strong>${appName} Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:16px; font-size:12px; color:#999;">
              This is an automated email. Please do not reply.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const generateForgotPasswordEmailTemplate = (
  resetPasswordUrl,
  expiryMinutes = 15,
  appName = "BookWorm"
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Password</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0"
               style="max-width:480px; background:#ffffff; border-radius:8px; padding:24px;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <h2 style="margin:0; color:#333;">${appName}</h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="color:#555; font-size:14px;">
              <p style="padding-bottom:8px;">
                You recently requested to reset your password for your ${appName} account.
              </p>

              <p style="text-align:center; margin:24px 0;">
                <a href="${resetPasswordUrl}" 
                   style="
                     display:inline-block;
                     font-size:16px;
                     font-weight:bold;
                     color:#ffffff;
                     background:#007bff;
                     padding:14px 32px;
                     text-decoration:none;
                     border-radius:6px;">
                  Reset Password
                </a>
              </p>

              <p style="word-break:break-all; font-size:12px; color:#666; padding:8px 0;">
                Reset Password Link: ${resetPasswordUrl}
              </p>

              <p>
                This link is valid for <strong>${expiryMinutes} minutes</strong>.
                If you did not request a password reset, you can safely ignore this email.
              </p>

              <p style="margin-top:24px;">
                Regards,<br />
                <strong>${appName} Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:16px; font-size:12px; color:#999;">
              This is an automated email. Please do not reply.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};