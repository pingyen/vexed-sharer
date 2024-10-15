(async function() {
  'use strict';

  const waitForTime = ms => new Promise(resolve => {
    setTimeout(resolve, ms);
  });

  const waitForSelector = selector => new Promise(resolve => {
    const check = () => {
      const element = document.querySelector(selector);

      element === null ?
        setTimeout(check, 100) :
        resolve(element);
    };

    check();
  });

  await waitForTime(1000);
  (await waitForSelector('div[role="main"] div[style*="--card-corner-radius"] div[role="button"][tabindex="0"]')).click();
  await waitForTime(1000);
  (await waitForSelector('div[role="dialog"] div[contenteditable="true"]')).focus();
  await waitForTime(1000);
  document.execCommand('insertText', false, (new URLSearchParams(location.search)).get('sharer'));
  await waitForTime(1000);
  await waitForSelector('div[role="dialog"]:has(div[contenteditable="true"]) div[role="presentation"] + div div[role="button"][tabindex="0"] > i');
  await waitForTime(1000);
  document.execCommand('selectAll', false);
  await waitForTime(1000);
  document.execCommand('insertText', false, '!');
  await waitForTime(1000);
  document.execCommand('selectAll', false);
  await waitForTime(1000);
  document.execCommand('delete', false);
  await waitForTime(1000);
  document.querySelector('div[role="dialog"] form input[type="submit"]').click();
  await waitForTime(1000);

  setInterval(() => {
    if (document.querySelector('div[role="dialog"] div[contenteditable="true"]') === null) {
      window.close();
    }
  }, 100);
})();
