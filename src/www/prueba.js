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

function removeItem(item) {
  const index = item.getAttribute("data-index");
  taskList[index].done = true;
  console.log(taskList);
  item.remove();
}

function handleSwipe(e) {
  e.preventDefault();
  const item = e.currentTarget;
  const startX = item.dataset.startX;
  const endX = e.changedTouches[0].screenX;
  const startTime = item.dataset.startTime;
  const endTime = e.timeStamp;
  const index = item.getAttribute("data-index");

  if (endTime - startTime < 200 && endX - startX > 100) {
    removeItem(item);
  }

  item.removeAttribute("data-start-x");
  item.removeAttribute("data-start-time");
}

function addHTMLElement(task) {
  const taskListDiv = document.getElementById("pendingTasks");
  const taskContainer = document.createElement("li"); // Crear un elemento div para cada tarea
  taskContainer.classList.add("task-container"); 
  taskContainer.setAttribute("data-index", task.id);
  taskContainer.setAttribute("draggable", true);
  
  taskContainer.textContent = task.title;
  taskListDiv.appendChild(taskContainer); // Agregar el div al contenedor principal
}

function addEventListeners() {
  const items = document.querySelectorAll(".task-container");
  items.forEach(item => {
    item.addEventListener("touchstart", e => {
      e.preventDefault();
      item.dataset.startX = e.touches[0].screenX;
      item.dataset.startTime = e.timeStamp;
    }, { passive: false });
  
    item.addEventListener("touchmove", e => {
      e.preventDefault();
    }, { passive: false });
  
    item.addEventListener("touchend", handleSwipe);
  });
}

const addButton = document.querySelector("#fab-add");
addButton.addEventListener("touchend", add);

loadTasks();
addEventListeners();
