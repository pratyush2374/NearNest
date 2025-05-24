import nodemailer from "nodemailer";

async function sendEmail(email: string, subject: string, body: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Set up email data
    const mailOptions = {
        from: `"NearNest" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html: body,
    };

    // Send the email
    return transporter.sendMail(mailOptions);
}

export default sendEmail;
