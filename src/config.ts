import { envValidator } from '@validators/env.ts'
import { EnvVars } from '@types'
import { config } from '@deps'

const envVars = envValidator.parse(await config({ export: true }))

export const getEnv = <T extends keyof EnvVars>(env: T) => envVars[env] as EnvVars[T]
