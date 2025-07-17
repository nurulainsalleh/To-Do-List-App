// Loads tasks from localStorage when the page opens, so the tasks don’t disappear when refreshed.
window.onload = function () {
  const saved = localStorage.getItem("todo-tasks");
  tasks = saved ? JSON.parse(saved) : [];
  renderTasks();
};

// Export tasks to Excel using a library (XLSX) instead of JSON files.
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

// Saves tasks to localStorage so changes are remembered.
function saveTasks() {
  localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}

// Adds a new task to the list.
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

// Renders the tasks on the screen, shows their status, and allows editing or deleting.
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

  // Shows task counts (how many are done or not done).
  document.getElementById("taskCounter").textContent =
    `Completed: ${completed} | Uncompleted: ${pending}`;
  document.getElementById("pendingCount").textContent =
    `You have ${pending} pending task${pending !== 1 ? "s" : ""}`;
}

// Filters tasks (all or completed only).
function setFilter(newFilter) {
  filter = newFilter;
  renderTasks();
}

// Clears all completed tasks with one button.
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

let filter = "all"; // all | completed
