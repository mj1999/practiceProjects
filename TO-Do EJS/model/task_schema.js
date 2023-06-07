const mongoose = require('mongoose');
const task_schema = new mongoose.Schema({
    description:{                                                                                           //task schema model for mongoDB
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:false
    },
    category:{
        type:String,
        required:false
    }
})
const Tasks = mongoose.model('tasks',task_schema);                                          //schema creation in our database
module.exports = Tasks;