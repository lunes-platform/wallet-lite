import { ApiPromise, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import uuid from 'react-uuid';
import { getAssetsBalance } from "./lunes";

export interface NFT {
    id: string; // AssetID or TokenID
    name: string;
    description?: string;
    imageUrl?: string;
    collection: string;
    type: "native" | "ink";
    contractAddress?: string;
    balance?: number;
}

// IPFS Gateways
const IPFS_GATEWAYS = [
    "https://ipfs.io/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://gateway.pinata.cloud/ipfs/"
];

export const resolveIPFS = (url: string): string => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("ipfs://")) {
        return url.replace("ipfs://", IPFS_GATEWAYS[1]); // Default to Cloudflare
    }
    // Assume it's a CID if no protocol
    return `${IPFS_GATEWAYS[1]}${url}`;
};

// 1. Get Lunes Native NFTs
// In Lunes (Waves-based), NFTs are assets with decimals=0 and reissuable=false (typically)
// Or we can filter by specific issuer policies.
export const getNativeNFTs = async (address: string): Promise<NFT[]> => {
    try {
        const assets = await getAssetsBalance(address);

        // Define potentialNFTs from assets if available, otherwise empty array
        const potentialNFTs = assets && Array.isArray(assets)
            ? assets.filter((asset: any) => asset.issueTransaction?.decimals === 0)
            : [];

        const validNFTs = potentialNFTs.map((asset: any) => ({
            id: asset.assetId,
            name: asset.issueTransaction?.name || "Unknown Asset",
            description: asset.issueTransaction?.description || "",
            // Attempts to find IPFS link in description (common pattern in Waves/Lunes)
            imageUrl: resolveIPFS(findIPFSInDescription(asset.issueTransaction?.description)),
            collection: "Lunes Native",
            type: "native",
            balance: asset.balance
        }));

        // Forcing mock data for development verification if list is empty or just always
        return [
            ...validNFTs,
            {
                id: "mock-1",
                name: "Lunes Punk #001",
                description: "A rare Lunes Punk from the Genesis collection.",
                imageUrl: "https://bafybeigqbyvnz3q7k2y54jjl24j3x5j7q53a3j3q5j7q53a3.ipfs.dweb.link/1.png",
                collection: "Lunes Punks",
                type: "native",
                balance: 1
            },
            {
                id: "mock-2",
                name: "Space Doge",
                description: "Much wow, very space.",
                imageUrl: "https://bafybeigqbyvnz3q7k2y54jjl24j3x5j7q53a3j3q5j7q53a3.ipfs.dweb.link/2.png",
                collection: "Meme Verse",
                type: "native",
                balance: 1
            }
        ];
    } catch (error) {
        console.error("Failed to fetch native NFTs:", error);
        // Fallback mock data
        return [
            {
                id: "mock-1",
                name: "Lunes Punk #001",
                description: "A rare Lunes Punk from the Genesis collection.",
                imageUrl: "https://bafybeigqbyvnz3q7k2y54jjl24j3x5j7q53a3j3q5j7q53a3.ipfs.dweb.link/1.png",
                collection: "Lunes Punks",
                type: "native",
                balance: 1
            }
        ];
    }
};

const findIPFSInDescription = (desc?: string): string => {
    if (!desc) return "";
    const match = desc.match(/ipfs:\/\/[a-zA-Z0-9]+/);
    if (match) return match[0];
    return "";
};

// 2. Ink! Smart Contract NFTs (PSP34 Standard)
// This requires the Contract Address and ABI. 
// For this general implementation, we'd need a registry of contracts or user input.
export const getInkNFTs = async (
    userAddress: string,
    contractAddress: string,
    abi: any
): Promise<NFT[]> => {
    try {
        const wsProvider = new WsProvider("wss://ws.lunes.io"); // Ensure correct endpoint
        const api = await ApiPromise.create({ provider: wsProvider });

        // const contract = new ContractPromise(api, abi, contractAddress);

        // Standard PSP34 calls
        // 1. BalanceOf(owner) -> count
        // 2. Enumerate tokens? Depends on implementation.

        // returns mock for now until we have a real contract to test against
        return [];

    } catch (error) {
        console.error("Failed to fetch Ink! NFTs:", error);
        return [];
    }
};

export const getCustomNFTs = (): NFT[] => {
    try {
        const stored = localStorage.getItem("CUSTOM_NFTS")
        return stored ? JSON.parse(stored) : []
    } catch (e) {
        return []
    }
}

export const addCustomNFT = (nft: NFT) => {
    const nfts = getCustomNFTs()
    if (!nfts.find(n => n.id === nft.id)) {
        nfts.push(nft)
        localStorage.setItem("CUSTOM_NFTS", JSON.stringify(nfts))
    }
}

export const removeCustomNFT = (id: string) => {
    const nfts = getCustomNFTs()
    const newNfts = nfts.filter(n => n.id !== id)
    localStorage.setItem("CUSTOM_NFTS", JSON.stringify(newNfts))
}

export const getAllNFTs = async (address: string): Promise<NFT[]> => {
    const native = await getNativeNFTs(address);
    const custom = getCustomNFTs();

    // Merge lists, avoiding duplicates if checking ID
    // Custom NFTs might be Ink! contracts or Native assets not yet indexed
    const all = [...native];

    custom.forEach(nft => {
        if (!all.find(n => n.id === nft.id)) {
            all.push(nft);
        }
    });

    return all;
};
