import { Chains } from "./chains"
import { AccountModule } from "./modules/account"
import { EtherscanClientOptions } from "./types"

export function EtherscanClient<Req, Res>({ apiKey, client, chain }: EtherscanClientOptions<Req, Res>) {
    const context = {
        client,
        url: new URL(`https://api.etherscan.io/v2/api?chainid=${chain ? Chains[chain] : 1}&apikey=${apiKey}`),
    }
    
    return {
        accounts: AccountModule(context),
        
    }
}