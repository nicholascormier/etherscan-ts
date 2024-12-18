import { EtherscanApiResponse } from "./types";

export class EtherscanApiError extends Error {
    constructor(response: EtherscanApiResponse) {
        super()
        this.name = "ETHERSCAN_API_ERROR"
        this.message = (typeof response.result == "string") ? response.result : "Etherscan API error."
    }
}
