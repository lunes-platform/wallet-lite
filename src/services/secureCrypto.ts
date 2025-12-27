/**
 * Secure Cryptography Service
 * Uses Web Crypto API with PBKDF2 for key derivation and AES-GCM for encryption
 */

const PBKDF2_ITERATIONS = 100000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const KEY_LENGTH = 256;

/**
 * Generate a random salt
 */
export const generateSalt = (): Uint8Array => {
    return crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
};

/**
 * Derive a key from password using PBKDF2
 */
export const deriveKey = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        'PBKDF2',
        false,
        ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt.buffer as ArrayBuffer,
            iterations: PBKDF2_ITERATIONS,
            hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: KEY_LENGTH },
        false,
        ['encrypt', 'decrypt']
    );
};

/**
 * Encrypt a value using AES-GCM
 * Returns: salt (16 bytes) + iv (12 bytes) + ciphertext, base64 encoded
 */
export const encryptSecure = async (plaintext: string, password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const salt = generateSalt();
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const key = await deriveKey(password, salt);

    const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encoder.encode(plaintext)
    );

    // Combine salt + iv + ciphertext
    const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(ciphertext), salt.length + iv.length);

    return btoa(Array.from(combined).map(byte => String.fromCharCode(byte)).join(''));
};

/**
 * Decrypt a value using AES-GCM
 */
export const decryptSecure = async (encryptedBase64: string, password: string): Promise<string> => {
    const combined = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));

    const salt = combined.slice(0, SALT_LENGTH);
    const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const ciphertext = combined.slice(SALT_LENGTH + IV_LENGTH);

    const key = await deriveKey(password, salt);

    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
};

/**
 * Hash password using PBKDF2 for verification storage
 * Returns: salt (16 bytes) + hash (32 bytes), base64 encoded
 */
export const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const salt = generateSalt();
    const passwordBuffer = encoder.encode(password);

    const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        'PBKDF2',
        false,
        ['deriveBits']
    );

    const hash = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt.buffer as ArrayBuffer,
            iterations: PBKDF2_ITERATIONS,
            hash: 'SHA-256'
        },
        baseKey,
        256
    );

    const combined = new Uint8Array(salt.length + hash.byteLength);
    combined.set(salt, 0);
    combined.set(new Uint8Array(hash), salt.length);

    return btoa(Array.from(combined).map(byte => String.fromCharCode(byte)).join(''));
};

/**
 * Verify a password against a stored hash
 */
export const verifyPasswordHash = async (password: string, storedHash: string): Promise<boolean> => {
    const encoder = new TextEncoder();
    const combined = Uint8Array.from(atob(storedHash), c => c.charCodeAt(0));

    const salt = combined.slice(0, SALT_LENGTH);
    const expectedHash = combined.slice(SALT_LENGTH);

    const passwordBuffer = encoder.encode(password);

    const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        'PBKDF2',
        false,
        ['deriveBits']
    );

    const computedHash = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt.buffer as ArrayBuffer,
            iterations: PBKDF2_ITERATIONS,
            hash: 'SHA-256'
        },
        baseKey,
        256
    );

    // Constant-time comparison
    const computedArray = new Uint8Array(computedHash);
    if (computedArray.length !== expectedHash.length) return false;

    let diff = 0;
    for (let i = 0; i < computedArray.length; i++) {
        diff |= computedArray[i] ^ expectedHash[i];
    }
    return diff === 0;
};
