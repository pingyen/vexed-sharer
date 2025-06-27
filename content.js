(async function() {
  'use strict';

  const waitForTime = ms => new Promise(resolve => {
    setTimeout(resolve, ms);
  });

  const waitForSelector = (selector, timeout) => new Promise((resolve, reject) => {
    let outTimer = null;

    const checkTimer = setInterval(() => {
      const element = document.querySelector(selector);

      if (element === null) {
        return;
      }

      clearTimeout(outTimer);
      clearInterval(checkTimer);
      resolve(element);
    }, 100);

    if (timeout !== undefined) {
      outTimer = setTimeout(() => {
        clearInterval(checkTimer);
        reject();
      }, timeout);
    }
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

  for (let i = 0; i < 3; ++i) {
    document.execCommand('insertText', false, getContent());

    try {
      await waitForSelector('.chats-container button.reply-icon', 6000);
    } catch (e) {
      document.execCommand('selectAll', false, null);
      await waitForTime(200);
      document.execCommand('insertText', false, '');
      await waitForTime(200);
      continue;
    }

    await waitForTime(2000);
    (await waitForSelector('.chats-container button.send')).click();
    await waitForTime(2000);
    window.close();
    break;
  }
})();
