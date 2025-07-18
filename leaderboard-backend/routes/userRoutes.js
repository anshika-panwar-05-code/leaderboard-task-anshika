const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Get all users with rank
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({ totalPoints: -1 });
        const rankedUsers = users.map((user, index) => ({
            _id: user._id,
            name: user.name,
            totalPoints: user.totalPoints,
            rank: index + 1
        }));
        res.json(rankedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new user
router.post('/users', async (req, res) => {
    try {
        const { name } = req.body;
        const user = new User({ name });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Claim random points
router.post('/claim/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const points = Math.floor(Math.random() * 10) + 1;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.totalPoints += points;
        await user.save();

        const claimHistory = new ClaimHistory({
            userId: user._id,
            pointsAwarded: points
        });
        await claimHistory.save();

        res.json({
            message: `User ${user.name} awarded ${points} points.`,
            user,
            pointsAwarded: points
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get claim history for a user
router.get('/history/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const history = await ClaimHistory.find({ userId }).sort({ claimedAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
