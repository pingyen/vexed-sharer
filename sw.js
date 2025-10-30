chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (url) => {
      const result = (url => {
        if (url === 'https://term.ptt.cc/') {
          const anchor = Array.from(document.querySelectorAll('[href^="https://www.ptt.cc/bbs/"]')).at(-1);

          if (anchor === undefined) {
            alert('Cannot find the URL.');
            return false;
          }

          return [ { url: anchor.href }, false];
        }

        if (url.startsWith('https://www.facebook.com/') === true) {
          const pathname = location.pathname;

          if (pathname === '/permalink.php') {
            const title = document.title;
            const result = /^\(\d+?\) /.exec(title);

            let text = result === null ? title : title.substring(result[0].length);

            text = text.substring(0, text.lastIndexOf(' | '));

            return [{ url, text }, true];
          }

          if (pathname.startsWith('/groups/') === true) {
            const multi = new URLSearchParams(location.search).get('multi_permalinks');

            if (multi !== null) {
              return [{ url: 'https://www.facebook.com' + pathname + 'posts/' + multi }, true];
            }
          }
        }

        return [{ url }, true];
      })(url);

      if (result === false) {
        return;
      }

      const [data, close] = result;

      window.open(
        'https://web.telegram.org/k/?sharer=' + encodeURIComponent(JSON.stringify(data)) + '#@P_Vexed',
        '_blank',
        `width=100,height=100,top=${window.innerHeight - 100},left=${window.innerWidth - 100}`);

      close === true &&
        window.close();
    },
    args: [tab.url]
  });
});
