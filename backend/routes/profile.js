const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const { authenticate } = require("../middleware/auth");
const { validatePassword } = require("../utils/passwordValidator");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "..", "uploads", "profiles");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: userId-timestamp.extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, req.user.id + "-" + uniqueSuffix + ext);
  },
});

// File filter - only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Construct profile picture URL if exists
    let profilePictureUrl = null;
    if (user.profilePicture) {
      profilePictureUrl = `/api/uploads/profiles/${user.profilePicture}`;
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: profilePictureUrl,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile: " + error.message });
  }
});

// @route   PUT /api/profile/name
// @desc    Update user name
// @access  Private
router.put("/name", authenticate, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: "Name is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name.trim();
    await user.save();

    res.status(200).json({
      message: "Name updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating name: " + error.message });
  }
});

// @route   PUT /api/profile/password
// @desc    Update user password
// @access  Private
router.put("/password", authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Current password and new password are required",
      });
    }

    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: passwordValidation.errors.join(". "),
      });
    }

    // Get user with password
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating password: " + error.message });
  }
});

// @route   POST /api/profile/picture
// @desc    Upload/Update profile picture
// @access  Private
router.post("/picture", authenticate, upload.single("profilePicture"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      // Delete uploaded file if user not found
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: "User not found" });
    }

    // Delete old profile picture if exists
    if (user.profilePicture) {
      const oldPicturePath = path.join(__dirname, "..", "uploads", "profiles", user.profilePicture);
      if (fs.existsSync(oldPicturePath)) {
        fs.unlinkSync(oldPicturePath);
      }
    }

    // Save profile picture filename only (for easier URL construction)
    const filename = path.basename(req.file.path);
    user.profilePicture = filename;
    await user.save();

    // Return full URL for frontend
    const profilePictureUrl = `/api/uploads/profiles/${filename}`;

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: profilePictureUrl,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: profilePictureUrl,
      },
    });
  } catch (error) {
    // Delete uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: "Error uploading profile picture: " + error.message });
  }
});

// @route   DELETE /api/profile/picture
// @desc    Delete profile picture
// @access  Private
router.delete("/picture", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.profilePicture) {
      const picturePath = path.join(__dirname, "..", "uploads", "profiles", user.profilePicture);
      if (fs.existsSync(picturePath)) {
        fs.unlinkSync(picturePath);
      }
      user.profilePicture = null;
      await user.save();
    }

    res.status(200).json({
      message: "Profile picture deleted successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: null,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting profile picture: " + error.message });
  }
});

module.exports = router;

