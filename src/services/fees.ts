/**
 * Fee Calculation Service
 * 
 * Rules:
 * - Base Fee: The network fee (standard is 100000 LUNES)
 * - Service Fee: 15% of the Base Fee
 * - Team Split: 90% of the Service Fee
 * - Affiliate Split: 10% of the Service Fee
 */

export const BASE_FEE = 100000;
export const SERVICE_FEE_PERCENTAGE = 0.15;
export const TEAM_SHARE_PERCENTAGE = 0.90;
export const AFFILIATE_SHARE_PERCENTAGE = 0.10;

// TODO: Replace with actual addresses or env vars
export const TREASURY_ADDRESS = "37Gj5P4kC4c8a...Treasury";
export const AFFILIATE_ADDRESS = "37Gj5P4kC4c8a...Affiliate"; // This might need to be dynamic

export interface FeeSplit {
    baseFee: number;
    serviceFeeTotal: number;
    teamShare: number;
    affiliateShare: number;
    totalTransactionCost: number; // Base Fee + Service Fee
}

export const calculateFeeSplit = (baseFee: number = BASE_FEE): FeeSplit => {
    const serviceFeeTotal = Math.floor(baseFee * SERVICE_FEE_PERCENTAGE);
    const teamShare = Math.floor(serviceFeeTotal * TEAM_SHARE_PERCENTAGE);
    const affiliateShare = serviceFeeTotal - teamShare; // Ensure no rounding loss

    return {
        baseFee,
        serviceFeeTotal,
        teamShare,
        affiliateShare,
        totalTransactionCost: baseFee // Note: The service fee is usually sent as a transfer, not added to the network fee itself, unless it's a specific Lunes feature. 
        // We will treat the shares as amounts to be transferred to the Treasury/Affiliate.
    };
};
