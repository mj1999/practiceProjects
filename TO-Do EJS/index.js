const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose')
app.use(express.urlencoded()); //to decode form data and store in body property of req 
app.use('/',require('./routes'));
app.use(express.static('./assets'))
app.set("view engine","ejs");
app.set("views",'./views');




app.listen(port,function(err){
    if(err){
        console.log("error in starting server : ", err);
        return;
    }
    console.log("server started");
})