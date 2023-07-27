let data = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
const messageBox = {
  emptyList: "There is no any task",
};

window.onload = () => {
  const listFrame = document.getElementsByClassName("list-frame")[0];
  const container = document.getElementsByClassName("container")[0];
  if (data.length > 0) {
    listFrame.classList.remove("d-none");
    const messageBox = document.getElementsByClassName("message-box")[0];
    if (messageBox) {
      messageBox.remove();
    }
    createList(data);
  } else {
    listFrame.classList.add("d-none");
    const span = document.createElement("span");
    span.classList.add("message-box");
    span.innerHTML = `<p>${messageBox.emptyList}</p>`;
    container.appendChild(span);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const input = document.getElementsByName("title")[0];
  if (input.value) {
    const listFrame = document.getElementsByClassName("list-frame")[0];
    const d = new Date();
    const taskObj = { title: input.value, date: String(d), isDone: false };
    data.push(taskObj);

    listFrame.classList.remove("d-none");
    localStorage.setItem("tasks", JSON.stringify(data));
    createList(data);
    input.value = "";
  } else {
    input.style.border = "1px solid red";
  }

  const messageBox = document.getElementsByClassName("message-box")[0];
  if (messageBox) {
    messageBox.remove();
  } else {
    return;
  }
};

const createList = (arr) => {
  const listEle = document.getElementsByClassName("todo-list")[0];
  if (arr.length > 0) {
    let list = "";
    arr.forEach((item, index) => {
      return (list += `
        <li key="${index}" class="${item.isDone ? "active" : ""}">
          <div>
            <h3>${item.title}</h3>
            <p>${item.date}</p>
          </div>
          <div>
            <button
              onclick="handleDone(event)"
              type="button"
              class="btn primary"
            >
              Done
            </button>
            <button
              onclick="handleEdit(event)"
              type="button"
              class="btn secoundary"
            >
              Edit
            </button>
            <button
              onclick="handleDelete(event)"
              type="button"
              class="btn danger"
            >
              Delete
            </button>
          </div>
        </li>
      `);
    });
    listEle.innerHTML = list;
  } else {
    const listFrame = document.getElementsByClassName("list-frame")[0];
    listEle.innerHTML = "";
    listFrame.classList.add("d-none");
  }
};

const handleDelete = (e) => {
  const key = e.currentTarget.closest("li").getAttribute("key");
  const newArr = data.filter((item, index) => {
    return index !== Number(key);
  });
  data = newArr;
  localStorage.setItem("tasks", JSON.stringify(data));
  createList(data);
};

const handleDone = (e) => {
  const key = e.currentTarget.closest("li").getAttribute("key");
  data.map((item, index) => {
    if (index === Number(key)) {
      item.isDone = !item.isDone;
    } else {
      return;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(data));
  createList(data);
};

const handleEdit = (e) => {
  const key = e.currentTarget.closest("li").getAttribute("key");
  const modal = document.getElementsByClassName("modal")[0];
  const updateInput = document.getElementsByName("update-task")[0];
  modal.classList.remove("d-none");
  updateInput.value = data[Number(key)].title;
  updateInput.setAttribute("key", Number(key));
};

const handleUpdate = (e) => {
  e.preventDefault();
  const input = document.getElementsByName("update-task")[0];
  const key = input.getAttribute("key");
  const modal = document.getElementsByClassName("modal")[0];
  data.map((item, index) => {
    if (index === Number(key)) {
      const d = new Date();
      item.title = input.value;
      item.date = d;
    } else {
      return;
    }
  });

  modal.classList.add("d-none");
  localStorage.setItem("tasks", JSON.stringify(data));
  createList(data);
};

const handleSort = (e) => {
  const option = e.currentTarget.value;
  getSort(data, option);
  createList(data);
};

const getSort = (arr, option) => {
  if (arr.length > 0) {
    if (option === "a-z") {
      arr.sort((a, b) => {
        const first = a.title.toLowerCase();
        const secound = b.title.toLowerCase();
        if (first > secound) {
          return 1;
        } else if (first < secound) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (option === "z-a") {
      arr.sort((a, b) => {
        const first = a.title.toLowerCase();
        const secound = b.title.toLowerCase();
        if (first > secound) {
          return -1;
        } else if (first < secound) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (option === "newest") {
      arr.sort((a, b) => {
        const first = Date.parse(a.date);
        const secound = Date.parse(b.date);
        if (first > secound) {
          return 1;
        } else if (first < secound) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (option === "latest") {
      arr.sort((a, b) => {
        const first = Date.parse(a.date);
        const secound = Date.parse(b.date);
        if (first > secound) {
          return -1;
        } else if (first < secound) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (option === "done") {
      arr.sort((a, b) => {
        const first = a.isDone;
        const secound = b.isDone;
        if (first > secound) {
          return -1;
        } else if (first < secound) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      arr.sort((a, b) => {
        const first = a.isDone;
        const secound = b.isDone;
        if (first > secound) {
          return 1;
        } else if (first < secound) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  } else {
    return;
  }
};
