import nodemailer from "nodemailer";
import { ApiError } from "./helper";

export default class MyMail {
  email: string;
  link: string;

  constructor(email: string, link: string) {
    this.email = email;
    this.link = link;
  }

  async sendVerification() {
    try {
      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD,
        },
      });

      await transport.sendMail({
        to: this.email,
        from: "info@ajaypatel.live",
        html: `<h1> Please click on <a href=${this.link}>this link</a> to verify your account <h1>`,
      });
    } catch (error) {
      if (error instanceof Error) throw new ApiError(error.message, 500);
    }
  }
}
