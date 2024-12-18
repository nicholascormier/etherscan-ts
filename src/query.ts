import { EtherscanApiAction, EtherscanApiModule } from "./modules/account"
import { Hexish } from "./types"

type EtherscanApiPaginationOptions = {
    page: number
    offset: number
}

type EtherscanApiSortOptions = { sort: "asc" | "desc" }

export class QueryBuilder {
    private url: URL
    constructor(url: URL) {
        this.url = url
    }

    withModule(module: EtherscanApiModule) {
        this.url.searchParams.set("module", module)
        return this
    }

    withAction(action: EtherscanApiAction) {
        this.url.searchParams.set("action", action)
        return this
    }

    paginated(options: EtherscanApiPaginationOptions) {
        Object.entries(options).forEach(([k, v]) => this.url.searchParams.set(k, v.toString()))
        return this
    }

    withOptions(options: Partial<AllQueryOptions>) {
        Object.entries(options).forEach(([k, v]) => {
            this.url.searchParams.set(k, (typeof v == "number" ? v.toString() : v ))
        })
        return this
    }

    URL() {
        return this.url
    }
}

type AllQueryOptions = {
    address: Hexish
    action: EtherscanApiAction
    module: EtherscanApiModule
} & EtherscanApiPaginationOptions & EtherscanApiSortOptions

// const qb = new QueryBuilder(new URL("")).withOptions({ action: "balance", page: 1  })