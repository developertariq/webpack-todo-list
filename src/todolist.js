let taskList = [];

const add =  (description, index, completed = false) => {
  const task = {};
  task.description = description;
  task.completed = completed;
  task.index = index;

  taskList.push(task);
}

const remove = (index) => {
  let newList = taskList.filter ((a) => { if (a.index !== index) {return a;}});
  taskList = newList;
}
