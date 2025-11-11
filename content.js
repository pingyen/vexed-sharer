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

  await waitForTime(6000);

  while (true) {
    const editor = await waitForSelector('.chats-container [contenteditable="true"]');

    editor.focus();

    if (document.activeElement === editor) {
      break;
    }

    await waitForTime(2000);
  }

  await waitForTime(2000);
  document.execCommand('selectAll', false, null);
  await waitForTime(200);

  const data = JSON.parse(new URLSearchParams(location.search).get('sharer'));
  const url = data.url;
  const text = data.text;
  const content = text === undefined ? url : url + '\n\n' + text;
  const max = 2;

  for (let i = 0; i <= max; ++i) {
    document.execCommand('insertText', false, content);

    try {
      await waitForSelector('.chats-container button.reply-icon', 6000);
    } catch (e) {
      if (i === max) {
        if (text === undefined) {
          location = url;
        }
      } else {
        document.execCommand('selectAll', false, null);
        await waitForTime(200);
        document.execCommand('insertText', false, '');
        await waitForTime(200);
        continue;
      }
    }

    await waitForTime(2000);
    (await waitForSelector('.chats-container button.send')).click();
    await waitForTime(2000);
    window.close();
    break;
  }
})();
