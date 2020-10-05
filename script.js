const btn = document.querySelector(".adder");
const todos = document.querySelector(".todos");

function remove() {
  this.parentElement.remove();
}

function makeEditable() {
  const task = this.parentElement.querySelector(".task");
  task.setAttribute("contenteditable", "true");
  task.focus();
  document.execCommand("selectAll", false, null);
  document.getSelection().collapseToEnd();
}

const createButton = () => {
  const todo = document.createElement("div");
  todo.classList.add("todo");
  todos.append(todo);
  todo.addEventListener("focusout", function () {
    if (todo.querySelector("p").innerText == "") {
      todo.remove();
    }
  });

  const task = document.createElement("p");
  task.innerText = "";
  task.classList.add("task");
  task.addEventListener("focusout", function () {
    this.setAttribute("contenteditable", "false");
  });
  task.addEventListener("keypress", function (e) {
    if (event.keyCode == 13) {
      e.preventDefault();
      createButton();
    }
    if (this.innerText.length > 30) {
      e.preventDefault();
    }
  });
  todo.append(task);
  task.setAttribute("contenteditable", "true");
  task.focus();
  document.execCommand("selectAll", false, null);
  document.getSelection().collapseToEnd();

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("edit");
  const svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEdit.innerHTML = '<use xlink:href="./symbol-defs.svg#icon-edit"></use>';
  btnEdit.append(svgEdit);
  btnEdit.addEventListener("click", makeEditable);
  todo.append(btnEdit);

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("delete");
  const svgDelete = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgDelete.innerHTML = '<use xlink:href="./symbol-defs.svg#icon-trash"></use>';
  btnDelete.append(svgDelete);
  btnDelete.addEventListener("click", remove);
  todo.append(btnDelete);
};

btn.addEventListener("click", createButton);
