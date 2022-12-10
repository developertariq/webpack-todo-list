/* eslint no-unused-vars: "error" */
// import _ from 'lodash';
import './style.css';
import {
  addNewTask, deleteTask, editTask, displayTaskList, completeTask,
} from './todolist.js';
import mainList from './loadlist.js';
import '@fortawesome/fontawesome-free/js/all.js';

function listContainer() {
  const listContainer = document.createElement('div');
  listContainer.id = 'list-container';
  listContainer.classList.add('active', 'complete');
  listContainer.appendChild(mainList());
  return listContainer;
}

document.body.appendChild(listContainer());
const form = document.querySelector('#new-task-form');
form.addEventListener('submit', () => {
  if (document.getElementById('newtask').value !== '') {
    addNewTask(form.elements.newtask.value);
  }
  displayTaskList();
});
const addNewButton = document.querySelector('#submit-new-task');
addNewButton.addEventListener('click', () => {
  if (document.getElementById('newtask').value !== '') {
    addNewTask(document.getElementById('newtask').value);
  }
  displayTaskList();
});

const selectTask = document.querySelector('#item-list');
selectTask.addEventListener('click', (e) => {
  const trashCan = document.querySelector('.fa-trash-can');
  const textarea = document.querySelectorAll('.edit-input');
  const label = document.querySelectorAll('.label');
  if (label !== null) {
    label.forEach((a) => {
      a.classList.remove('hide');
    });
  }
  if (textarea !== null) {
    textarea.forEach((a) => {
      a.classList.add('hide');
    });
  }
  if (trashCan !== null) {
    trashCan.classList.add('fas', 'fa-ellipsis-vertical');
    trashCan.classList.remove('far', 'fa-trash-alt');
  }

  if (e.target.classList.contains('label')) {
    e.target.classList.add('hide');

    let div = document.querySelector('.task-color-pink');
    if (div !== null) {
      div.classList.remove('task-color-pink');
      div.classList.add('task-color-white');
    }
    const nodeList = e.target.nextElementSibling.childNodes;
    const [remove] = nodeList;
    remove.classList.add('far', 'fa-trash-alt');
    div = e.target.parentNode;
    div.classList.remove('task-color-white');
    div.classList.add('task-color-pink');
    const sarea = e.target.previousElementSibling;
    sarea.classList.remove('hide');
    sarea.focus();
  }
});

const textarea = document.querySelectorAll('textarea');

for (let i = 0; i < textarea.length; i += 1) {
  textarea[i].onchange = function () {
    editTask(this.value, parseInt(this.name, 10));
    const div = this.nextElementSibling;
    div.innerText = this.value;
  };
}

selectTask.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash-can')) {
    const nod = e.target.parentNode;
    deleteTask(parseInt(nod.name, 10));
    const div = nod.parentElement;
    div.style.display = 'none';
  }
});

document.querySelector('#add-item').addEventListener('click', () => {
  const div = document.querySelector('.task-color-pink');
  if (div !== null) {
    div.classList.remove('task-color-pink');
    div.classList.add('task-color-white');
  }
});

document.querySelector('#remove-item').addEventListener('click', () => {
  const div = document.querySelector('.task-color-pink');
  if (div !== null) {
    div.classList.remove('task-color-pink');
    div.classList.add('task-color-white');
  }
});

const refreshList = document.querySelector('#list-head');
refreshList.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-rotate')) {
    displayTaskList();
    window.location.reload();
  }
});

const check = document.querySelectorAll('input[type=checkbox]');
for (let i = 0; i < check.length; i += 1) {
  check[i].onchange = function () {
    const div = this.nextElementSibling.nextElementSibling;
    if (this.checked === true) {
      div.classList.add('checked');
    } else {
      div.classList.remove('checked');
    }
  };
}

const remove = document.getElementById('remove-item');
remove.addEventListener('click', () => {
  const textinputs = document.querySelectorAll('input[type=checkbox]');
  const empty = [].filter.call(textinputs, (el) => el.checked);

  empty.forEach((e) => {
    completeTask(parseInt(e.name, 10));
  });
  displayTaskList();
  window.location.reload();
});
