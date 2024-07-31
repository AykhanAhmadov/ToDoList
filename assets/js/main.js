document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const input = document.querySelector(".input");
  const btn = document.querySelector(".btn");
  const toDoes = document.querySelector(".to__do-input");
  const list = document.querySelector(".list ul");
  const del = document.querySelector(".del");
  const btnIcon = document.querySelector(".btn i");
  const sortStr = document.querySelector(".sort__str");
  const sortNum = document.querySelector(".sort__num");

  let id = 0;
  let arr = JSON.parse(localStorage.getItem("todos")) || [];
  let boolean1 = true;
  let editingToDo = null;

  const renderTodos = () => {
    list.innerHTML = "";
    arr.forEach((todo) => {
      const toDo = createTodoElement(todo);
      list.prepend(toDo);
    });
  };

  const createTodoElement = (todo) => {
    const toDo = document.createElement("li");
    const toDoText = document.createElement("span");
    const toDoIcon = document.createElement("span");
    const edit = document.createElement("i");
    const delet = document.createElement("i");

    edit.style.marginRight = "5px";
    edit.classList.add("fa-solid", "fa-pen-to-square");
    delet.classList.add("fa-regular", "fa-circle-xmark");

    toDoIcon.style.display = "flex"

    delet.addEventListener("click", () => {
      toDo.remove();
      arr = arr.filter((item) => item.id !== todo.id);
      localStorage.setItem("todos", JSON.stringify(arr));
      if (list.children.length < 1){
        toDoes.style.display = "flex";
        input.focus()
      }

    });

    edit.addEventListener("click", () => {
      if (editingToDo) {
        editingToDo.style.opacity = "1";
      }
      if (btnIcon.classList.contains("effect")) {
        btnIcon.classList.remove("effect");
      } else {
        btnIcon.classList.add("effect");
      }
      toDoes.style.display = "flex";
      list.style.maxHeight = "160px";
      btnIcon.classList.remove("fa-plus");
      btnIcon.classList.add("fa-check");
      input.value = todo.text;
      input.focus();
      toDo.style.opacity = ".3"; 
      editingToDo = toDo; 
      btn.lastChild.textContent = "Edit";
      id = todo.id;
    });

    toDo.setAttribute("data-id", todo.id);
    toDoText.textContent = todo.text;
    toDoIcon.appendChild(edit);
    toDoIcon.appendChild(delet);
    toDo.appendChild(toDoText);
    toDo.appendChild(toDoIcon);

    return toDo;
  };

  renderTodos();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value && btnIcon.classList.contains("fa-check") && btn.textContent == "Add") {
      const newTodo = {
        id: Date.now().toString(),
        text: input.value,
      };
      arr.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(arr));
      const toDo = createTodoElement(newTodo);
      input.value = "";
      toDoes.style.display = "none";
      list.prepend(toDo);
      btnIcon.classList.remove("fa-check");
      btnIcon.classList.add("fa-plus");

      if (btnIcon.classList.contains("effect")) {
        btnIcon.classList.remove("effect");
      } else {
        btnIcon.classList.add("effect");
      }

      list.style.maxHeight = "190px";
    } else if (input.value && btn.textContent == "Edit") {
      const liElements = document.querySelectorAll(".list ul li");

      liElements.forEach((li) => {
        const dataId = li.getAttribute("data-id");
        if (dataId == id) {
          li.querySelector("span:first-child").textContent = input.value;
          li.style.opacity = "1";

          const todo = arr.find((item) => item.id == id);
          if (todo) {
            todo.text = input.value;
          }
          localStorage.setItem("todos", JSON.stringify(arr));

          input.value = "";
          btn.lastChild.textContent = "Add";
          toDoes.style.display = "none";
          btnIcon.classList.remove("fa-check");
          btnIcon.classList.add("fa-plus");
          editingToDo = null;
        }
      });
    } else if (btnIcon.classList.contains("fa-check")) {
      alert("Please enter value");
      input.focus();
    } else {
      toDoes.style.display = "flex";
      list.style.maxHeight = "160px";
      btnIcon.classList.remove("fa-plus");
      btnIcon.classList.add("fa-check");
      if (btnIcon.classList.contains("effect")) {
        btnIcon.classList.remove("effect");
      } else {
        btnIcon.classList.add("effect");
      }
      input.focus();
    }
  });

  del.addEventListener("click", () => {
    if (list.children.length > 0 && !input.value) {
      toDoes.style.display = "none";
      btnIcon.classList.remove("fa-check");
      btnIcon.classList.add("fa-plus");
      if (btnIcon.classList.contains("effect")) {
        btnIcon.classList.remove("effect");
      } else {
        btnIcon.classList.add("effect");
      }
    } else if (list.children.length > 0 && input.value) {
      input.value = "";
    }
    if (editingToDo) {
      editingToDo.style.opacity = "1";
      btn.lastChild.textContent = "Add"
    }
  });

  sortStr.addEventListener("click", () => {
    arr.sort((a, b) => {
      if (boolean1) {
        sortStr.classList.remove("fa-arrow-down-a-z");
        sortStr.classList.add("fa-arrow-down-z-a");
        return a.text.localeCompare(b.text);
      } else {
        sortStr.classList.remove("fa-arrow-down-z-a");
        sortStr.classList.add("fa-arrow-down-a-z");
        return b.text.localeCompare(a.text);
      }
    });
    boolean1 = !boolean1;
    renderTodos();
  });

  sortNum.addEventListener("click", () => {
    if (boolean1) {
      sortNum.classList.remove("fa-arrow-down-1-9");
      sortNum.classList.add("fa-arrow-down-9-1");
      list.innerHTML = "";
      arr.forEach((todo) => {
        const toDo = createTodoElement(todo);
        list.append(toDo);
      });
    } else {
      sortNum.classList.remove("fa-arrow-down-9-1");
      sortNum.classList.add("fa-arrow-down-1-9");
      list.innerHTML = "";
      arr.forEach((todo) => {
        const toDo = createTodoElement(todo);
        list.prepend(toDo);
      });
    }
    boolean1 = !boolean1;
  });
});
