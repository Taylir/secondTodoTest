const todoForm = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const todoListUl = document.querySelector("#todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo()
})

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    }
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = '';
  }
}

function updateTodoList() {
  todoListUl.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex)
    todoListUl.append(todoItem);
  })
}

function createTodoItem(todo, todoIndex) {
  const todoLI = document.createElement("li");
  todoLI.className = 'todo';
  const todoText = todo.text;
  todoLI.innerHTML = `
          <input type="checkbox" id="todo-${todoIndex}">
          <label for="todo-${todoIndex}" class="custom-checkbox">
            <svg
              fill="transparent"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            ><path d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z"/></svg>
          </label>
          <label for="todo-${todoIndex}" class="todo-text">
            ${todoText}
          </label>
          <button class="delete-button">
            <svg
              fill="var(--secondary-color)"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            ><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button>
`
  const deleteButton = todoLI.querySelector('.delete-button');
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  })
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos()
  })
  checkbox.checked = todo.completed;
  return todoLI;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}

function getTodos() {
  const todos = localStorage.getItem('todos') || "[]";
  return JSON.parse(todos);
}
