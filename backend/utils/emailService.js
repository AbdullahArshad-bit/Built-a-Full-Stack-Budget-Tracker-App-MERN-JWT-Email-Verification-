const nodemailer = require("nodemailer");

// Create transporter (using Gmail as example - you can use any SMTP service)
const createTransporter = () => {
  // For development, you can use Gmail or any SMTP service
  // For production, use a proper email service like SendGrid, Mailgun, etc.
  
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "your-email@gmail.com",
      pass: process.env.EMAIL_PASSWORD || "your-app-password",
    },
  });
};

// Send verification email
const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;

    // Check if email credentials are configured
    if (!emailUser || !emailPass || emailUser === "your-email@gmail.com" || emailPass === "your-app-password") {
      console.log("\n⚠️  EMAIL NOT CONFIGURED!");
      console.log("📧 Verification Code for", email, ":", verificationCode);
      console.log("💡 To enable email sending, add to .env file:");
      console.log("   EMAIL_USER=your-email@gmail.com");
      console.log("   EMAIL_PASSWORD=your-app-password\n");
      return { success: false, code: verificationCode, reason: "email_not_configured" };
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "Verify Your Budget Tracker Account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Welcome to Budget Tracker!</h2>
          <p>Thank you for signing up. Please verify your email address by entering the code below:</p>
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #4F46E5; font-size: 32px; letter-spacing: 8px; margin: 0;">${verificationCode}</h1>
          </div>
          <p style="color: #6B7280; font-size: 14px;">This code will expire in 10 minutes.</p>
          <p style="color: #6B7280; font-size: 14px;">If you didn't create an account, please ignore this email.</p>
        </div>
      `,
    };

    // Test connection first
    await transporter.verify();
    console.log("✅ Email service ready");
    
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Verification email sent to:", email);
    console.log("Message ID:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("\n❌ EMAIL SEND FAILED!");
    console.error("Error:", error.message);
    
    // Common error messages
    if (error.message.includes("Invalid login")) {
      console.error("💡 Check your EMAIL_USER and EMAIL_PASSWORD in .env file");
    } else if (error.message.includes("self signed certificate")) {
      console.error("💡 SSL/TLS issue - check your email provider settings");
    } else {
      console.error("💡 Full error details:", error);
    }
    
    console.log("\n📧 VERIFICATION CODE (for development):", verificationCode);
    console.log("Email:", email, "\n");
    
    return { success: false, code: verificationCode, reason: "email_send_failed", error: error.message };
  }
};

module.exports = {
  sendVerificationEmail,
};

