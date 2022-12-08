import { toInteger } from 'lodash';
import '@fortawesome/fontawesome-free/js/all.js'

let taskList = [];

export const addNewTask =  (description) => {
  const task = {};
  task.description = description;
  task.completed = false;
  if (taskList !== null) {
    task.index = taskList.length + 1;
  } else {
    task.index = 1;
  }
  taskList.push(task);
  localStorage.setItem('todolist', JSON.stringify(taskList));
}

export const deleteTask = (index) => {
  let newList = taskList.filter ((a) => { 
    if (a.index !== index) {
      if (a.index > index) {
        a.index--;
      }
      return a;
    }
  });
  taskList = newList;
  localStorage.setItem('todolist', JSON.stringify(taskList));
}

export const editTask = (description, index) => {
  let newList = taskList.filter ((a) => { if (a.index === index) {
      a.description = description; 
      return a;
    } else {
      return a;
    }
  });
  taskList = newList;
  localStorage.setItem('todolist', JSON.stringify(taskList));
}

export const displayTaskList = () => {  
  if (localStorage.getItem('todolist') !== null) {
    const newList = JSON.parse(localStorage.getItem('todolist') || []);
    //localStorage.clear();
    taskList = newList;
    taskList = taskList.filter ((a) => { if (a.completed !== true) { return a; }});
  }
}

export const itemList = () => {
  const itemdiv = document.createElement('div');
  itemdiv.id='item-list';
  //itemdiv.classList.add('items');
  displayTaskList();
  taskList.forEach( task => {      
    const div = document.createElement('div');
    div.classList.add('clear', 'todo', 'task-color-white');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    div.appendChild(checkbox);

    const label = document.createElement('label');
    label.classList.add('label');
    label.innerText = task.description;
    // label.title = task.index;
    label.setAttribute('index', task.index);
    div.appendChild(label);

    const refresh = document.createElement('div');
    refresh.classList.add('refresh');

    const remove = document.createElement('i');
    remove.classList.add('fas', 'fa-ellipsis-v');
    // refresh.title = task.index;
    refresh.setAttribute('index', task.index);
    refresh.appendChild(remove);
    div.appendChild(refresh);
    itemdiv.appendChild(div);
  });
  
  return itemdiv;
}
