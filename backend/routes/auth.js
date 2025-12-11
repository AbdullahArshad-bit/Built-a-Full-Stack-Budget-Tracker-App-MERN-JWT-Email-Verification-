const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../middleware/auth");
const { validatePassword } = require("../utils/passwordValidator");
const { sendVerificationEmail } = require("../utils/emailService");

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

// Generate 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please provide all required fields (name, email, password)",
      });
    }

    // Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: passwordValidation.errors.join(". "),
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create new user (password will be hashed in pre-save hook)
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      emailVerified: false,
      verificationCode,
      verificationCodeExpiry,
    });

    await user.save();

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationCode);
    
    // If email not configured or failed, return code in response for development
    if (!emailResult.success) {
      console.log("\n📧 VERIFICATION CODE (Email not configured):", verificationCode);
      console.log("Email:", email, "\n");
      
      return res.status(201).json({
        message: "Account created successfully! Email service not configured. Use the code below:",
        email: user.email,
        requiresVerification: true,
        verificationCode: verificationCode, // Include code in response for development
        emailNotConfigured: true,
      });
    }

    res.status(201).json({
      message: "Account created successfully! Please check your email for verification code.",
      email: user.email,
      requiresVerification: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    }
    res.status(500).json({
      error: "Error creating user: " + error.message,
    });
  }
});

// @route   POST /api/auth/verify-email
// @desc    Verify email with code
// @access  Public
router.post("/verify-email", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        error: "Please provide email and verification code",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        error: "Email already verified",
      });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({
        error: "Invalid verification code",
      });
    }

    if (user.verificationCodeExpiry && new Date() > user.verificationCodeExpiry) {
      return res.status(400).json({
        error: "Verification code has expired. Please request a new one.",
      });
    }

    // Verify email
    user.emailVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiry = null;
    await user.save();

    res.status(200).json({
      message: "Email verified successfully! You can now login.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error verifying email: " + error.message,
    });
  }
});

// @route   POST /api/auth/resend-code
// @desc    Resend verification code
// @access  Public
router.post("/resend-code", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Please provide email",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        error: "Email already verified",
      });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = verificationCodeExpiry;
    await user.save();

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationCode);

    if (!emailResult.success) {
      // If email not configured, return code in response
      if (emailResult.reason === "email_not_configured") {
        return res.status(200).json({
          message: "Email service not configured. Use the code below:",
          verificationCode: verificationCode,
          emailNotConfigured: true,
        });
      }
      return res.status(500).json({
        error: "Failed to send verification email. Please try again later.",
      });
    }

    res.status(200).json({
      message: "Verification code sent to your email",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error resending code: " + error.message,
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("\n🔐 Login attempt for:", email);

    // Validation
    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({
        error: "Please provide email and password",
      });
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      console.log("❌ User not found:", email.toLowerCase());
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    console.log("✅ User found:", user.email);
    console.log("📧 Email verified:", user.emailVerified);

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      console.log("❌ Invalid password");
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    console.log("✅ Password valid");

    // Check if email is verified
    if (!user.emailVerified) {
      console.log("⚠️ Email not verified - redirecting to verification");
      return res.status(403).json({
        error: "Please verify your email before logging in. Check your email for verification code or use the code shown during signup.",
        requiresVerification: true,
        email: user.email,
      });
    }

    // Generate token
    const token = generateToken(user._id);
    console.log("✅ Login successful, token generated");

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      error: "Error logging in: " + error.message,
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", require("../middleware/auth").authenticate, async (req, res) => {
  try {
    res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching user: " + error.message,
    });
  }
});

module.exports = router;

