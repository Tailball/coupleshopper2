const mongoose = require('mongoose');
const User = require('../database/models/user');

const authenticate = async (req, res, next) => {
    const token = req.headers['auth-token'];

    if(!token) {
        console.log(`Route requires authentication. No token found in headers.`);
        return res.status(401).json({
            success: false,
            reason: 'Not authenticated'
        });
    }

    const user = await User.findOne({ token: mongoose.Types.ObjectId(token) });
    
    if(!user) {
        console.log(`Route requires authentication. Incorrect token found in headers.`);
        return res.status(401).json({
            success: false,
            reason: 'Not authenticated'
        });
    }

    req.user = user;
    console.log(`Route requires authentication. Authenticated @ ${user.name}`);
    
    next();
};

module.exports = authenticate;