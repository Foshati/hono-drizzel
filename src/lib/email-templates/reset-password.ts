export const resetPasswordEmailTemplate = ({
	userName,
	resetUrl,
}: {
	userName?: string;
	resetUrl: string;
}) => ({
	subject: "Reset Your Password",
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
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 600;">
                🔑 Password Reset
              </h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0 0 20px 0;">
                Hello ${userName || "there"},
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 20px 0;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>
              
              <!-- Security Notice -->
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #856404;">
                  ⚠️ <strong>Security Notice:</strong> This link will expire in 15 minutes.
                </p>
              </div>
              
              <!-- Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${resetUrl}" 
                   style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);">
                  Reset Password
                </a>
              </div>
              
              <!-- Alternative Link -->
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="margin: 0; word-break: break-all;">
                  <a href="${resetUrl}" style="color: #f5576c; text-decoration: none; font-size: 14px;">
                    ${resetUrl}
                  </a>
                </p>
              </div>
              
              <p style="font-size: 14px; color: #888; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #eee;">
                If you didn't request a password reset, please ignore this email or contact support if you have concerns.
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
