const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./model/contactSchema');
const { render } = require('ejs');
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));
app.use(express.urlencoded()); //to decode form data and store in body property of req 
app.use(express.static("assets"))
app.get('/',function(req,res){
    Contact.find().then((contacts)=>{res.render('home',{title:"My Contacts",contact_list:contacts})}).catch((err)=>{console.log(err,'error fetching contacts')});

})

app.post('/add-contact',function(req,res){
    Contact.create(req.body).then((contactDetail)=>{console.log('contact created successfully',contactDetail)}).catch((err)=>{console.log('error creating contact')});
    res.redirect('back');
})
app.get('/delete-number',function(req,res){
    const id = req.query.id;
    console.log(id);
    Contact.findByIdAndDelete(id).then(()=>{res.redirect('/')}).catch(()=>{console.log('Error while deleting contact')});
   
})

const contacts =[
    {
        name: 'Sarah', phone: '3435334456'
    },
    {
        name: 'Jane', phone: '5142967395'
    },
    {
        name: 'Jane', phone: '3716865393'
    },
    {name: 'Michael', phone: '2897515903'},
    {name: 'Emily', phone: '9286990791'}
]
app.listen(port,function(err){
    if(err)
    {
        console.log("err in server");
    }
    console.log("Server running");
})