const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');
const STORAGE_KEY = 'notebookFeedbackRequests';

function loadFeedbackRequests() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveFeedbackRequests(requests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function renderFeedbackRequests() {
  const requests = loadFeedbackRequests();
  feedbackList.innerHTML = '';

  if (!requests.length) {
    feedbackList.innerHTML = '<li class="history-item">Nenhum feedback enviado ainda.</li>';
    return;
  }

  requests.forEach(request => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `
      <strong>${request.notebook} — ${request.type}</strong>
      <span><strong>Mensagem:</strong> ${request.message}</span>
    `;
    feedbackList.appendChild(li);
  });
}

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const request = {
    notebook: document.getElementById('feedbackNotebook').value,
    type: document.getElementById('feedbackType').value,
    message: document.getElementById('feedbackMessage').value.trim(),
  };

  const requests = loadFeedbackRequests();
  requests.unshift(request);
  saveFeedbackRequests(requests);
  renderFeedbackRequests();
  feedbackForm.reset();
});

renderFeedbackRequests();