const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

const checkDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/budget-tracker";
    
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected Successfully!");
    console.log(`Database Name: ${mongoose.connection.name}`);
    
    // Count total transactions
    const count = await Transaction.countDocuments();
    console.log(`\n📊 Total Transactions in Database: ${count}`);
    
    // Get latest 5 transactions
    const latestTransactions = await Transaction.find()
      .sort({ date: -1 })
      .limit(5)
      .lean();
    
    if (latestTransactions.length > 0) {
      console.log("\n📝 Latest 5 Transactions:");
      latestTransactions.forEach((txn, index) => {
        console.log(`${index + 1}. ${txn.title} - ${txn.type} - $${txn.amount} (${txn.date})`);
      });
    } else {
      console.log("\n📝 No transactions found in database yet.");
    }
    
    await mongoose.connection.close();
    console.log("\n✅ Database check completed!");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

checkDatabase();


