const getTasksBtn = document.getElementById('getTasksBtn');
const tasksResult = document.getElementById('tasksResult');
const newTaskTitle = document.getElementById('newTaskTitle');
const addTaskBtn = document.getElementById('addTaskBtn');

// GET /tasks
async function fetchTasks() {
  const res = await fetch('/tasks');
  const tasks = await res.json();

  tasksResult.innerHTML = '';

  tasks.forEach(task => {
    // label
    const label = document.createElement('label');
    label.style.display = 'block';

    // chaeckbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed === 1;

    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '8px';

    label.appendChild(checkbox);
    label.append(' ' + task.title);
    label.appendChild(deleteBtn);

    tasksResult.appendChild(label);

    checkbox.addEventListener('change', async () => {
      // PUT /tasks/:id
      await fetch(`/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: checkbox.checked
        })
      });
      fetchTasks();
    });

    deleteBtn.addEventListener('click', async () => {
      await fetch(`/tasks/${task.id}`, {
        method: 'DELETE'
      });
      fetchTasks();
    });
  });
}

// POST /tasks
async function addTask() {
  const title = newTaskTitle.value.trim();
  if (!title) return;

  await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });

  newTaskTitle.value = '';

  fetchTasks();
}



// Add Event
getTasksBtn.addEventListener('click', fetchTasks);
addTaskBtn.addEventListener('click', addTask);