(async function() {
  'use strict';

  const waitForSelector = selector => new Promise(resolve => {
    const timer = setInterval(() => {
      const element = document.querySelector(selector);

      if (element === null) {
        return;
      }

      clearInterval(timer);
      resolve(element);
    }, 100);
  });

  (await waitForSelector('[data-sigil*="flyout-causal"]')).click();
  (await waitForSelector('[data-sigil*="mflyout-remove-on-click"]:nth-child(3)')).click();
  (await waitForSelector('input[name="group_target"]')).value = '587289954686277';
  document.querySelector('form').submit();
})();
