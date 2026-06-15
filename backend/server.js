import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Contact Schema
const ContactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      maxlength: 5000,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: false,
    },
  }
);

const ContactMessage = mongoose.model(
  "ContactMessage",
  ContactMessageSchema
);

// Health Check
app.get("/api/healthz", (req, res) => {
  res.json({
    status: "ok",
    db:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// Contact Form API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const saved = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      id: saved._id,
      name: saved.name,
      email: saved.email,
      subject: saved.subject,
      message: saved.message,
      createdAt: saved.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to save message. Please try again.",
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});