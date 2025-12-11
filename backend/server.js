require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Transaction = require("./models/Transaction");
const { authenticate } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Serve static files (profile pictures)
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Auth routes (public)
app.use("/api/auth", authRoutes);

// Profile routes (protected)
app.use("/api/profile", profileRoutes);

const formatError = (message) => ({ error: message });

// Health check endpoint to verify database connection and data
app.get("/api/health", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const isConnected = mongoose.connection.readyState === 1;
    const transactionCount = await Transaction.countDocuments();
    const dbName = mongoose.connection.name;
    
    res.status(200).json({
      status: "OK",
      database: {
        connected: isConnected,
        name: dbName,
        state: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      },
      transactions: {
        total: transactionCount,
      },
      message: isConnected 
        ? `Database connected successfully! Total transactions: ${transactionCount}`
        : "Database not connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: error.message,
    });
  }
});

const validateTransaction = (data) => {
  const errors = [];

  if (!data.title || typeof data.title !== "string" || !data.title.trim()) {
    errors.push("Title is required.");
  }

  const amount = Number(data.amount);
  if (Number.isNaN(amount) || amount <= 0) {
    errors.push("Amount must be a positive number.");
  }

  if (!["income", "expense"].includes(data.type)) {
    errors.push("Type must be either 'income' or 'expense'.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    amount,
    cleanedTitle: data.title?.trim(),
    cleanedCategory: data.category?.trim() || "General",
  };
};

app.get("/api/transactions", authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(formatError("Error fetching transactions: " + error.message));
  }
});

app.post("/api/transactions", authenticate, async (req, res) => {
  try {
    const { isValid, errors, amount, cleanedTitle, cleanedCategory } =
      validateTransaction(req.body);

    if (!isValid) {
      return res.status(400).json(formatError(errors.join(" ")));
    }

    const dateValue =
      req.body.date && !Number.isNaN(Date.parse(req.body.date))
        ? new Date(req.body.date)
        : new Date();

    const transaction = new Transaction({
      user: req.user._id,
      title: cleanedTitle,
      amount,
      category: cleanedCategory,
      type: req.body.type,
      date: dateValue,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json(formatError("Error creating transaction: " + error.message));
  }
});

app.delete("/api/transactions/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json(formatError("Transaction not found."));
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json(formatError("Error deleting transaction: " + error.message));
  }
});

app.use((req, res) => {
  res.status(404).json(formatError("Route not found."));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});