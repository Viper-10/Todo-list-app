const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task-form");

const TODO_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  COMPLETE: "complete",
};

console.log(todos[0]);
console.log(todos[1]);

addEventListeners();

function showForm() {
  addTaskForm.style.display = "flex";
}
function addTodo(e) {
  e.preventDefault();

  const todo = document.querySelector(".todo-content");
  addTaskForm.style.display = "none";
}

function addEventListeners() {
  addTaskBtn.addEventListener("click", showForm);
  addTaskForm.addEventListener("submit", addTodo);
}
