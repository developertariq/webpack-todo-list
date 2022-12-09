import {
  itemList,
} from './todolist.js';

const listHead = () => {
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
};

const addItem = () => {
  const div = document.createElement('div');
  div.id = 'add-item';
  div.classList.add('clear');
  const form = document.createElement('form');
  form.id = 'new-task-form';
  form.action = '#';
  const text = document.createElement('input');
  text.id = 'newtask';
  text.name = 'newtask';
  text.classList.add('input-item');
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
  submit.title = 'click this or press enter to submit';
  const btndiv = document.createElement('div');
  btndiv.id = 'add-btn-wrap';
  btndiv.classList.add('refresh');
  btndiv.appendChild(submit);
  form.appendChild(btndiv);
  div.appendChild(form);
  return div;
};

const removeSelected = () => {
  const div = document.createElement('div');
  div.id = 'remove-item';
  const button = document.createElement('button');
  button.classList.add('remove-selected');
  button.type = 'button';
  button.innerText = 'Clear all completed';
  div.appendChild(button);
  return div;
};

const lists = () => {
  const lists = document.createElement('div');
  lists.classList.add('list');
  lists.appendChild(addItem());
  lists.appendChild(itemList());
  lists.appendChild(removeSelected());
  return lists;
};

const mainList = () => {
  const mainList = document.createElement('div');
  mainList.classList.add('main-list');
  mainList.appendChild(listHead());
  mainList.appendChild(lists());
  return mainList;
};

export default mainList;