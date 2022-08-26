const inputTodo = document.getElementById("input-todo");
const btnRegister = document.getElementById("btn-register");
const TbodyTodoList = document.getElementById("todo-list");

const todos = [];

window.onload = () => {
  let todoList = localStorage.getItem("todoList");

  todoList = JSON.parse(todoList);

  if (todoList.length > 0) {
    todos.push(...todoList);
    render(todoList);
  }
};

const render = (todoList) => {
  TbodyTodoList.innerHTML = "";

  if (todoList) {
    todoList.map((item) => {
      createElements(item);
    });
    return;
  }

  todos.map((item) => {
    createElements(item);
  });
};

const registerTodo = () => {
  const inputValue = inputTodo.value;

  if (!!inputValue) {
    const id = Math.random();
    const newTodo = {
      id: id,
      todo: inputValue,
      isOpen: true,
      date: new Date().toLocaleDateString("pt-BR"),
    };

    createElements(newTodo);

    todos.push(newTodo);
  }
};

const completTask = (btn) => {
  const [_, id] = btn.id.split(" ");
  btn.classList.add("text-success");
  todos.forEach((item) => {
    if (item.id.toString() === id) {
      item.isOpen = !item.isOpen;
    }
  });

  render();
};

const removeTodo = (currentId) => {
  const [_, id] = currentId.split(" ");
  const filteredTodo = todos.filter((todo) => todo.id.toString() !== id);

  todos.splice(0, todos.length);
  todos.push(...filteredTodo);
  render();
};

const createElements = (newTodo) => {
  const tr = document.createElement("tr");
  const tdTodo = document.createElement("td");
  const tdDate = document.createElement("td");
  const tdOptions = document.createElement("td");
  const btnConclude = document.createElement("button");
  const btnEdit = document.createElement("button");
  const btnRemove = document.createElement("button");

  tdOptions.className = "d-flex gap-2";
  btnConclude.className = "bi bi-check-lg fs-4";
  !newTodo.isOpen ? btnConclude.classList.add("text-success") : "";
  btnEdit.className = "bi bi-pen fs-4 text-primary";

  btnRemove.className = "bi bi-trash fs-4 text-danger";

  btnRemove.id = `remove ${newTodo.id}`;
  btnEdit.id = `edit ${newTodo.id}`;
  btnConclude.id = `conclude ${newTodo.id}`;

  btnRemove.addEventListener("click", (event) => {
    removeTodo(event.target.id);
  });

  btnConclude.addEventListener("click", () => {
    completTask(btnConclude);
  });

  tdTodo.innerText = newTodo.todo;
  tdDate.innerText = newTodo.date;
  tdOptions.appendChild(btnConclude);
  tdOptions.appendChild(btnEdit);
  tdOptions.appendChild(btnRemove);

  tr.appendChild(tdTodo);
  tr.appendChild(tdDate);
  tr.appendChild(tdOptions);

  TbodyTodoList.appendChild(tr);
};

btnRegister.addEventListener("click", registerTodo);

window.addEventListener("keypress", (event) => {
  if (event.key == "Enter" && !!inputTodo.value) {
    registerTodo();
  }
});

window.onunload = () => {
  localStorage.setItem("todoList", "");
  localStorage.setItem("todoList", JSON.stringify(todos));
};
