import express from "express";
import passport from "passport";

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Debug endpoint
router.get("/debug", (req, res) => {
  res.json({
    user: req.user,
    authenticated: req.isAuthenticated(),
    session: req.session
  });
});

// GitHub OAuth routes
router.get("/github", (req, res, next) => {
  passport.authenticate("github", {
    scope: ["user:email"],
    session: true
  })(req, res, next);
});
router.get("/github/callback",
  passport.authenticate("github", { 
    failureRedirect: `${CLIENT_URL}/login`,
    session: true
  }),
  (req, res) => {
    // Log authentication success
    console.log("GitHub auth successful for user:", req.user?.id);
    res.redirect(`${CLIENT_URL}/search`);
  }
);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { 
  scope: ["profile", "email"],
  session: true
}));

router.get("/google/callback",
  passport.authenticate("google", { 
    failureRedirect: `${CLIENT_URL}/login`,
    session: true
  }),
  (req, res) => {
    console.log("Google auth successful for user:", req.user?.id);
    res.redirect(`${CLIENT_URL}/search`);
  }
);

// Check auth status
router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.status(403).json({ authenticated: false });
  }
});

// Updated logout route with proper session handling
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
      }
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });
});
export default router;