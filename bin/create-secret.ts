#!/usr/bin/env node

import { createSecret, putSecretValue } from "ts-core"

import yargs from "yargs"

export const main = async (args: string[]) => {
    const argv = yargs
        .option("name", {
            alias: "n",
            describe: "The name of the secret"
        })
        .option("value", {
            alias: "v",
            describe: "The value of the secret"
        })
        .demandOption(["name", "value"], "Secret name and value are both required")
        .parse(args)
    const createSecretRes = await createSecret({
        name: argv.name as string
    })
    const putSecretValueRes = await putSecretValue({
        secretArn: createSecretRes.arn,
        secretValue: argv.value as string
    })
    console.log({ putSecretValueRes })
}
;(async () => main(process.argv))()
