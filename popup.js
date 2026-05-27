// popup.js
document.addEventListener('DOMContentLoaded', async () => {
  const presetSelect = document.getElementById('preset');
  const exactHour = document.getElementById('exactHour');
  const exactMinute = document.getElementById('exactMinute');
  const startBtn = document.getElementById('startBtn');

  // Dynamically populate hours (00-23)
  for (let i = 0; i < 24; i++) {
    const val = String(i).padStart(2, '0');
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = val;
    exactHour.appendChild(opt);
  }

  // Dynamically populate minutes (00-59)
  for (let i = 0; i < 60; i++) {
    const val = String(i).padStart(2, '0');
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = val;
    exactMinute.appendChild(opt);
  }

  const activeTab = await getActiveYouTubeTab();
  if (activeTab) {
    chrome.storage.local.get(null, (items) => {
      let activeTimer = null;
      for (const [key, value] of Object.entries(items)) {
        if (key.startsWith('yt_timer_') && value.tabId === activeTab.id) {
          activeTimer = value;
          break;
        }
      }

      if (activeTimer) {
        // Restore data
        if (activeTimer.preset) {
          presetSelect.value = activeTimer.preset;
        }
        if (activeTimer.exactTime) {
          const [h, m] = activeTimer.exactTime.split(':');
          exactHour.value = h;
          exactMinute.value = m;
        }

        // Lock UI
        presetSelect.disabled = true;
        exactHour.disabled = true;
        exactMinute.disabled = true;
        startBtn.disabled = true;
        startBtn.style.background = '#7f8c8d';
        startBtn.style.cursor = 'not-allowed';

        const updateCountdown = () => {
          const remainingMs = activeTimer.endTime - Date.now();
          if (remainingMs <= 0) {
            startBtn.textContent = "Sauvetage terminé !";
            clearInterval(intervalId);
            return;
          }
          const totalSecs = Math.ceil(remainingMs / 1000);
          const mins = Math.floor(totalSecs / 60);
          const secs = totalSecs % 60;
          startBtn.textContent = `Sauvetage dans ${mins}m ${secs}s`;
        };

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);
      }
    });
  }

  startBtn.addEventListener('click', async () => {
    if (!activeTab) {
      alert('Aucun onglet YouTube actif trouvé.');
      return;
    }
    const preset = presetSelect.value;
    const hourVal = exactHour.value;
    const minuteVal = exactMinute.value;
    let exactTime = '';
    let minutes = null;

    if (preset) {
      minutes = parseInt(preset, 10);
    } else if (hourVal && minuteVal) {
      exactTime = `${hourVal}:${minuteVal}`;
      const now = new Date();
      const target = new Date();
      target.setHours(parseInt(hourVal, 10), parseInt(minuteVal, 10), 0, 0);
      if (target <= now) {
        // if time already passed today, assume next day
        target.setDate(target.getDate() + 1);
      }
      minutes = Math.round((target - now) / 60000);
    } else {
      alert('Veuillez sélectionner une durée ou une heure précise (HH et MM).');
      return;
    }

    // Send message to background to set alarm
    chrome.runtime.sendMessage({
      action: 'block',
      minutes,
      tabId: activeTab.id,
      url: activeTab.url,
      preset,
      exactTime
    });
    window.close();
  });
});

function getActiveYouTubeTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs.find(t => t.url && t.url.includes('youtube.com'));
      resolve(tab);
    });
  });
}


