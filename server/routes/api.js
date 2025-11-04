import express from "express";
import axios from "axios";
import SearchRecord from "../models/SearchRecord.js";

const router = express.Router();

// Auth middleware
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Not authenticated" });
};

router.get("/me", (req, res) => {
  res.json({ user: req.user || null });
});

router.post("/search", ensureAuth, async (req, res) => {
  try {
    const { term } = req.body;
    if (!term?.trim()) {
      return res.status(400).json({ error: "Search term required" });
    }

    // Fix: Use the correct Unsplash API endpoint
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: term,
        per_page: 20,
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    // Save search record
    await SearchRecord.create({
      userId: req.user._id,
      term: term.trim(),
      timestamp: new Date(),
    });

    // Ensure we're returning the results array
    if (response.data && response.data.results) {
      res.json({ results: response.data.results });
    } else {
      throw new Error('Invalid response from Unsplash API');
    }

  } catch (err) {
    console.error("Search failed:", err);
    res.status(500).json({ 
      error: "Search failed", 
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.response?.data : undefined
    });
  }
});

// Get user's search history
router.get("/history", ensureAuth, async (req, res) => {
  try {
    const history = await SearchRecord.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(20);
    
    res.json({ history });
  } catch (err) {
    console.error("Failed to fetch history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// Get top searches across all users
router.get("/top-searches", ensureAuth, async (req, res) => {
  try {
    const topSearches = await SearchRecord.aggregate([
      {
        $group: {
          _id: "$term",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      },
      {
        $project: {
          _id: 1,
          term: "$_id",
          count: 1
        }
      }
    ]);

    res.json({ searches: topSearches });
  } catch (err) {
    console.error("Failed to fetch top searches:", err);
    res.status(500).json({ error: "Failed to fetch top searches" });
  }
});

// Clear user's search history
router.delete("/history", ensureAuth, async (req, res) => {
  try {
    const { timeRange } = req.query;
    let query = { userId: req.user._id };
    
    if (timeRange && timeRange !== 'all') {
      const now = new Date();
      let startDate;
      
      switch(timeRange) {
        case '1hour':
          startDate = new Date(now.getTime() - 60 * 60 * 1000);
          break;
        case '24hours':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '7days':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        query.timestamp = { $gte: startDate };
      }
    }
    
    const result = await SearchRecord.deleteMany(query);
    res.json({ 
      message: "History cleared successfully",
      deletedCount: result.deletedCount 
    });
  } catch (err) {
    console.error("Failed to clear history:", err);
    res.status(500).json({ error: "Failed to clear history" });
  }
});

// Clear all top searches (admin action - clears all search records)
router.delete("/top-searches", ensureAuth, async (req, res) => {
  try {
    await SearchRecord.deleteMany({});
    res.json({ message: "All search records cleared successfully" });
  } catch (err) {
    console.error("Failed to clear top searches:", err);
    res.status(500).json({ error: "Failed to clear top searches" });
  }
});

export default router;