/**
 * Secure Storage Service
 * Uses chrome.storage.local instead of localStorage for XSS protection
 */

// Chrome API type declarations for extension context
declare const chrome: {
    storage?: {
        local: {
            get: (keys: string[], callback: (result: Record<string, any>) => void) => void;
            set: (items: Record<string, any>, callback?: () => void) => void;
            remove: (keys: string[], callback?: () => void) => void;
        };
    };
} | undefined;

const STORAGE_KEYS = {
    SEED: 'SEED',
    ADDRESS: 'ADDRESS',
    PASS: 'PASS',
    CUSTOM_TOKENS: 'CUSTOM_TOKENS',
    HIDDEN_TOKENS: 'HIDDEN_TOKENS',
    NETWORK: 'NETWORK'
} as const;

type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

/**
 * Get a value from secure storage
 */
export const getSecure = async (key: StorageKey): Promise<string | null> => {
    return new Promise((resolve) => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.get([key], (result) => {
                resolve(result[key] || null);
            });
        } else {
            // Fallback for development (non-extension context)
            resolve(localStorage.getItem(key));
        }
    });
};

/**
 * Set a value in secure storage
 */
export const setSecure = async (key: StorageKey, value: string): Promise<void> => {
    return new Promise((resolve) => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.set({ [key]: value }, () => {
                resolve();
            });
        } else {
            // Fallback for development
            localStorage.setItem(key, value);
            resolve();
        }
    });
};

/**
 * Remove a value from secure storage
 */
export const removeSecure = async (key: StorageKey): Promise<void> => {
    return new Promise((resolve) => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.remove([key], () => {
                resolve();
            });
        } else {
            localStorage.removeItem(key);
            resolve();
        }
    });
};

export { STORAGE_KEYS };
