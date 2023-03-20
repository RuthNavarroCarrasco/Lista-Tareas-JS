let taskList = [];

const loadTasks = () => {
  fetch("/tasks/get")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    taskList = data;
  })
  .then(addHTML)
  .catch(function(err) {
    console.log(err);
  })
}


const add = async () => {
  var task = document.getElementById("task-name").value;
  var indexTask = taskList.length+1;
  taskObject = JSON.stringify({id: indexTask, title: task, done: false});
  taskList.push(JSON.parse(taskObject));
  console.log(taskList);
  addHTMLElement(taskList[indexTask-1]);
}



const remove = () => {}

const toggleDone = () => {}

const addButton = document.querySelector("#fab-add");

addButton.addEventListener("touchend", add);

loadTasks();



function addHTML() {
  taskList.forEach(task => addHTMLElement(task));
}

function addHTMLElement(task) {
  const taskListDiv = document.getElementById("pendingTasks");
  const taskContainer = document.createElement("div"); // Crear un elemento div para cada tarea
  taskContainer.classList.add("task-container"); 
  const taskTitle = document.createElement("p");
  taskTitle.textContent = task.title;
  taskContainer.appendChild(taskTitle); // Agregar el título de la tarea al div
  taskListDiv.appendChild(taskContainer); // Agregar el div al contenedor principal
}