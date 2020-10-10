const moongose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        await moongose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw Error('Error al iniciar la BD');
    }
};

module.exports = {
    dbConnection
};