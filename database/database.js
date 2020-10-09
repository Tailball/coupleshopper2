const mongoose = require('mongoose');


const connectionstring = process.env.CONNECTION
                            .replace('<user>', process.env.USERNAME)
                            .replace('<pw>', process.env.PASSWORD);
    
const mongooseSettings = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

const onMongooseConnectionError = err => {
    console.log(err.message);
}

const onMongooseConnectionSuccess = () => {
    console.log('connected to database');
}

const onMongooseConnection = err => {
    if(err) onMongooseConnectionError(err);
    else onMongooseConnectionSuccess();
}
                                         
mongoose.connect(
    connectionstring, 
    mongooseSettings,
    onMongooseConnection
);