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

function toggleTask(taskId)
{
    for(let task of tasks)
    {
        if(task.id==taskId)
        {
            task.completed = !task.completed;
        }
    }
    renderList();
}

function renderList(){
    taskList.innerHTML="";
    for( let task of tasks)
    {
        addToDom(task);
    }
    taskCount.innerHTML=tasks.length;
}
function addToDom(task){
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="checkbox" ${task.completed?'checked':''} class ="custom-checkbox" id="${task.id}"><label for="${task.id}">${task.text}</label>
    `;
    taskList.append(listItem);
    
}

addItem.addEventListener('keyup',getInput);