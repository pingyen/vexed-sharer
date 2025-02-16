chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (url) => { location = 'https://m.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url); },
    args: [tab.url]
  });
});
