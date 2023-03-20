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
  remove();

}




function remove() {
  const items = document.querySelectorAll(".task-container");
  let startX = 0;
  let endX = 0;
  let startTime = 0;

  const TIME_THRESHOLD = 200;
  const SPACE_THRESHOLD = 100;
  items.forEach(item => {
    
  item.addEventListener("touchstart", e => {
      e.preventDefault();
      e.target.classList.remove("swiped");
      startX = e.targetTouches[0].screenX;
      startTime = e.timeStamp;
    }, { passive: false });
  
    item.addEventListener("touchmove", e => {
      e.preventDefault();
      endX = e.changedTouches[0].screenX;
    }, { passive: false });
  
    item.addEventListener("touchend", e => {
      e.preventDefault();
      endTime = e.timeStamp;
      endX = e.changedTouches[0].screenX;
      if (endTime - startTime < TIME_THRESHOLD && endX - startX > SPACE_THRESHOLD) {
        const index = e.target.getAttribute("data-index");
        console.log(e.target);
        handleSwipe(index);
        e.target.remove();
      }
    });
  });
}


const toggleDone = () => {}

const addButton = document.querySelector("#fab-add");

addButton.addEventListener("touchend", add);


loadTasks();



function addHTML() {
  taskList.forEach(task => addHTMLElement(task));
  remove();

}

function addHTMLElement(task) {
  const taskListDiv = document.getElementById("pendingTasks");
  const taskContainer = document.createElement("li"); // Crear un elemento div para cada tarea
  taskContainer.classList.add("task-container"); 
  taskContainer.setAttribute("data-index", task.id);
  
  taskContainer.textContent = task.title;
  //taskContainer.appendChild(taskTitle); // Agregar el título de la tarea al div
  taskListDiv.appendChild(taskContainer); // Agregar el div al contenedor principal
}

function handleSwipe(index) {
  taskList.splice(index-1, 1);
  console.log(taskList);
}