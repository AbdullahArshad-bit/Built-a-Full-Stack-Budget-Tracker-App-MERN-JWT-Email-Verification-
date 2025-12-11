/**
 * Email Service Setup Helper Script
 * This script helps you set up email service for verification codes
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n📧 EMAIL SERVICE SETUP GUIDE\n");
console.log("=" .repeat(50));
console.log("\nYe script aapko email service setup karne mein help karegi.\n");

console.log("📋 STEP 1: Gmail App Password Generate Karein\n");
console.log("1. https://myaccount.google.com par jao");
console.log("2. Security tab → 2-Step Verification enable karo");
console.log("3. App Passwords → Generate");
console.log("4. 'Mail' select karo");
console.log("5. 'Budget Tracker' name do");
console.log("6. 16-digit password copy karo\n");

console.log("📋 STEP 2: Credentials Enter Karein\n");

rl.question("Enter your Gmail address: ", (email) => {
  if (!email || !email.includes("@")) {
    console.log("\n❌ Invalid email address!");
    rl.close();
    return;
  }

  rl.question("Enter your 16-digit App Password (spaces allowed): ", (password) => {
    if (!password || password.length < 16) {
      console.log("\n❌ Invalid password! App password should be 16 characters.");
      rl.close();
      return;
    }

    // Remove spaces from password
    const cleanPassword = password.replace(/\s/g, "");

    // Read existing .env file
    const envPath = path.join(__dirname, "..", ".env");
    let envContent = "";

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, "utf8");
    }

    // Check if EMAIL_USER and EMAIL_PASSWORD already exist
    const emailUserRegex = /^EMAIL_USER=.*$/m;
    const emailPassRegex = /^EMAIL_PASSWORD=.*$/m;

    if (emailUserRegex.test(envContent)) {
      // Update existing
      envContent = envContent.replace(emailUserRegex, `EMAIL_USER=${email}`);
    } else {
      // Add new
      envContent += `\nEMAIL_USER=${email}\n`;
    }

    if (emailPassRegex.test(envContent)) {
      // Update existing
      envContent = envContent.replace(emailPassRegex, `EMAIL_PASSWORD=${cleanPassword}`);
    } else {
      // Add new
      envContent += `EMAIL_PASSWORD=${cleanPassword}\n`;
    }

    // Write to .env file
    try {
      fs.writeFileSync(envPath, envContent.trim() + "\n", "utf8");
      console.log("\n✅ Email credentials added to .env file!");
      console.log("\n📋 Next Steps:");
      console.log("1. Backend server restart karo (Ctrl+C then npm start)");
      console.log("2. New account signup karo");
      console.log("3. Ab code email par jayega!\n");
      console.log("💡 Test karne ke liye: npm start (backend folder mein)\n");
    } catch (error) {
      console.error("\n❌ Error writing to .env file:", error.message);
      console.log("\n💡 Manual setup:");
      console.log(`EMAIL_USER=${email}`);
      console.log(`EMAIL_PASSWORD=${cleanPassword}\n`);
    }

    rl.close();
  });
});


