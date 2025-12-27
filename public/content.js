// Content Script - Injects the Web3 provider into the page
// This script runs in the context of web pages and bridges communication
// between the page and the extension's background script

const EXTENSION_NAME = 'lunes-wallet';

// Inject the script that will add the wallet to window.injectedWeb3
function injectScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('injected.js');
    script.type = 'module';
    script.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}

// Inject as early as possible
injectScript();

// Listen for messages from the injected script
window.addEventListener('message', async (event) => {
    // Only accept messages from the same window
    if (event.source !== window) return;

    const { type, payload } = event.data;

    if (type === `${EXTENSION_NAME}:request`) {
        try {
            // Forward the request to the background script
            const response = await chrome.runtime.sendMessage({
                type: payload.method,
                data: payload.params
            });

            // Send the response back to the page
            window.postMessage({
                type: `${EXTENSION_NAME}:response`,
                id: payload.id,
                payload: response
            }, '*');
        } catch (error) {
            window.postMessage({
                type: `${EXTENSION_NAME}:response`,
                id: payload.id,
                error: error.message
            }, '*');
        }
    }
});

// Notify the page that the extension is installed
window.postMessage({
    type: `${EXTENSION_NAME}:installed`,
    payload: { version: '1.0.7' }
}, '*');

console.log('[Lunes Wallet] Content script loaded');
