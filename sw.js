chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (url) => {
      if (url === 'https://term.ptt.cc/') {
        const anchor = document.querySelector('[href^="https://www.ptt.cc/bbs/"]');

        anchor === null ?
          alert('Cannot find the URL.') :
          window.open(
            'https://m.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(anchor.href),
            '_blank',
            `width=100,height=100,top=${window.innerHeight - 100},left=${window.innerWidth - 100}`);

        return;
      }

      location = 'https://m.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
    },
    args: [tab.url]
  });
});
