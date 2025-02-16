chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (url) => { window.open('https://m.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)) },
    args: [tab.url]
  });
});
