const mongoose = require('mongoose');
const shoppingItem = require('./shoppingItem');

const shoppingListSchema = mongoose.Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: false
    },
    dateCreated: { 
        type: Number, 
        default: Date.now,
        required: true
    },
    shoppingItems: { 
        type: [ shoppingItem ], // array of embedded document with its own schema to allow validation on it as well
        default: [],
        required: true
    }
});

const ShoppingList =  mongoose.model('shoppinglist', shoppingListSchema);
module.exports = ShoppingList;