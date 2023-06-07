const Tasks = require('../model/task_schema');
module.exports.home = function(req,res){
    
    Tasks.find().then((tasks)=>{
function dateSplit(task)                                                                                    // date split function which is later passed as a local variable to the view 
        {
            let fullDate = task.date;
            let arr = fullDate.toString().split(' ');
            return arr[1]+arr[2]+","+arr[3] ;
        }
        
        res.render('home',{tasks:tasks,dateSplit:dateSplit})                                                //Passing tasks object array loaded from db to the view as local variable
    }).catch((err)=>{console.log("error loading the tasks-",err)});
}