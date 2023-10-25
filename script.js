const addbutton = document.getElementById('add');
const input = document.getElementById('input-box');
const ol = document.getElementById('list-container');

let todoItems = getTodoFromLocalStorage();

addbutton.addEventListener('click', addTodo);


// Function to add task to local storage
function addTodo() {
  const textInput = input.value.trim();
  if (textInput === '') return;

  const todo = {
    text: textInput,
    id: Date.now()
  };

  todoItems.push(todo);
  saveTodoToLocalStorage(todoItems);
  addTodoToList(todo);
  input.value = '';
}

// Function to get tasks from local storage
function getTodoFromLocalStorage() {
  const todo = JSON.parse(localStorage.getItem('todo'));
  return todo || [];
}

// Function to add todo to HTML using JS
function addTodoToList(todo) {
  const li = document.createElement('li');
  li.textContent = todo.text;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () {
    deleteTodoItem(todo.id);
  };


  ol.appendChild(li);
   li.appendChild(deleteButton);
}

function saveTodoToLocalStorage(todo) {
  localStorage.setItem('todos', JSON.stringify(todo));
}

function deleteTodoItem(id) {
  todoItems = todoItems.filter((todo) => todo.id !== id);
  saveTodoToLocalStorage(todoItems);
  renderTodo();
}

function deleteTodo() {
  if (todoItems.length > 0) {
    todoItems.pop();
    saveTodoToLocalStorage(todoItems);
    renderTodo();
  }
}

function renderTodo() {
  ol.innerHTML = '';
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      savedTodos.forEach(addTodoToList);
  
}

                  
   if (localStorage.getItem("todo") == null) {
    axios.get("https://jsonplaceholder.typicode.com/todo")
      .then(function (response) {
        const todo = response.data;

        for (let i = 0; i < 5; i++) {
          const todo = todos[i];
          addTodoToList({
            text: todo.title,
            id: todo.id
          });
        }

        window.localStorage.setItem("todos", JSON.stringify(todos));
      }) 
    } else {
    renderTodo();
  }

