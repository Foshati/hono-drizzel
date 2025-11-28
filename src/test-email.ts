import { sendEmail } from "./lib/email";

async function main() {
  console.log("Sending test email...");
  const result = await sendEmail({
    to: "amirrezafoshati@gmail.com",
    subject: "Test Email from Hono Auth",
    html: "<h1>It works!</h1><p>This is a test email.</p>",
  });

  if (result.success) {
    console.log("Email sent successfully!", result.data);
  } else {
    console.error("Failed to send email:", result.error);
  }
}

main();
