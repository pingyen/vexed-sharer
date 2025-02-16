chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (url) => {
      const isPTT = url === 'https://term.ptt.cc/';

      if (isPTT === true) {
        const anchor = document.querySelector('[href^="https://www.ptt.cc/bbs/"]');

        if (anchor === null) {
          alert('Cannot find the URL.');
          return;
        }

        url = anchor.href;
      }

      window.open(
        'https://web.telegram.org/k/?sharer=' + encodeURIComponent(url) + '#@P_Vexed',
        '_blank',
        `width=100,height=100,top=${window.innerHeight - 100},left=${window.innerWidth - 100}`);

      isPTT === false &&
        window.close();
    },
    args: [tab.url]
  });
});
