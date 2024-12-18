import { z } from "zod"
import { config as dotenvx } from "@dotenvx/dotenvx";

export function LoadEnv(env: any = process.env) {
    dotenvx()
    return envSchema.parse(env)
}

const envSchema = z.object({
    ETHERSCAN_API_KEY: z.string()
})

export type Config = Environment
type Environment = z.infer<typeof envSchema>