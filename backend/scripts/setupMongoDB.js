require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const setupMongoDB = async () => {
  console.log("🔍 Checking MongoDB setup...\n");

  // Check if .env file exists
  const envPath = path.join(__dirname, "..", ".env");
  const envExists = fs.existsSync(envPath);

  if (!envExists) {
    console.log("📝 Creating .env file...");
    const defaultEnv = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/budget-tracker

# MongoDB Atlas (Cloud) - Uncomment and add your connection string:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/budget-tracker?retryWrites=true&w=majority
`;

    try {
      fs.writeFileSync(envPath, defaultEnv);
      console.log("✅ .env file created successfully!\n");
    } catch (error) {
      console.log("❌ Error creating .env file:", error.message);
      console.log("\nPlease create .env file manually in backend folder with:");
      console.log("MONGODB_URI=mongodb://localhost:27017/budget-tracker\n");
    }
  } else {
    console.log("✅ .env file already exists\n");
  }

  // Try to connect to MongoDB
  const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/budget-tracker";
  console.log(`🔗 Attempting to connect to: ${mongoURI.replace(/\/\/.*@/, "//***:***@")}\n`);

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ SUCCESS! MongoDB is connected!");
    console.log(`📊 Database Name: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Collections: ${collections.length > 0 ? collections.map(c => c.name).join(", ") : "None (will be created automatically)"}`);
    
    await mongoose.connection.close();
    console.log("\n🎉 Setup complete! You can now use your application.");
    
  } catch (error) {
    console.log("❌ MongoDB connection failed!\n");
    
    if (error.message.includes("ECONNREFUSED")) {
      console.log("⚠️  MongoDB is not running on your local machine.");
      console.log("\n📋 Solutions:");
      console.log("\n1️⃣  Install Local MongoDB:");
      console.log("   • Download: https://www.mongodb.com/try/download/community");
      console.log("   • Install MongoDB Community Server");
      console.log("   • Start MongoDB service from Windows Services");
      console.log("   • Then run: npm run setup-db\n");
      
      console.log("2️⃣  Use MongoDB Atlas (Cloud - Recommended & Free):");
      console.log("   • Sign up: https://www.mongodb.com/cloud/atlas/register");
      console.log("   • Create a free cluster");
      console.log("   • Click 'Connect' and copy connection string");
      console.log("   • Update MONGODB_URI in .env file");
      console.log("   • Then run: npm run setup-db\n");
      
      console.log("💡 Tip: MongoDB Atlas is easier - no installation needed!");
      
    } else if (error.message.includes("authentication failed")) {
      console.log("⚠️  Authentication failed. Please check your MongoDB credentials in .env file.");
    } else {
      console.log(`⚠️  Error: ${error.message}`);
    }
    
    process.exit(1);
  }
};

setupMongoDB();

