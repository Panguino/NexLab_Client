import type { CodegenConfig } from '@graphql-codegen/cli'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_API_URL + '/graphql',
	documents: ['src/apollo/strapi/**/*.{ts,tsx}'],
	overwrite: true,
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		'./src/gql/generated/graphqlStrapi.tsx': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
		},
	},
	hooks: { afterAllFileWrite: ['prettier --write'] },
}

export default config
