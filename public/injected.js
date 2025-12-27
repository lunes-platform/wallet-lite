// Injected Script - Adds the Lunes Wallet to window.injectedWeb3
// This script runs in the context of the web page itself
// and provides the standard @polkadot/extension-dapp interface

const EXTENSION_NAME = 'lunes-wallet';
const EXTENSION_VERSION = '1.0.7';

// Generate unique request IDs
let requestId = 0;
const pendingRequests = new Map();

// Helper to send requests to the content script
function sendRequest(method, params = {}) {
    return new Promise((resolve, reject) => {
        const id = ++requestId;

        pendingRequests.set(id, { resolve, reject });

        window.postMessage({
            type: `${EXTENSION_NAME}:request`,
            payload: { id, method, params }
        }, '*');

        // Timeout after 60 seconds
        setTimeout(() => {
            if (pendingRequests.has(id)) {
                pendingRequests.delete(id);
                reject(new Error('Request timeout'));
            }
        }, 60000);
    });
}

// Listen for responses from the content script
window.addEventListener('message', (event) => {
    if (event.source !== window) return;

    const { type, id, payload, error } = event.data;

    if (type === `${EXTENSION_NAME}:response`) {
        const pending = pendingRequests.get(id);
        if (pending) {
            pendingRequests.delete(id);
            if (error) {
                pending.reject(new Error(error));
            } else {
                pending.resolve(payload);
            }
        }
    }
});

// The Lunes Wallet provider object
const lunesWalletProvider = {
    name: 'Lunes Wallet',
    version: EXTENSION_VERSION,

    // Enable the extension for a dApp
    async enable(origin) {
        console.log(`[Lunes Wallet] Enabling for origin: ${origin}`);
        const result = await sendRequest('enable', { origin });

        if (!result || !result.accounts) {
            throw new Error('User rejected the request');
        }

        return {
            accounts: {
                get: async () => result.accounts,
                subscribe: (cb) => {
                    // Subscribe to account changes
                    cb(result.accounts);
                    return () => { }; // Unsubscribe function
                }
            },
            signer: {
                signPayload: async (payload) => {
                    return await sendRequest('signPayload', { payload });
                },
                signRaw: async (raw) => {
                    return await sendRequest('signRaw', { raw });
                }
            },
            metadata: {
                get: async () => [],
                provide: async (def) => true
            }
        };
    }
};

// Inject into window.injectedWeb3 (standard Polkadot extension interface)
if (!window.injectedWeb3) {
    window.injectedWeb3 = {};
}

window.injectedWeb3[EXTENSION_NAME] = lunesWalletProvider;

// Also support the older window.SubWallet-like pattern for compatibility
window.lunesWallet = lunesWalletProvider;

console.log('[Lunes Wallet] Injected into window.injectedWeb3');

// Dispatch event to notify dApps that a new wallet is available
window.dispatchEvent(new CustomEvent('injectedWeb3:loaded', {
    detail: {
        name: EXTENSION_NAME,
        version: EXTENSION_VERSION
    }
}));
