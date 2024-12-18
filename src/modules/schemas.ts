
import { z } from "zod";

function EtherscanResponse<T extends z.ZodTypeAny>(result: T) {
    return z.object({
        status: z.union([z.literal("0"), z.literal("1")]),
        message: z.literal("OK").or(z.literal("NOTOK")),
        result
    })
}

const EtherscanTxSchema = z.object({
    "blockNumber": z.number(),
    "timeStamp": z.number(),
    "hash": z.string(),
    "nonce": z.number(),
    "blockHash": z.string(),
    "transactionIndex": z.number(),
    "from": z.string(),
    "to": z.string(),
    "value": z.string(),
    "gas": z.string(),
    "gasPrice": z.string(),
    "isError": z.number(),
    "txreceipt_status": z.number(),
    "input": z.string(),
    "contractAddress": z.string(),
    "cumulativeGasUsed": z.number(),
    "gasUsed": z.number(),
    "confirmations": z.number(),
    "methodId": z.string(),
    "functionName": z.string()
})

const EtherscanInternalTxSchema = z.object({ 
    "blockNumber":z.string(),
    "timeStamp":z.string(),
    "hash":z.string(),
    "from":z.string(),
    "to":z.string(),
    "value":z.string(),
    "contractAddress":z.string(),
    "input":z.string(),
    "type":z.string(),
    "gas": z.string(),
    "gasUsed": z.number(),
    "traceId": z.string(),
    "isError": z.number(),
    "errCode": z.string()
})

export const GetBalanceSchema = EtherscanResponse(z.string())
export const GetBalancesSchema = EtherscanResponse(z.array(z.object({ address: z.string(), balance: z.string() })))
export const ListTransactionsSchema = EtherscanResponse(z.array(EtherscanTxSchema))
export const ListInternalTransactionsSchema = EtherscanResponse(z.array(EtherscanInternalTxSchema))
