const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const User = require('../database/models/user');


/**
 * ROUTE:           /api/authentication/signin
 * METHOD:          POST
 * AUTHENTICATION:  NO
 * BODY:            { username, password }
 */
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ name: username });

    if(!user || user.hashPassword !== password) return res.status(401).json({
        success: false,
        reason: 'Incorrect username or password'
    });

    user.token = new mongoose.Types.ObjectId();
    await user.save();
    
    return res.json({
        success: true,
        authToken: user.token
    });
});


/**
 * ROUTE:           /api/authentication/signout
 * METHOD:          POST
 * AUTHENTICATION:  NO
 * BODY:            { username }
 */
router.post('/signout', async (req, res) => {
    const user = await User.findOne({ name: req.body.username });

    if(!user) return res.status(404).json({
        success: false,
        reason: 'Account not found'
    });

    user.token = null;
    await user.save();

    return res.json({
        success: true
    });
});


/**
 * ROUTE:           /api/authentication/checkvalidtoken
 * METHOD:          POST
 * AUTHENTICATION:  NO
 * BODY:            { validToken }
 */
router.post('/checkvalidtoken', async (req, res) => {
    const { validToken } = req.body;

    const user = await User.findOne({ token: mongoose.Types.ObjectId(validToken) });

    if(user) {
        return res.json({ success: true });
    }
    else {
        return res.json({ success: false });
    }
});


module.exports = router;