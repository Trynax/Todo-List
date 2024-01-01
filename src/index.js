import './styles.css';
import { Task } from './create-taks';
import { tasks } from './tasks';
import icon from './img/inbox.png';
const taskInfo = document.querySelector('.task-info');
const btnAdd = document.querySelector('.btn-add');
const taskList = document.querySelector('.tasks');


// Your existing code...

btnAdd.addEventListener('click', () => {
    taskInfo.innerHTML = `
        <form action="">
        <label for="Title">Title:</label>
        <input class="title" type="text" placeholder="What to do?">
        <label for="Details">Details:</label>
        <textarea  class="desc" placeholder="eg:I'm just gonna procastinate, aren't I?" name="" id="" cols="30" rows="10"></textarea>
        <label for="Date">Date:</label>
        <input  class="date" type="date">
        </form>
        <div class="form-btns">
            <button class="add-btn">Add</button>
            <button class="cancel-btn">Cancel</button>
        </div>
    `;

    // Move the event listener inside this bloc
    const date = document.querySelector('.date');
    const title = document.querySelector('.title');
    const details = document.querySelector('.desc');
    const addTaskBtn = document.querySelector('.add-btn');
    addTaskBtn.addEventListener('click', () => {
        const newTask = new Task(`${title.value}`,`${date.value}`,`${details.value}`)
        tasks.push(newTask);
        taskInfo.innerHTML=``;
        title.value='';
        date.value='';
        details.value='';
        rederTaskList();
        console.log(tasks);
    });

    const cancelBtn = document.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', ()=>{
        taskInfo.innerHTML='';
    })
});

function rederTaskList() {
    taskList.innerHTML=``;
    tasks.forEach((task)=>{
       
        task= ` <li class="task">
        <div class="task-title-date">
            <h3 class="task-title">${task.title}</h3>
            <h3 class="task-date">${task.date}</h3>
        </div>
        <p class="task-details">${task.details}</p>
    </li>
    `
    taskList.innerHTML+=task;
    })
    console.log(taskList.innerHTML);
}

rederTaskList()

const myIcon = new Image();
  myIcon.src = icon;

  document.body.appendChild(myIcon);
  
