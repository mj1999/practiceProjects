const express = require('express');
const path = require('path');
const port = 8000;
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));
app.use(express.urlencoded());
app.use(express.static("assets"))
app.get('/',function(req,res){
    res.render('home',{title:"My contacts list",contact_list:contacts});
})

app.post('/add-contact',function(req,res){
    contacts.push(req.body);
    res.redirect('back');
})
app.get('/delete-number/:phone',function(req,res){
    const phoneObj = req.params;
    let index = contacts.findIndex((contact)=>contact.phone==phoneObj.phone);
    
    contacts.splice(index,1);
    
    res.redirect('/')
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