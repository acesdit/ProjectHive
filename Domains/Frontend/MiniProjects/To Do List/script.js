let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

// DOM elements
const taskModal = document.getElementById("taskModal");
const addTaskBtn = document.getElementById("addTaskBtn");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const tasksContainer = document.getElementById("tasksContainer");
const overview = document.getElementById("task-overview");

addTaskBtn.onclick = () => openModal();
cancelTaskBtn.onclick = () => closeModal();
saveTaskBtn.onclick = () => saveTask();

function openModal(task = null, index = -1) {
  document.getElementById("modalTitle").textContent = index >= 0 ? "Edit Task" : "Add Task";
  taskModal.style.display = "flex";
  editIndex = index;

  if (task) {
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDesc").value = task.desc;
    document.getElementById("taskDateTime").value = task.dateTime;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskCategory").value = task.category;
  } else {
    clearForm();
  }
}

function closeModal() {
  taskModal.style.display = "none";
  clearForm();
}

function clearForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("taskDateTime").value = "";
  document.getElementById("taskPriority").value = "Medium";
  document.getElementById("taskCategory").value = "Work";
}

function saveTask() {
  const task = {
    title: document.getElementById("taskTitle").value,
    desc: document.getElementById("taskDesc").value,
    dateTime: document.getElementById("taskDateTime").value,
    priority: document.getElementById("taskPriority").value,
    category: document.getElementById("taskCategory").value,
    done: false,
  };

  if (editIndex >= 0) {
    tasks[editIndex] = task;
  } else {
    tasks.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  closeModal();
}

function renderTasks() {
  tasksContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.done ? "done" : ""}`;
    li.innerHTML = `
      <div class="details">
        <strong>${task.title}</strong>
        <p>${task.desc || ""}</p>
        <small>${task.dateTime ? new Date(task.dateTime).toLocaleString() : ""}</small>
        <br><small>Priority: ${task.priority} | Category: ${task.category}</small>
      </div>
      <div class="actions">
        <button onclick="toggleDone(${index})">✔</button>
        <button onclick="openModal(tasks[${index}], ${index})">📝</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    tasksContainer.appendChild(li);
  });

  const pendingCount = tasks.filter(t => !t.done).length;
  overview.textContent = `You have ${pendingCount} pending tasks today.`;
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Close modal on outside click
window.onclick = e => {
  if (e.target == taskModal) closeModal();
};

renderTasks();
