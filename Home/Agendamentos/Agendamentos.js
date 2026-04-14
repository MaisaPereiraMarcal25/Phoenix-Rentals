const scheduleForm = document.getElementById('scheduleForm');
const scheduleList = document.getElementById('scheduleList');
const STORAGE_KEY = 'notebookScheduleRequests';

function loadScheduleRequests() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveScheduleRequests(requests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

function renderScheduleRequests() {
  const requests = loadScheduleRequests();
  scheduleList.innerHTML = '';

  if (!requests.length) {
    scheduleList.innerHTML = '<li class="history-item">Nenhum agendamento registrado ainda.</li>';
    return;
  }

  requests.forEach(request => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `
      <strong>${request.notebook} — ${request.date} às ${request.time}</strong>
      <span><strong>Problema:</strong> ${request.details}</span>
    `;
    scheduleList.appendChild(li);
  });
}

scheduleForm.addEventListener('submit', event => {
  event.preventDefault();

  const request = {
    notebook: document.getElementById('scheduleNotebook').value,
    date: formatDate(document.getElementById('scheduleDate').value),
    time: document.getElementById('scheduleTime').value,
    details: document.getElementById('scheduleDetails').value.trim(),
  };

  const requests = loadScheduleRequests();
  requests.unshift(request);
  saveScheduleRequests(requests);
  renderScheduleRequests();
  scheduleForm.reset();
});

renderScheduleRequests();
