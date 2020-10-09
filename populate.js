require('dotenv').config();

const User = require('./database/models/user');
const ShoppingList = require('./database/models/shoppingList');
const mongoose = require('mongoose');


const conString = process.env.CONNECTION
                    .replace('<user>', process.env.USERNAME)
                    .replace('<pw>', process.env.PASSWORD);
                

mongoose.connect(conString, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) console.log(err);
    else onConnected();
});


async function onConnected() {
    console.log('connected, executing...');

    await User.deleteMany({});
    await ShoppingList.deleteMany({});

    await createUserAndShoppingList('admin', '12345', 'admin@jpgraphics.com', 'Boodschappen', 'dagdagelijkse');

    const shoppingItems = [
        { name: 'Ladder', description: 'metaal', theme: 'hobby', quantity: 1 },
        { name: 'Verf', description: 'rood en geel', theme: 'hobby', quantity: 2 },
        { name: 'schroeven', description: '9mm', theme: 'hobby', quantity: 50 },
    ];
    await createUserAndShoppingList('regularUser', '54321', 'regularuser@mail.com', 'Klusjeslijst', 'Hobby shop', shoppingItems);

    await createUser('evijochen', 'evijochen', 'evijochen@gmail.com');

    console.log('populating done...');

    mongoose.disconnect();
}


async function createUserAndShoppingList(username, pass, email, shoppingListName, description, shoppingItems) {
    const newUser = new User({
        name: username,
        email: email,
        hashPassword: pass
    });
    
    const createdUser = await newUser.save();
    console.log('USER CREATED: ', createdUser);


    const newShoppingList = new ShoppingList({
        ownerId: createdUser._id,
        name: shoppingListName,
        description: description,
        shoppingItems: shoppingItems || []
    });

    const createdShoppingList = await newShoppingList.save();
    console.log('SHOPPINGLIST CREATED: ', createdShoppingList);
}

async function createUser(username, pass, email) {
    const newuser = new User({
        name: username,
        email: email,
        hashPassword: pass
    });

    await newuser.save();
}
