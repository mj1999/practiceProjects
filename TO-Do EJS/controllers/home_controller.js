const Tasks = require('../model/task_schema');
module.exports.home = function(req,res){
    
    Tasks.find().then((tasks)=>{
        function dateSplit(task)
        {
            let fullDate = task.date;
            let arr = fullDate.toString().split(' ');
            return arr[1]+arr[2]+","+arr[3] ;
        }
        
        res.render('home',{tasks:tasks,dateSplit:dateSplit})
    }).catch((err)=>{console.log("error loading the tasks-",err)});
}