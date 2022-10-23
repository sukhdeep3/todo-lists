let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

async function fetchTodos(){
    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(function(response){
    //     //console.log(response);
    //     return response.json();
    // })
    // .then(function (data){
    //     tasks = data.slice(0,10);
    //     renderList();
    //     //console.log(data);
    // })
    // .catch(function(error){
    //     console.log('error', error)
    // })

    try{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    tasks = data.slice(0,10);
    renderList();
    }
    catch(error){
        console.log(error) 
    }
    
};

function addTasktoDOM(task){
    const li = document.createElement('li');

    li.innerHTML =`
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="https://cdn-icons-png.flaticon.com/128/484/484611.png" class="delete" data-id="${task.id}" />`

    tasksList.append(li);
}
function renderList () {
    tasksList.innerHTML='';

    for(let i=0; i<tasks.length; i++){
        addTasktoDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete (taskId) {
    let task = tasks.filter(function(task){
        return task.id == Number(taskId);
       });

       if(task.length>0){
        let currentTask = task[0];

        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification('Task is done');
        return;
       }
       showNotification('Could not toggle successfully');
}

function deleteTask (taskId) {
    let newTask = tasks.filter(function(task){
        return task.id !== Number(taskId);
    });
    tasks = newTask;
    renderList();
    showNotification('Task deleted successfully');
}

function addTask (task) {
    if(task){

    // fetch('https://jsonplaceholder.typicode.com/todos', 
    // { method:'POST',
    // headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(task),
    // })

    // .then(function(response){
    //     //console.log(response);
    //     return response.json();
    // })
    // .then(function (data){
    //     // tasks = data.slice(0,10);
    //     // renderList();
    //     console.log(data);
    //     tasks.push(task);
    //     renderList();
    //     showNotification('Task added successfully');
    //     return;
    // })
    // .catch(function(error){
    //     console.log('error', error)
    // })

        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task is not added');
}

function showNotification(text) {
    alert(text);
}

function handleKeypress(e){
    if(e.key ==='Enter'){
        const text = e.target.value;

        if(!text){
            showNotification('Task text can not be empty');
            return;
        }

        const task ={
            title: text,
            id: Date.now(),
            completed :false
        }

        e.target.value = '';
        addTask(task);
    }
}

function handleClickListener(e){
    const target = e.target;
    console.log(target);

    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return
    }
    else if(target.className === 'custom-checkbox'){
        const taskId =target.id;
        markTaskAsComplete (taskId);
        return;
    }

}

function initializeApp(){
    fetchTodos();
addTaskInput.addEventListener('keyup', handleKeypress);
document.addEventListener('click' , handleClickListener);
}

initializeApp();