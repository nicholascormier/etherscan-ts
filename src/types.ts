import type { EtherscanChain, EtherscanChainId } from "./chains"

export type Hexish = `0x${string}`
export type EtherscanApiQueryTag = "latest" | "earliest" | "pending"

export interface RequestClient<Req, Res> {
    get(url: string | URL, opts?: Req): Res
    post(url: string | URL, opts: Req): Res
    put(url: string | URL, opts: Req): Res
    delete(url: string | URL, opts: Req): Res
}
export type EtherscanApiCredentials = {
    apiKey: string
    chain: number
}

export type MaybePromise<T> = T | Promise<T>

export type EtherscanClient<Req, Res> = {
    client: RequestClient<Req, Res>
}

export type EtherscanClientOptions<Req, Res> = EtherscanClient<Req, Res> & Omit<EtherscanApiCredentials, "chain"> & {
    chain?: EtherscanChain
}

export type EtherscanContext<Req, Res> = {
    client: RequestClient<Req, Res>
    url: URL
}

type Method = "GET" | "POST" | "PUT" | "DELETE"

type EtherscanApiRequest = {
    method: Method
    url: URL
    body?: EtherscanPostBody
}

type EtherscanPostBody = VerifyContractRequestBody | {}

type VerifyContractRequestBody = {
    chainId: EtherscanChainId
    codeformat: "solidity-single-file" | "solidity-standard-json-input"
    sourceCode: any
    constructorArguements: any
    optional: any
    contractaddress: any
    contractname: any
    compilerversion: any
}

export type EtherscanApiResponse = {
    status: "0" | "1"
    message: "OK" | "NOTOK"
    result: any
}

export type SomeClient<Req, Res> = { 
    client: ClientMethods<EtherscanApiRequest, EtherscanApiResponse> 
} | { client: ClientMethods<Req, Res> } & ClientAdapters<Req, Res>

export type ClientAdapters<Req, Res> = {
    requestAdapter(request: EtherscanApiRequest): Req
    responseAdapter(response: EtherscanApiResponse): Res
}

interface ClientMethods<Req, Res> {
    get(request: Req): Res
    post(request: Req): Res
    delete(request: Req): Res
    put(request: Req): Res
} 