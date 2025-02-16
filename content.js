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

  const getContent = () => {
    const data = JSON.parse(new URLSearchParams(location.search).get('sharer'));
    const tokens = [data.url];

    if (data.text !== undefined) {
      tokens.push(data.text);
    }

    return tokens.join('\n\n');
  };

  await waitForTime(6000);
  (await waitForSelector('.chats-container [contenteditable="true"]')).focus();
  await waitForTime(2000);
  document.execCommand('selectAll', false, null);
  await waitForTime(200);
  document.execCommand('insertText', false, getContent());
  await waitForTime(2000);
  (await waitForSelector('.chats-container button.send')).click();
  await waitForTime(2000);
  window.close();
})();
