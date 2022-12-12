/* eslint no-unused-vars: "error" */
/* eslint no-unsafe-optional-chaining: ["error", { "disallowArithmeticOperators": false }] */

import './style.css';
import {
  addNewTask, deleteTask, editTask, displayTaskList, completeTask,
} from './todolist.js';
import mainList from './loadlist.js';
import '@fortawesome/fontawesome-free/js/all.js';

let newDesc = '';
function changeValue(a) {
  newDesc = a;
}

function getValue() {
  return newDesc;
}

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
  if (e.target.classList.contains('fa-trash-can')) {
    const nod = e.target.parentNode;
    deleteTask(parseInt(nod.name, 10));
    const div = nod.parentElement;
    div.style.display = 'none';
  }
});

const descLabel = document.querySelectorAll('.desription');

for (let i = 0; i < descLabel.length; i += 1) {
  descLabel[i].onclick = function () {
    const label = document.querySelector('.task-color-pink');
    if (label !== null) {
      label.classList.remove('task-color-pink');
      label.classList.add('task-color-white');
    }
    const trashCan = document.querySelector('.fa-trash-can');
    if (trashCan !== null) {
      trashCan.classList.add('fas', 'fa-ellipsis-vertical');
      trashCan.classList.remove('far', 'fa-trash-alt');
    }
    const check = this.previousElementSibling;

    if (check !== null) {
      check.checked = false;
      this.classList.remove('checked');
    }
    this.parentNode.classList.remove('task-color-white');
    this.parentNode.classList.add('task-color-pink');

    const nodeList = this.nextElementSibling.childNodes;

    const [remove] = nodeList;
    remove.classList.add('far', 'fa-trash-alt');
    this.setAttribute('contenteditable', 'true');
    this.setAttribute('autocomplete', 'on');
    this.focus();
  };

  descLabel[i].oninput = function () {
    changeValue(this.innerText);
  };

  descLabel[i].onblur = function () {
    if (getValue() !== '') {
      editTask(getValue(), parseInt(this.name, 10));
      changeValue('');
    }
  };
}

document.querySelector('#add-item').addEventListener('click', () => {
  const div = document.querySelector('.task-color-pink');
  if (div !== null) {
    div.classList.remove('task-color-pink');
    div.classList.add('task-color-white');
  }
  const trashCan = document.querySelector('.fa-trash-can');
  if (trashCan !== null) {
    trashCan.classList.add('fas', 'fa-ellipsis-vertical');
    trashCan.classList.remove('far', 'fa-trash-alt');
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
    const div = this.nextElementSibling;
    const trashCan = document.querySelector('.fa-trash-can');
    if (trashCan !== null) {
      trashCan.classList.add('fas', 'fa-ellipsis-vertical');
      trashCan.classList.remove('far', 'fa-trash-alt');
    }
    const span = document.querySelector('.task-color-pink');
    if (span !== null) {
      span.classList.remove('task-color-pink');
      span.classList.add('task-color-white');
    }
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
