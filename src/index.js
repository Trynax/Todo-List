import './styles.css';
import { Task } from './create-taks';
import { tasks } from './tasks';
import allTaskIcon from './img/inbox.png';
import importantIcon from './img/star.png';
import sevenDaysIcon from './img/week.png';
import todayIcon from './img/today.png';
import { getAllTasks } from './tasks';
import { addDays, startOfDay, endOfDay, isToday, isAfter, isBefore, parse } from 'date-fns';
const taskCategories = document.querySelector('.task-type');
const contentElem = document.querySelector('.content');
const allTasks = getAllTasks(tasks);
//const tasksForNextSevenDays = filterNextSevenDays(tasks);
//const tasksForToday = filterTodayTasks(tasks);




taskCategories.innerHTML=` <li  class="task-cartegory allTasks selected"><img src="${allTaskIcon}" alt=""><p>All Tasks</p></li>
<li class="task-cartegory todayTasks "><img src="${todayIcon}" alt=""><p>Today</p></li>
<li  class="task-cartegory nextSevenDaysTasks"><img src="${sevenDaysIcon}" alt=""><p>Next 7 days</p></li>
<li  class="task-cartegory"><img src="${importantIcon}" alt=""><p>Important</p></li>`;


contentElem.innerHTML=` <figure class="content-header">
<h3>All Tasks</h3>
</figure>
<ul class="tasks">

</ul>
<div class="task-info">
</div>


<button class="btn-add">Add Task</button>
`;
const allTask = document.querySelector('.allTasks');
allTask.addEventListener('click', () => {
    const header = document.querySelector('.content-header h3');
    header.textContent = 'All Tasks';
    hideAndShowTaskFunction('block')
    rederTaskList(allTasks); 
});

const btnAdd = document.querySelector('.btn-add');
const taskInfo = document.querySelector('.task-info');
const taskList = document.querySelector('.tasks');
const taskCategoryElem = document.querySelectorAll('.task-cartegory');

taskCategoryElem.forEach((eachTask) => {
    eachTask.addEventListener('click', () => {
        taskCategoryElem.forEach((task) => {
            task.classList.remove('selected');
        });
        
        eachTask.classList.add('selected');
    });
});


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
        rederTaskList(allTasks);
        console.log(tasks);
      
    });

    const cancelBtn = document.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', ()=>{
        taskInfo.innerHTML='';
    })
});

function rederTaskList(renderTasks) {
  
    taskList.innerHTML=``;
    renderTasks.forEach((task)=>{
       
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
}


// Example usage


rederTaskList(allTasks)

const todayTasks = document.querySelector('.todayTasks');
todayTasks.addEventListener('click', ()=>{
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-CA');
       const tasksTorender =  tasks.filter((task)=>{
            if (task.date===formattedDate) {
                return true;
            }else{
            return false
            }
        })
    
    
    const header = document.querySelector('.content-header h3');
    header.textContent = 'Today Tasks';

    hideAndShowTaskFunction('none')
    console.log(tasks);
    console.log(tasksTorender);
  rederTaskList(tasksTorender);
})

const nextSevenDays = document.querySelector('.nextSevenDaysTasks');
nextSevenDays.addEventListener('click', () => {
    const today = startOfDay(new Date());
    const futureDate = addDays(today, 7);
  
    const tasksToRender = tasks.filter((task) => {
        const taskDate = parse(task.date, 'yyyy-MM-dd', new Date());
        return isAfter(taskDate, today) && isBefore(taskDate, futureDate);
    });

    hideAndShowTaskFunction('none');
    const header = document.querySelector('.content-header h3');
    header.textContent = 'Next 7 Days Tasks';
    console.log('Hello &');
    rederTaskList(tasksToRender);
});


function hideAndShowTaskFunction (status){
    const taskInfo = document.querySelector('.task-info');
    const addTaskBtn = document.querySelector('.btn-add');

    // Hide task info and button by setting their display property to none
    taskInfo.style.display = status;
    addTaskBtn.style.display = status;
}