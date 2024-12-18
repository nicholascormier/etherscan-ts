import { test } from "vitest"
import { EtherscanClient } from "../src/client"
import axios from "axios"
import { LoadEnv } from "../src/env"

const { ETHERSCAN_API_KEY } = LoadEnv()

test("test client", async () => {
    const etherscan = EtherscanClient({ apiKey: ETHERSCAN_API_KEY, client: axios })
    const res = await etherscan.accounts.getBalance({ address: "0xf14c2b72c7c8821A579a578B098542eBA13D8a12" })

    console.log(res)
})