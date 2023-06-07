const Tasks = require('../model/task_schema');


module.exports.add_task = function(req,res){
    Tasks.create(req.body).then((task)=>{console.log('task added-',task)}).catch((err)=>{console.log('error adding task-',err)})
    console.log(req.body);
    res.redirect('back');
}
module.exports.delete_task = function(req,res){
    const str = req.query;                                                  //query string containing concatinated id's of all checked elements
    for(let q in str)
    {
        let id = str[q];
        let deletion = Tasks.findByIdAndDelete(id);                         // deleting checked tasks one by one by findbyidanddelete function
        deletion.then(()=>{res.redirect('back')}).catch(()=>{console.log('Error while deleting',id)});
    }
   
}