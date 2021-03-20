//Selectors
const todoInput = document.querySelector(".todo-input"),
  todoButtton = document.querySelector(".todo-button"),
  todoList = document.querySelector(".todo-list"),
  filterOption = document.querySelector(".filter-todo");

//Event Listeners
//DOMContentLoaded이거뭔데? 나처음봄
document.addEventListener("DOMContentLoaded", getTodos);
todoButtton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();
  //   console.log("test");

  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  // 이거 appndeChid 정확하게 이해하기
  todoDiv.appendChild(newTodo);

  //ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);

  //CHECK MARK BUTTON
  const completeButton = document.createElement("button");
  // innerText안되고 innerHTML 쓰면 태그 넣을 수 있음 버튼안에 아이콘도 같이
  completeButton.innerHTML = "<i class='fas fa-check'></i>";
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  //DELETE MARK BUTTON
  const deleteButton = document.createElement("button");
  // innerText안되고 innerHTML 쓰면 태그 넣을 수 있음 버튼안에 아이콘도 같이
  deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  //APPEND TO LIST
  todoList.appendChild(todoDiv);

  //Clear TODO INPUT VALUE 타이핑후 엔터치면 리스트안으로 들어가면서 인풋글자는 클리어하게만들도록
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === "delete-btn") {
    //   나이거 처음봐 parentElement
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  //childNodes는 뭐야?;;;
  const todos = todoList.childNodes;
  //   console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        // contains d이거모야?
        // 온리 체크 completed
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //CHECK --- HEY Do I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //CHECK --- HEY Do I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    // 이거 appndeChid 정확하게 이해하기
    todoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const completeButton = document.createElement("button");
    // innerText안되고 innerHTML 쓰면 태그 넣을 수 있음 버튼안에 아이콘도 같이
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //DELETE MARK BUTTON
    const deleteButton = document.createElement("button");
    // innerText안되고 innerHTML 쓰면 태그 넣을 수 있음 버튼안에 아이콘도 같이
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //CHECK --- HEY Do I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //   console.log(todo.children[0].innerText);
  const todoIndex = todo.children[0].innerText;
  //splice정확하게 기억나니? 아니용..ㅎ 다시 공부욤
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
