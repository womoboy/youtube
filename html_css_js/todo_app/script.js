let data = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
const message = {
  emptyList: "There is no any task!",
};

window.onload = () => {
  if (data.length > 0) {
    createList(data);
  } else {
    const listEle = document.getElementsByClassName("list")[0];
    const sortFrameEle = document.getElementsByClassName("sort-frame")[0];
    sortFrameEle.classList.add("d-none");
    listEle.innerHTML = message.emptyList;
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const input = document.getElementsByName("title")[0];

  if (input.value) {
    const d = new Date();
    const title = input.value;
    const taskObj = { title: title, date: String(d), isDone: false };
    data.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(data));
  } else {
    input.style.border = "2px solid red";
  }
  input.value = "";
  createList(data);
};

const createList = (arr) => {
  const listEle = document.getElementsByClassName("list")[0];
  const sortFrameEle = document.getElementsByClassName("sort-frame")[0];
  if (arr.length > 0) {
    sortFrameEle.classList.remove("d-none");
    let list = "";
    arr.forEach((item, index) => {
      return (list += `
        <li key="${index}" class="round ${item.isDone ? "active" : ""}">
          <div>
            <h3>${item.title}</h3>
            <p>${item.date}</p>
          </div>
          <div class="btn-frame">
            <button onclick="handleDone(event)" class="btn">
              <i class="fa-solid fa-check"></i>
            </button>
            <button onclick="handleEdit(event)" class="btn">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button onclick="handleDelete(event)" class="btn">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>
      `);
    });
    listEle.innerHTML = list;
  } else {
    sortFrameEle.classList.add("d-none");
    listEle.innerHTML = "";
  }
};

const handleDone = (e) => {
  const key = Number(e.currentTarget.closest("li").getAttribute("key"));
  data.map((item, index) => {
    if (index === key) {
      return (item.isDone = !item.isDone);
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
  updateInput.value = data[key].title;
  updateInput.setAttribute("key", key);
  modal.classList.remove("d-none");
  localStorage.setItem("tasks", JSON.stringify(data));
};

const handleDelete = (e) => {
  const key = Number(e.currentTarget.closest("li").getAttribute("key"));
  const newArr = data.filter((item, index) => {
    return index !== key;
  });
  data = newArr;
  localStorage.setItem("tasks", JSON.stringify(data));
  createList(data);
};

const handleCancel = (e) => {
  e.preventDefault();
  const modal = document.getElementsByClassName("modal")[0];
  modal.classList.add("d-none");
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
  const value = String(e.currentTarget.value);
  getSort(data, value);
  createList(data);
};

const getSort = (arr, option) => {
  if (arr.length) {
    if (option === "a-z") {
      arr.sort((a, b) => {
        const first = a.title;
        const secound = b.title;
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
        const first = a.title;
        const secound = b.title;
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
          return -1;
        } else if (first < secound) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (option === "latest") {
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
