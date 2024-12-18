import type { EtherscanContext } from "../types";
import { GetBalanceSchema, GetBalancesSchema, ListInternalTransactionsSchema, ListTransactionsSchema } from "./schemas";
import { Hexish } from "../types";
import { QueryBuilder } from "../query";
import { parseApiResponse } from "./utils";

export function AccountModule<Req, Res>(context: EtherscanContext<Req, Res>) {
    const ctx = {
        ...context,
        baseUrl: new QueryBuilder(context.url).withModule("account").URL()
    }

    return {
        txListInternal: (options: InternalTransactionListOptions) => txListInternal(options, ctx),
        txList: (options: TransactionListOptions) => txList(options, ctx),
        getBalance: (options: GetBalanceOptions) => getBalance(options, ctx),
        getBalances: (options: GetBalancesOptions) => getBalances(options, ctx),
    }
}

async function getBalance<Req, Res>(options: GetBalanceOptions, ctx: EtherscanContext<Req, Res>) { 
    const url = new QueryBuilder(ctx.url).withAction("balance").withOptions(options).URL()
    const response = await ctx.client.get(url)

    return parseApiResponse(response, GetBalanceSchema)
}

export type EtherscanApiModule = "account" | "contract" | "transaction" | "block" | "logs" | "stats" | "gastracker"

export type EtherscanApiAction = "balance" | "balancemulti"

async function getBalances<Req, Res>(options: GetBalancesOptions, ctx: EtherscanContext<Req, Res>) {
    const url = new URL(ctx.url)
    
    Object.assign(url.searchParams, { 
        action: "balanceMulti", 
        address: options.addresses.join() 
    })
    
    const response = await ctx.client.get(url)
    return parseApiResponse(response, GetBalancesSchema)
}

async function txList<Req, Res>(options: TransactionListOptions, ctx: EtherscanContext<Req, Res>) {
    const url = new URL(ctx.url)
    Object.assign(url.searchParams, { action: "txlist", ...options })

    const res = await ctx.client.get(url)
    return parseApiResponse(res, ListTransactionsSchema)
}

async function txListInternal<Req, Res>(options: InternalTransactionListOptions, ctx: EtherscanContext<Req, Res>, pagination?: ApiPaginationOptions) {
    const url = new URL(ctx.url)

    Object.assign(url.searchParams, { 
        action: "txlistinternal",
        ...pagination,
        ...options, 
    })
    
    const res = await ctx.client.get(url)
    return parseApiResponse(res, ListInternalTransactionsSchema)
}

type BlockTag = { tag: "latest" | "earliest" | "pending" }

type GetBalanceOptions = Partial<BlockTag> & { address: Hexish }
type GetBalancesOptions = Partial<BlockTag> & { addresses: Hexish[] }

type ApiPaginationOptions = Partial<{
    startblock: number
    endblock: number
    page: number
    offset: number
    sort: "asc" | "dsc"
}>

type TransactionListOptions = ApiPaginationOptions & {
    address: Hexish
}

type InternalTransactionListOptions = Partial<{ address: Hexish, hash: Hexish }>
