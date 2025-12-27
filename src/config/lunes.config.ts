// RPC Redundancy Configuration
// The first URL in each array is the primary, others are fallbacks
export const config = {
    mainnet: {
        minimumSeedLength: 25,
        requestOffset: 0,
        requestLimit: 100,
        logLevel: "warning",
        timeDiff: 0,
        networkByte: "1".charCodeAt(0),
        // Primary node address (first is used by lunes-js-api)
        nodeAddress: "https://lunesnode.lunes.io",
        matcherAddress: "https://lunesnode.lunes.io/matcher",
        // Redundant node addresses for HTTP failover
        nodeAddresses: [
            "https://lunesnode.lunes.io",
            "https://lunesnode-main-01.lunes.io",
            "https://lunesnode-main-02.lunes.io"
        ],
        // WebSocket endpoints for real-time data
        wsAddresses: [
            "wss://ws.lunes.io",
            "wss://ws-lunes-main-01.lunes.io",
            "wss://ws-lunes-main-02.lunes.io",
            "wss://ws-archive.lunes.io" // Archive node for historical data
        ]
    },

    testnet: {
        minimumSeedLength: 25,
        requestOffset: 0,
        requestLimit: 100,
        logLevel: "warning",
        timeDiff: 0,
        networkByte: "0".charCodeAt(0),
        nodeAddress: "https://lunesnode-testnet.lunes.io",
        matcherAddress: "https://lunesnode-testnet.lunes.io/matcher",
        nodeAddresses: [
            "https://lunesnode-testnet.lunes.io"
        ],
        wsAddresses: [
            "wss://ws-testnet.lunes.io"
        ]
    }
}

// Substrate/Polkadot Network Configurations for Web3 DeFi Login
export const substrateNetworks = {
    lunes: {
        name: 'Lunes',
        networkId: 'lunes',
        ss58Prefix: 1,
        genesisHash: '0x...', // Lunes genesis hash
        rpcEndpoints: [
            "wss://ws.lunes.io",
            "wss://ws-lunes-main-01.lunes.io",
            "wss://ws-lunes-main-02.lunes.io"
        ],
        properties: {
            tokenSymbol: 'LUNES',
            tokenDecimals: 8
        }
    },
    polkadot: {
        name: 'Polkadot',
        networkId: 'polkadot',
        ss58Prefix: 0,
        genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
        rpcEndpoints: [
            "wss://rpc.polkadot.io",
            "wss://polkadot-rpc.publicnode.com",
            "wss://polkadot.api.onfinality.io/public-ws"
        ],
        properties: {
            tokenSymbol: 'DOT',
            tokenDecimals: 10
        }
    },
    kusama: {
        name: 'Kusama',
        networkId: 'kusama',
        ss58Prefix: 2,
        genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
        rpcEndpoints: [
            "wss://kusama-rpc.polkadot.io",
            "wss://kusama-rpc.publicnode.com",
            "wss://kusama.api.onfinality.io/public-ws"
        ],
        properties: {
            tokenSymbol: 'KSM',
            tokenDecimals: 12
        }
    },
    substrate: {
        name: 'Substrate (Generic)',
        networkId: 'substrate',
        ss58Prefix: 42,
        genesisHash: null, // Generic, accepts any
        rpcEndpoints: [],
        properties: {
            tokenSymbol: 'UNIT',
            tokenDecimals: 12
        }
    }
}

// Get current network type (for extension use)
export const getCurrentNetwork = (): "mainnet" | "testnet" => {
    const userNetwork = localStorage.getItem("NETWORK")
    if (userNetwork === "testnet") {
        return userNetwork
    }
    return "mainnet"
}


// Helper function to get the next available node URL
export const getNodeWithFailover = async (
    nodeAddresses: string[],
    path: string,
    options?: RequestInit
): Promise<Response> => {
    let lastError: Error | null = null;

    for (const baseUrl of nodeAddresses) {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                ...options,
                signal: AbortSignal.timeout(5000) // 5 second timeout per attempt
            });

            if (response.ok) {
                return response;
            }
        } catch (error) {
            lastError = error as Error;
            console.warn(`[RPC Failover] Failed to connect to ${baseUrl}, trying next...`);
        }
    }

    throw lastError || new Error('All RPC nodes failed');
}

// Helper to get active WebSocket connection with failover
export const connectWebSocketWithFailover = (
    wsAddresses: string[],
    onMessage: (data: any) => void,
    onError?: (error: Event) => void
): WebSocket | null => {
    for (const wsUrl of wsAddresses) {
        try {
            const ws = new WebSocket(wsUrl);

            ws.onopen = () => {
                console.log(`[WS] Connected to ${wsUrl}`);
            };

            ws.onmessage = (event) => {
                onMessage(JSON.parse(event.data));
            };

            ws.onerror = (error) => {
                console.warn(`[WS] Error on ${wsUrl}`, error);
                if (onError) onError(error);
            };

            return ws;
        } catch (error) {
            console.warn(`[WS Failover] Failed to connect to ${wsUrl}, trying next...`);
        }
    }

    return null;
}
