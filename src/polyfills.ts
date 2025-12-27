import { Buffer } from 'buffer';

// Polyfill Buffer
if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || Buffer;
}

// Polyfill process
if (typeof window !== 'undefined') {
    window.process = window.process || {
        env: { DEBUG: undefined },
        version: '',
        nextTick: (fn: Function) => setTimeout(fn, 0),
    } as any;
}
