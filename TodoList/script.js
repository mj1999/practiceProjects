const addItem = document.getElementById("add-item");
const taskCount = document.getElementById("task-counter");
const taskList = document.getElementById("list");
let tasks = [];
function getInput(e)
{
    if(e.key=="Enter")
    {
        const text = e.target.value;
        if(!text){
            showNotif("No text Entered")
        }
        const task = {
            text,
            id : Date.now().toString(),
            completed : false
        }
        addItem.value="";
        addToList(task);
    }
}

function showNotif(text)
{
    window.alert(text);
}

function addToList(task){
    if(task)
    {
        tasks.push(task);
        renderList();
    }
    
}

function deleteFromList(taskId)
{
    const newTask = tasks.filter(task=> taskId!=task.id)
    tasks = newTask;
    renderList();

}

function markComplete(taskId)
{
    for(task of tasks)
    {
        if(task.id==taskId)
        {
            task.completed = true;
        }
    }
    renderList();
}

function renderList(){

}

addItem.addEventListener('keyup',getInput);