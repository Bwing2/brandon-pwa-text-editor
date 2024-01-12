const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt event fired');
  // Saves event in global variable deferredPrompt on the window object. Store event to be used later.
  window.deferredPrompt = event;

  // .toggle() method removes class depending on state.
  butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  // Checks if promptEvent is null or undefined, function returns nothing so nothing happens.
  if (!promptEvent) {
    return;
  }

  // Prompt that asks user if they want to install.
  promptEvent.prompt();

  // Clears deferred prompt variable to null, used one time only.
  window.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clears deferredPrompt property on the window object. Cleaning up global variables after use can help with memory leaks.
  window.deferredPrompt = null;
});
