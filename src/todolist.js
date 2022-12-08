import { toInteger } from 'lodash';

let taskList = [];

const add =  (description) => {
  const task = {};
  task.description = description;
  task.completed = false;
  console.log(description);
  if (taskList !== null) {
    task.index = taskList.length + 1;
  } else {
    task.index = 1;
  }
  

  taskList.push(task);
  localStorage.setItem('todolist', JSON.stringify(taskList));
}

const remove = (index) => {
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

const edit = (description, index) => {
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
 
export default taskList;