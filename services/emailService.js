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
      <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 30px;">
    <h2 style="color: #2e86de; border-bottom: 2px solid #2e86de; padding-bottom: 10px;">🎓 Registration Confirmation</h2>
    
    <p style="font-size: 16px; color: #333;"><strong>👤 Student Name:</strong> ${name}</p>
    <p style="font-size: 16px; color: #333;"><strong>🆔 Registration ID:</strong> ${registrationId}</p>
    <p style="font-size: 16px; color: #333;"><strong>🏫 Class:</strong> ${className}</p>

    <div style="margin-top: 30px; padding: 20px; background-color: #eaf4ff; border-left: 4px solid #2e86de; border-radius: 6px;">
      <p style="font-size: 15px; color: #2c3e50; margin: 0;">
         Thank you for registering with <strong>Thigma SmartLearn</strong>. We’re excited to have you onboard and wish you the best in your learning journey!
      </p>
    </div>

    <p style="margin-top: 40px; font-size: 13px; color: #888; text-align: center;">
      This is an automated message. Please do not reply.
    </p>
  </div>
</div>

    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(" Email sent:", info.response);
    } catch (err) {
        console.error(" Failed to send email:", err);
    }
};
