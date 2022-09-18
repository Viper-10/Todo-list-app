const TODO_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  COMPLETE: "complete",
};
const nextStatusMap = {};
nextStatusMap[TODO_STATUS.TODO] = TODO_STATUS.IN_PROGRESS;
nextStatusMap[TODO_STATUS.IN_PROGRESS] = TODO_STATUS.COMPLETE;
nextStatusMap[TODO_STATUS.COMPLETE] = TODO_STATUS.TODO;

const todoList = [];

// IIFE - invoked once at the end of their definition.
(function initialiseTodos() {
  addTodoToTodoList({
    content: "Buy Grocery",
    status: TODO_STATUS.TODO,
  });

  addTodoToTodoList({
    content: "Send Email",
    status: TODO_STATUS.IN_PROGRESS,
  });

  addTodoToTodoList({
    content: "Finish Assignment",
    status: TODO_STATUS.COMPLETE,
  });

  renderTodoList();
})();

const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task-form");
const cancelTaskBtn = document.querySelector(".cancel-task-submit-btn");
const todoULList = document.querySelector(".todo-items");

(function addEventListeners() {
  addTaskBtn.addEventListener("click", showForm);
  addTaskForm.addEventListener("submit", onAddTaskFormSubmit);
  cancelTaskBtn.addEventListener("click", cancelForm);
  todoULList.addEventListener("click", todoListClickEventDelegator);
})();

function getTaskMarkup(task, index) {
  return `<li class="todo-item" id=${index}>
    <div class="list-item list-item-1">${task.content}</div>
    <div class="list-item list-item-2">
      <span class="todo-status ${task.status}">${task.status}</span>
    </div>
    <div class="list-item list-item-3">
      <i class="fa-solid fa-pencil icon"></i>
    </div>
    <div class="list-item list-item-4">
      <i class="fa-solid fa-trash-can icon"></i>
    </div>
  </li>`;
}

function renderTodoList() {
  const todoULlist = document.querySelector(".todo-items");
  const todoListHeader = document.querySelector(".todo-list-header");
  const motivationTextDiv = document.querySelector(".sub-text");

  if (todoList.length === 0) {
    motivationTextDiv.style.display = "none";
    const noTodosDiv = document.createElement("div");
    noTodosDiv.textContent = "Hurray! No todos for now, great job";

    noTodosDiv.classList.add("noTodoText");

    todoULList.innerHTML = "";

    todoULList.appendChild(noTodosDiv);
    todoListHeader.style.display = "none";
    return;
  }

  motivationTextDiv.style.display = "inline-block";

  todoListHeader.style.display = "flex";
  let allTodosMarkup = ``;

  todoList.forEach((todo, index) => {
    allTodosMarkup += getTaskMarkup(todo, index);
  });

  todoULlist.innerHTML = allTodosMarkup;
}

function deleteTodo(target) {
  const indexOfCurrentTodo = target.parentElement.parentElement.id;
  todoList.splice(indexOfCurrentTodo, 1);

  renderTodoList();
  return;
}
function changeTodoStatus(target) {
  const currentStatus = target.textContent;
  const nextStatus = nextStatusMap[currentStatus];

  const parentLi = target.parentElement.parentElement;

  const index = parentLi.id;

  todoList[index].status = nextStatus;
  target.textContent = nextStatus;
  target.classList.remove(currentStatus);
  target.classList.add(nextStatus);
}
function editTodo(target) {
  const parentLi = target.parentElement.parentElement;
  const todoContentDiv = parentLi.firstElementChild;
  const inputElement = document.createElement("input");

  inputElement.classList.add("todo-content-input");
  inputElement.value = todoContentDiv.textContent;

  parentLi.removeChild(todoContentDiv);
  parentLi.prepend(inputElement);

  inputElement.focus();

  inputElement.addEventListener("focusout", () => {
    const newTodoContent = inputElement.value;

    const newTodoContentDiv = document.createElement("div");
    newTodoContentDiv.classList.add("list-item");
    newTodoContentDiv.classList.add("list-item-1");
    newTodoContentDiv.textContent = newTodoContent;

    parentLi.removeChild(inputElement);
    parentLi.prepend(newTodoContentDiv);
  });
}
function todoListClickEventDelegator(e) {
  if (e.target.classList.contains("fa-trash-can")) {
    deleteTodo(e.target);
  } else if (e.target.classList.contains("todo-status")) {
    changeTodoStatus(e.target);
  } else if (e.target.classList.contains("fa-pencil")) {
    editTodo(e.target);
  }
}
function changeAddTaskFormDisplay(option) {
  addTaskForm.style.display = option;
}
function onAddTaskFormSubmit(e) {
  e.preventDefault();
  const content = document.querySelector(".todo-content").value;
  const status = document.querySelector("#todo-status").value;

  if (!isNaN(content)) {
    alert("Enter a valid todo");
    return;
  }

  if (content.length > 100) {
    alert("This is a todo, not an essay! Keep is short(<= 100 characters)");
    return;
  }

  addTodoToTodoList({ content, status });
  changeAddTaskFormDisplay("none");

  renderTodoList();
}
function showForm() {
  changeAddTaskFormDisplay("flex");
}
function cancelForm() {
  changeAddTaskFormDisplay("none");
}
function addTodoToTodoList({ content, status }) {
  let todoAlreadyExists = false;

  todoList.forEach((todo) => {
    if (todo.content.trim() == content.trim()) {
      alert("The todo already exists!");
      todoAlreadyExists = true;
      return;
    }
  });

  if (todoAlreadyExists) return;

  todoList.push({ id: todoList.length + 1, content, status });
}
