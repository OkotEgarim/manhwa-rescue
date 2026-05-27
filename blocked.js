// blocked.js
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const targetUrl = params.get('url');
  const until = parseInt(params.get('until') || '0', 10);

  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateTimer() {
    const remainingMs = until - Date.now();

    if (remainingMs <= 0) {
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      
      // Redirect back to original page when unblocked
      if (targetUrl) {
        window.location.href = targetUrl;
      }
      return;
    }

    const totalSeconds = Math.ceil(remainingMs / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    minutesEl.textContent = String(mins).padStart(2, '0');
    secondsEl.textContent = String(secs).padStart(2, '0');
  }

  // Update immediately and then every second
  updateTimer();
  setInterval(updateTimer, 1000);
});
