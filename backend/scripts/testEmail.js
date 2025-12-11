require("dotenv").config();
const { sendVerificationEmail } = require("../utils/emailService");

const testEmail = async () => {
  console.log("🧪 Testing Email Service...\n");
  
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASSWORD;
  
  console.log("Email User:", emailUser || "NOT SET");
  console.log("Email Password:", emailPass ? "***SET***" : "NOT SET");
  console.log("");
  
  if (!emailUser || !emailPass || emailUser === "your-email@gmail.com") {
    console.log("❌ Email not configured!");
    console.log("\n📋 To configure email:");
    console.log("1. Add to .env file:");
    console.log("   EMAIL_USER=your-email@gmail.com");
    console.log("   EMAIL_PASSWORD=your-app-password");
    console.log("\n2. For Gmail:");
    console.log("   • Enable 2-Step Verification");
    console.log("   • Generate App Password");
    console.log("   • Use that 16-digit password");
    process.exit(1);
  }
  
  const testCode = "123456";
  const testEmail = "test@example.com";
  
  console.log("Sending test email...");
  const result = await sendVerificationEmail(testEmail, testCode);
  
  if (result.success) {
    console.log("\n✅ Email service working!");
    console.log("Check", testEmail, "for verification code:", testCode);
  } else {
    console.log("\n❌ Email send failed!");
    console.log("Reason:", result.reason);
    console.log("Error:", result.error);
  }
};

testEmail();





