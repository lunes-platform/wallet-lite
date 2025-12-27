// Background Service Worker - Handles extension logic and state
// This script manages account access and signing requests

const EXTENSION_NAME = 'lunes-wallet';

// Store approved origins
let approvedOrigins = new Set();

// Load approved origins from storage
// Load approved origins from storage
chrome.storage.local.get(['approvedOrigins'], (result) => {
    if (result && result.approvedOrigins) {
        approvedOrigins = new Set(result.approvedOrigins);
    }
});

// Save approved origins to storage
function saveApprovedOrigins() {
    chrome.storage.local.set({
        approvedOrigins: Array.from(approvedOrigins)
    });
}

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type, data } = message;

    handleRequest(type, data, sender)
        .then(sendResponse)
        .catch((error) => sendResponse({ error: error.message }));

    // Return true to indicate async response
    return true;
});

async function handleRequest(type, data, sender) {
    const origin = sender.tab?.url ? new URL(sender.tab.url).origin : 'unknown';

    switch (type) {
        case 'enable':
            return handleEnable(origin, data);

        case 'signPayload':
            return handleSignPayload(origin, data);

        case 'signRaw':
            return handleSignRaw(origin, data);

        default:
            throw new Error(`Unknown request type: ${type}`);
    }
}

// Store pending approval requests
let pendingApprovals = new Map();

async function handleEnable(origin, data) {
    console.log(`[Background] Enable request from ${origin}`);

    // Check if origin is already approved
    if (approvedOrigins.has(origin)) {
        // Already approved, return accounts
        const accounts = await getAccounts();
        return {
            accounts: accounts.map(acc => ({
                address: acc.address,
                genesisHash: acc.genesisHash || null,
                name: acc.name || 'Lunes Account',
                type: 'sr25519'
            }))
        };
    }

    // Origin not approved - require user interaction
    // In production, this would open the popup for user to approve
    // For now, we reject unapproved origins
    throw new Error('Origin not approved. Please approve this site in the Lunes Wallet extension.');
}

async function handleSignPayload(origin, data) {
    console.log(`[Background] Sign payload request from ${origin}`);

    if (!approvedOrigins.has(origin)) {
        throw new Error('Origin not approved');
    }

    // In production, open a popup for user to confirm signing
    // For now, return a placeholder that would normally come from the wallet
    throw new Error('Signing requires user interaction - open popup');
}

async function handleSignRaw(origin, data) {
    console.log(`[Background] Sign raw request from ${origin}`);

    if (!approvedOrigins.has(origin)) {
        throw new Error('Origin not approved');
    }

    // In production, open a popup for user to confirm signing
    throw new Error('Signing requires user interaction - open popup');
}

async function getAccounts() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['accounts', 'ADDRESS'], (result) => {
            if (result && result.accounts) {
                resolve(result.accounts);
            } else if (result && result.ADDRESS) {
                // Fallback to old storage format
                resolve([{
                    address: result.ADDRESS,
                    name: 'Lunes Account',
                    genesisHash: null
                }]);
            } else {
                resolve([]);
            }
        });
    });
}

console.log('[Lunes Wallet] Background service worker loaded');
