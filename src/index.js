import _ from 'lodash';
import './style.css';
import { addNewTask, deleteTask, edit, displayTaskList, itemList } from './todolist';
import '@fortawesome/fontawesome-free/js/all'

function listHead () {
  const div = document.createElement('div');
  div.id = 'list-head';
  div.classList.add('list-head');
  const h2 = document.createElement('h2');
  h2.innerText = 'Today\'s To Do';
  div.appendChild(h2);
  const refresh = document.createElement('div');
  refresh.classList.add('refresh');
  const btnRefresh = document.createElement('i');
  btnRefresh.classList.add('color-green', 'fas', 'fa-sync-alt');
  refresh.appendChild(btnRefresh);
  div.appendChild(refresh);
  return div;
}

function addItem () {
  const div = document.createElement('div');
  div.id='add-item';
  // div.classList.add('items');
  const form = document.createElement('form');
  form.id = 'new-task-form';
  form.action = '#';
  const text = document.createElement('input');
  text.id = 'newtask';
  text.name = 'newtask';
  text.classList.add('input-item')
  text.type = 'text';
  text.placeholder = 'Add to your list...';
  text.required = true;
  form.appendChild(text);
  const submit = document.createElement('input');
  submit.id = 'submit-new-task';
  submit.classList.add('input-item', 'fas', 'fa-level-down-alt');
  submit.style.rotate = '90deg';
  submit.style.fontSize = '18px';
  submit.type = 'submit';
  submit.tabIndex = -1;
  submit.value = '';
  submit.title  = 'click this or press enter to submit';
  const btndiv = document.createElement('div');
  btndiv.id='add-btn-wrap';
  btndiv.classList.add('refresh');
  btndiv.appendChild(submit);
  form.appendChild(btndiv);
  div.appendChild(form);
  return div;
}

function removeSelected () {
  const div = document.createElement('div');
  div.id = 'remove-item';
  // div.classList.add('items');
  const button = document.createElement('button');
  button.classList.add('remove-selected');
  button.type = 'button';
  button.innerText = 'Clear all completed';
  div.appendChild(button);  
  return div;
}

function lists() {
  const lists = document.createElement('div');
  lists.classList.add('list');
  lists.appendChild(addItem());
  lists.appendChild(itemList());
  lists.appendChild(removeSelected());
  return lists;
}

function mainList () {
  const main_list = document.createElement('div');
  main_list.classList.add('main-list');
  main_list.appendChild(listHead());
  main_list.appendChild(lists());
  return main_list;
}

function listContainer() {
  const list_container = document.createElement('div');
  list_container.id = 'list-container';
  list_container.classList.add('active', 'complete');
  list_container.appendChild(mainList());
  return list_container;
}

document.body.appendChild(listContainer());
const form = document.querySelector('#new-task-form');

form.addEventListener('submit', (event) => {
  if (document.getElementById('newtask').value !== '') {
    addNewTask (form.elements.newtask.value);
  }
  displayTaskList();
});


document.querySelector('#submit-new-task').addEventListener('click', () => {  
  if (document.getElementById('newtask').value !== '') {
    addNewTask (document.getElementById('newtask').value);
  }
  displayTaskList();
});

const selectTask = document.querySelector('#item-list');
selectTask.addEventListener('click', (e) => {
  if (e.target.classList.contains('label')) {
    let div = document.querySelector('.task-color-pink'); 
    if (div !== null) {
      div.classList.remove('task-color-pink');
      div.classList.add('task-color-white');
    }
    const nodeList = e.target.nextElementSibling.childNodes; ;
    const [remove] = nodeList;
    remove.classList.add('far', 'fa-trash-alt');
    div = e.target.parentNode;
    div.classList.remove('task-color-white');
    div.classList.add('task-color-pink');
  }
  if (e.target.classList.contains('fa-trash-can')) {
    const nod = e.target.parentNode;
    deleteTask(parseInt(nod.title));
    displayTaskList();
    window.location.reload();
  }
  document.querySelector('.fa-trash-can').classList.add('fas', 'fa-ellipsis-vertical');
  document.querySelector('.fa-trash-can').classList.remove('far', 'fa-trash-alt');
});

document.querySelector('#add-item').addEventListener('click', () => {
  let div = document.querySelector('.task-color-pink'); 
  if (div !== null) {
    div.classList.remove('task-color-pink');
    div.classList.add('task-color-white');
  }
});

document.querySelector('#remove-item').addEventListener('click', () => {
  let div = document.querySelector('.task-color-pink'); 
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