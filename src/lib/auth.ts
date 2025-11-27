import db from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { sendEmail } from "./email";
import {
	verificationEmailTemplate,
	resetPasswordEmailTemplate,
} from "./email-templates";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }: { user: { name: string; email: string }; url: string }) => {
			const template = resetPasswordEmailTemplate({
				userName: user.name,
				resetUrl: url,
			});

			await sendEmail({
				to: user.email,
				subject: template.subject,
				html: template.html,
			});
		},
		sendVerificationEmail: async ({
			user,
			url,
		}: {
			user: { name: string; email: string };
			url: string;
		}) => {
			const template = verificationEmailTemplate({
				userName: user.name,
				verificationUrl: url,
			});

			await sendEmail({
				to: user.email,
				subject: template.subject,
				html: template.html,
			});
		},
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
	},
	plugins: [openAPI()],
});
