import type { CodegenConfig } from '@graphql-codegen/cli'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_DATA_API_URL + '/graphql',
	documents: ['src/apollo/data/**/*.{ts,tsx}'],
	overwrite: true,
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		'./src/gql/generated/graphql.tsx': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
		},
	},
	hooks: { afterAllFileWrite: ['prettier --write'] },
}

export default config
