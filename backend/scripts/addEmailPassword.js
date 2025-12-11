/**
 * Quick script to add Gmail App Password to .env file
 * Usage: node scripts/addEmailPassword.js
 */

const fs = require("fs");
const path = require("path");

// Gmail App Password from user
const appPassword = "siud zjoq kzmk rwal"; // Remove spaces
const cleanPassword = appPassword.replace(/\s/g, "");

// Gmail address - user ko puchna padega ya manually update karna padega
// For now, using the one from previous context
const emailUser = "hussanbhi143@gmail.com"; // User ko update karna padega

console.log("\n📧 Adding Email Credentials to .env file...\n");

// Read existing .env file
const envPath = path.join(__dirname, "..", ".env");
let envContent = "";

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, "utf8");
  console.log("✅ .env file found");
} else {
  console.log("⚠️  .env file not found, creating new one...");
}

// Check if EMAIL_USER and EMAIL_PASSWORD already exist
const emailUserRegex = /^EMAIL_USER=.*$/m;
const emailPassRegex = /^EMAIL_PASSWORD=.*$/m;

let updated = false;

if (emailUserRegex.test(envContent)) {
  // Update existing
  envContent = envContent.replace(emailUserRegex, `EMAIL_USER=${emailUser}`);
  console.log("✅ Updated EMAIL_USER");
  updated = true;
} else {
  // Add new
  envContent += `\nEMAIL_USER=${emailUser}\n`;
  console.log("✅ Added EMAIL_USER");
  updated = true;
}

if (emailPassRegex.test(envContent)) {
  // Update existing
  envContent = envContent.replace(emailPassRegex, `EMAIL_PASSWORD=${cleanPassword}`);
  console.log("✅ Updated EMAIL_PASSWORD");
  updated = true;
} else {
  // Add new
  envContent += `EMAIL_PASSWORD=${cleanPassword}\n`;
  console.log("✅ Added EMAIL_PASSWORD");
  updated = true;
}

// Write to .env file
try {
  fs.writeFileSync(envPath, envContent.trim() + "\n", "utf8");
  console.log("\n✅ Email credentials added successfully!");
  console.log("\n📋 Added to .env file:");
  console.log(`   EMAIL_USER=${emailUser}`);
  console.log(`   EMAIL_PASSWORD=${cleanPassword.substring(0, 4)}**** (hidden)`);
  console.log("\n📋 Next Steps:");
  console.log("1. Backend server restart karo (Ctrl+C then npm start)");
  console.log("2. New account signup karo");
  console.log("3. Ab code email par jayega!\n");
} catch (error) {
  console.error("\n❌ Error writing to .env file:", error.message);
  console.log("\n💡 Manual setup - .env file mein add karo:");
  console.log(`EMAIL_USER=${emailUser}`);
  console.log(`EMAIL_PASSWORD=${cleanPassword}\n`);
}


