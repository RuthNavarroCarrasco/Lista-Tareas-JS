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
  var indexTask = searchIndex();
  console.log({id: indexTask, title: task, done: false});
  taskObject = JSON.stringify({id: indexTask, title: task, done: false});
  taskList.push(JSON.parse(taskObject));
  console.log(taskList);
  
  addHTMLElement(taskList[taskList.length-1]);
  window.navigator.vibrate(200);
  document.getElementById("task-name").value = "";
  
}




const remove = (index) => {

  let startX = 0;
let endX = 0;
let startTime = 0;

const TIME_THRESHOLD = 200;
const SPACE_THRESHOLD = 100;

const item = document.getElementById(index);


item.addEventListener("touchstart", e => {
  e.preventDefault();
  e.target.classList.remove("swiped");
  startX = e.targetTouches[0].screenX;
  startTime = e.timeStamp;
  setTimeout(() => {
    changeColor(e.target);
  }, 2000);
}, { passive: false }
  
);

item.addEventListener("touchmove", e => {

  e.preventDefault();
  endX = e.changedTouches[0].screenX;
}, { passive: false });

item.addEventListener("touchend", e => {
  e.preventDefault();

  endTime = e.timeStamp;
  endX = e.changedTouches[0].screenX;
  if (endTime - startTime < TIME_THRESHOLD && endX - startX > SPACE_THRESHOLD) {
    handleSwipe(e.target);
    console.log(taskList);
  }
  if (endTime - startTime > 2000) {
    toggleDone(e.target);
  }
  
});


}


function handleSwipe(element) {
  
  for (let i = 0; i < taskList.length; i++) {
    if (element.id == taskList[i].id) { 
      taskList.splice(i, 1);
      element.remove();
  }
   
}
}

const toggleDone = (element) => {
  console.log("Toggle");

  for (let i = 0; i < taskList.length; i++) {
    if (element.id == taskList[i].id) { 
      taskList[i].done = !taskList[i].done;
      if (taskList[i].done) {
        element.style.backgroundColor = "#ef9a9a";
      }
      else {element.style.backgroundColor = "#ffffff";}

  }
   
}
}

function changeColor(element) {
  for (let i = 0; i < taskList.length; i++) {
    if (element.id == taskList[i].id) { 
      element.style.backgroundColor = "#f44336";}
  }
}

const addButton = document.querySelector("#fab-add");

addButton.addEventListener("touchend", add);


loadTasks();



function addHTML() {
  taskList.forEach(task => addHTMLElement(task));
}

function addHTMLElement(task) {
  console.log("Probando");
  const taskListDiv = document.getElementById("pendingTasks");
  const taskContainer = document.createElement("li"); // Crear un elemento div para cada tarea
  taskContainer.classList.add("task-container"); 
  taskContainer.setAttribute("id", task.id);
  
  taskContainer.textContent = task.title;
  if(task.done){
    taskContainer.style.backgroundColor = "#ef9a9a";
  }
  //taskContainer.appendChild(taskTitle); 
  taskListDiv.appendChild(taskContainer); 

  remove(task.id);
}


function searchIndex() {
 
  for (let aux = 1; aux < taskList.length+1; aux++) {
     var found = false;
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === aux) {
          found = true;
          break;
        }
      }
      if (found === false){
      return aux;
      }
  }
  return taskList.length+1;
}