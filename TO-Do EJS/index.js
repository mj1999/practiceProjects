const express = require('express');
const port = 8000;
const app = express();                      
const db = require('./config/mongoose')    // database connection
app.use(express.urlencoded());       //to decode form data and store in body property of req 
app.use('/',require('./routes'));      // route handeling module
app.use(express.static('./assets'))    // static files(css,js) handeling module 
app.set("view engine","ejs");
app.set("views",'./views');




app.listen(port,function(err){
    if(err){
        console.log("error in starting server : ", err);
        return;
    }
    console.log("server started");
})