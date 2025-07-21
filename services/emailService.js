const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendConfirmationEmail = async ({ name, email, registrationId, className }) => {
    const mailOptions = {
        from: `"Thigma SmartLearn" <${process.env.EMAIL_USER}>`,
        to: email,                  // student email
        cc: process.env.EMAIL_USER, // also send a copy to yourself
        subject: `Registration Confirmation - Student ID #${registrationId}`,
        html: `
      <div style="font-family: Arial; padding: 20px; border: 1px solid #ccc;">
        <h2 style="color: #2e86de;">Registration Confirmation</h2>
        <p><strong>Student Name:</strong> ${name}</p>
        <p><strong>Registration ID:</strong> ${registrationId}</p>
        <p><strong>Class:</strong> ${className}</p>
        <p>Thank you for registering with <strong>Thigma SmartLearn</strong>. We’re excited to have you onboard!</p>
      </div>
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
    } catch (err) {
        console.error("❌ Failed to send email:", err);
    }
};
