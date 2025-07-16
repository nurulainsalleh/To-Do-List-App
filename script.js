

// Load tasks from localStorage on page load
window.onload = function () {
  const saved = localStorage.getItem("todo-tasks");
  tasks = saved ? JSON.parse(saved) : [];
  renderTasks();
};
function exportTasks() {
  const worksheetData = [["Task", "Completed"]];

  tasks.forEach(task => {
    worksheetData.push([task.text, task.completed ? "Yes" : "No"]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

  XLSX.writeFile(workbook, "todo-tasks.xlsx");
}



function saveTasks() {
  localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const span = document.createElement("span");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };

    actions.appendChild(delBtn);
    actions.appendChild(editBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);

    if (task.completed) completed++;
  });

  const counter = document.getElementById("taskCounter");
  counter.textContent = `Completed: ${completed} | Uncompleted: ${tasks.length - completed}`;
}
let filter = "all"; // all | completed

function setFilter(newFilter) {
  filter = newFilter;
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let completed = 0;
  let pending = 0;

  tasks.forEach((task, index) => {
    const show =
      filter === "all" ||
      (filter === "completed" && task.completed);

    if (!show) return;

    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const span = document.createElement("span");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };

    actions.appendChild(delBtn);
    actions.appendChild(editBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);

    if (task.completed) completed++;
    else pending++;
  });

  document.getElementById("taskCounter").textContent =
    `Completed: ${completed} | Uncompleted: ${pending}`;
  document.getElementById("pendingCount").textContent =
    `You have ${pending} pending task${pending !== 1 ? "s" : ""}`;
}
