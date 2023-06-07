const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/myDB');                                                       
const db = mongoose.connection;                                                 //database connection

db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log("Successfully connected to the db");
});