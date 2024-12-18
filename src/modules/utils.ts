import { ZodType } from "zod"
import { EtherscanApiResponse } from "../types"
import { EtherscanApiError } from "../errors"

export class MalformedResponseError extends Error {
    constructor(response: unknown) {
        super() 
        this.name = `MalformedResponseError`
        this.message = `received malformed response object from http client.\r\nResponse:\r\n${JSON.stringify(response)}`
    }
}

export function parseApiResponse<T extends EtherscanApiResponse>(response: unknown, schema: ZodType<T>) {
    const res = response as any
    const body = res.body || res.data
    
    if (body == undefined) {
        throw new MalformedResponseError(response)
    }
    
    const result = schema.safeParse(body)

    if (result.error) {
        throw new MalformedResponseError(result.error)
    }

    if (result.data.message == "NOTOK") {
        throw new EtherscanApiError(result.data)
    }

    return result.data.result
}

export function handleParsedResponse(response: unknown) {

}

