const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    token: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    createdAt: {
        type: Number,
        required: true,
        default: Date.now()
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;