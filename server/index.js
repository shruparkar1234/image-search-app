import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import "./passport-config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050; // Changed to 5050 to avoid conflicts
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);
// Session configuration - MUST be before passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "lax"
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Create server with error handling
    const server = app.listen(PORT)
      .on('listening', () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      })
      .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`❌ Port ${PORT} is in use. Please try:`);
          console.log(`1. Kill the process: kill -9 $(lsof -ti:${PORT})`);
          console.log('2. Restart the server: node index.js');
          process.exit(1);
        } else {
          console.error('Server error:', err);
          process.exit(1);
        }
      });

  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
};

startServer();