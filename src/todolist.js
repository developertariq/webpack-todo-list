// import { toInteger } from 'lodash';
import '@fortawesome/fontawesome-free/js/all.js';

let taskList = [];

export const addNewTask = (description) => {
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
};

export function deleteTask(index) {
  let newList = taskList.filter((a) => { if (a.index !== index) { if (a.index > index) { a.index -= 1; } return a; } return false; });
  taskList = newList;
  localStorage.setItem('todolist', JSON.stringify(taskList));
}

export const editTask = (description, index) => {
  const newList = taskList.filter((a) => {
    if (a.index === index) { a.description = description; return a; }
    return a;
  });
  taskList = newList;
  localStorage.setItem('todolist', JSON.stringify(taskList));
};

export function displayTaskList() {
  if (localStorage.getItem('todolist') !== null) {
    const newList = JSON.parse(localStorage.getItem('todolist') || []);
    taskList = newList;
    taskList = taskList.filter((a) => {
      if (a.completed !== true) { return a; }
      return 0;
    });
  }
}

export const itemList = () => {
  const itemdiv = document.createElement('div');
  itemdiv.id = 'item-list';
  displayTaskList();
  taskList.forEach((task) => {
    const div = document.createElement('div');
    div.classList.add('clear', 'todo', 'task-color-white');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.name = task.index;
    div.appendChild(checkbox);

    const textarea = document.createElement('textarea');
    textarea.classList.add('edit-input', 'hide');
    textarea.value = task.description;
    textarea.autocomplete = 'off';
    textarea.name = task.index;
    div.appendChild(textarea);

    const label = document.createElement('label');
    label.classList.add('label');
    label.innerText = `${task.description}`;
    label.name = task.index;
    div.appendChild(label);

    const refresh = document.createElement('div');
    refresh.classList.add('refresh');
    const remove = document.createElement('i');
    remove.classList.add('fas', 'fa-ellipsis-v');
    refresh.name = task.index;
    refresh.appendChild(remove);
    div.appendChild(refresh);
    itemdiv.appendChild(div);
  });

  return itemdiv;
};

export const completeTask = (index) => {
  const newList = taskList.filter((a) => {
    if (a.index === index) { a.completed = true; return a; }
    return a;
  });
  taskList = newList;
  localStorage.setItem('todolist', JSON.stringify(taskList));
};
