
const setDOMInfo = info => {
  document.getElementById('boss-list').innerHTML = info.content;
}

window.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'DOMInfo'}, setDOMInfo);
  });
});
