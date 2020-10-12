const mongoose = require('mongoose');

const shoppingItem = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
        required: false
    },
    theme: { 
        type: String,
        required: true 
    },
    quantity: { 
        type: Number,
        required: true 
    },
    image: {
        type: String,
        required: false
    },
    dateCreated: { 
        type: Number, 
        default: Date.now(),
        required: true
    }
});

//does not have a model. is an embedded document
module.exports = shoppingItem;