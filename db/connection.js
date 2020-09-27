require('dotenv').config();
const mongoose = require('mongoose');
const adminName = process.env.DB_ADMIN;
const password = process.env.DB_PASS;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const mongoDB = `mongodb+srv://${adminName}:${password}@cluster15.itbvz.gcp.mongodb.net/recipesApp?retryWrites=true&w=majority`;

mongoose.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("Database connected...");
} )

module.exports.db = mongoose.connection;