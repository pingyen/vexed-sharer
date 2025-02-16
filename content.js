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

  await waitForTime(6000);
  (await waitForSelector('.chats-container [contenteditable="true"]')).focus();
  await waitForTime(2000);
  document.execCommand('insertText', false, (new URLSearchParams(location.search)).get('sharer'));
  await waitForTime(2000);
  (await waitForSelector('.chats-container button.send')).click();
  await waitForTime(2000);
  window.close();
})();
