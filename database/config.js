const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.DB_CNN);

        console.log('db online');

    }
    catch(error){
        throw new Error(error)
    }
}

module.exports = dbConnection;