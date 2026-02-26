const getTasksBtn = document.getElementById('getTasksBtn');
const tasksResult = document.getElementById('tasksResult');

getTasksBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('/tasks');
    const data = await res.json();
    tasksResult.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    tasksResult.textContent = 'Error: ' + err.message;
  }
});