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

export const remove = (index) => {
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

export const edit = (description, index) => {
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
  itemdiv.classList.add('items');
  displayTaskList();
  taskList.forEach( task => {      
    const div = document.createElement('div');
    div.classList.add('clear', 'todo');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    div.appendChild(checkbox);

    const label = document.createElement('label');
    label.classList.add('label');
    label.innerText = task.description;
    div.appendChild(label);

    const remove = document.createElement('i');
    remove.classList.add('fas', 'fa-ellipsis-v');
    // remove.classList.add('far', 'fa-trash-alt');
    div.appendChild(remove);

    itemdiv.appendChild(div);
  });
  
  return itemdiv;
}

export  default taskList;