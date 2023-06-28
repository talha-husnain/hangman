const mongoose = require('mongoose')

const connectDataBase = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://talha786:xsvkG26LUDsKGiv9@cluster0.d6x1mos.mongodb.net/?retryWrites=true&w=majority")
        console.log(`DB connected: ${conn.connection.host}`);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDataBase