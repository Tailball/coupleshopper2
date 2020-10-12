//load env files
require('dotenv').config();
const path = require('path');


//load models and set up mongodb
require('./database/models/shoppingList');
require('./database/database');


//load express and set up server
const express = require('express');
const server = express();


//load up middleware
server.use(express.json({ limit: '3mb' }));
server.use(require('cors')());
server.use(require('./middleware/logger'));


//load up routes
const authenticate = require('./middleware/authenticate');
server.use('/api/authentication', require('./routes/authentication'));
server.use('/api/shoppinglists', authenticate, require('./routes/shoppinglists'));


//load up static
const distDir = path.resolve(__dirname, 'client/dist');
server.use('/', express.static(distDir));


//activate server
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server is up and running on port ${port}`));