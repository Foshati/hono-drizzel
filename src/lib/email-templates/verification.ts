export const verificationEmailTemplate = ({
	userName,
	verificationUrl,
}: {
	userName?: string;
	verificationUrl: string;
}) => ({
	subject: "Verify Your Email Address",
	html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="background-color: #f5f5f5; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 600;">
                Welcome! 🎉
              </h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0 0 20px 0;">
                Hello ${userName || "there"},
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 30px 0;">
                Thank you for signing up! Please verify your email address by clicking the button below:
              </p>
              
              <!-- Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${verificationUrl}" 
                   style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                  Verify Email Address
                </a>
              </div>
              
              <!-- Alternative Link -->
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="margin: 0; word-break: break-all;">
                  <a href="${verificationUrl}" style="color: #667eea; text-decoration: none; font-size: 14px;">
                    ${verificationUrl}
                  </a>
                </p>
              </div>
              
              <p style="font-size: 14px; color: #888; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #eee;">
                If you didn't create this account, you can safely ignore this email.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0; font-size: 12px; color: #999;">
                This is an automated message, please do not reply.
              </p>
            </div>
            
          </div>
        </div>
      </body>
    </html>
  `,
});
