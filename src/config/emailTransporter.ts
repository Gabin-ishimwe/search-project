import nodemailer from "nodemailer";

export type IEmail = {
  receiverEmail: string;
  title: string;
  body: string;
};

export const sendEmail = async ({ receiverEmail, title, body }: IEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    const options = {
      from: process.env.MAILER_EMAIL,
      to: receiverEmail,
      subject: title,
      html: body,
    };

    await transporter.sendMail(options);
    console.log("Email sent to ", receiverEmail);
  } catch (error) {
    console.log(error);
  }
};
