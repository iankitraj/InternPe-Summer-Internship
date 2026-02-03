let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const themeBtn = document.querySelector(".theme");

/* ---------- THEME LOAD ---------- */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerText = "☀️";
}

/* ---------- THEME TOGGLE ---------- */
function toggleTheme() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.innerText = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.innerText = "🌙";
    }
}

/* ---------- TASK LOGIC ---------- */
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value.trim()) return;

    tasks.push({ text: input.value, done: false });
    input.value = "";
    save();
}

function toggleTask(i) {
    tasks[i].done = !tasks[i].done;
    save();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    save();
}

function setFilter(el, f) {
    document.querySelectorAll(".filters span")
        .forEach(s => s.classList.remove("active"));
    el.classList.add("active");
    filter = f;
    render();
}

/* ---------- RENDER ---------- */
function render() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    let filtered = tasks.filter(t =>
        filter === "all" ? true :
            filter === "completed" ? t.done : !t.done
    );

    filtered.forEach((t, i) => {
        list.innerHTML += `
      <li class="${t.done ? "completed" : ""}">
        <input value="${t.text}"
          onchange="tasks[${i}].text=this.value;save()">
        <div>
          <button onclick="toggleTask(${i})">✔</button>
          <button onclick="deleteTask(${i})">❌</button>
        </div>
      </li>
    `;
    });

    updateProgress();
}

/* ---------- PROGRESS ---------- */
function updateProgress() {
    const done = tasks.filter(t => t.done).length;
    const percent = tasks.length ? (done / tasks.length) * 100 : 0;
    document.getElementById("bar").style.width = percent + "%";
    document.getElementById("progressText").innerText =
        `${done}/${tasks.length} Completed`;
}

render();
