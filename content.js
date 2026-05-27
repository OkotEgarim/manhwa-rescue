// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'pause') {
    const video = document.querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  }
});
