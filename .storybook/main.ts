import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@chromatic-com/storybook',
		'storybook-dark-mode',
	],
	staticDirs: ['../public'],
	framework: '@storybook/nextjs',

	docs: {},

	core: {
		disableTelemetry: true,
	},

	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},

	webpackFinal: async (config) => {
		// Alias server-only modules to Storybook-safe stubs
		config.resolve = config.resolve || {}
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			// Force all imports of server-only to a no-op stub so RSC-only packages don't throw in the browser
			'server-only': path.resolve(__dirname, './server-only-stub.js'),
			// Prefer a Storybook-safe Apollo client when code tries to import our app client
			'@/apollo/apollo-client': path.resolve(__dirname, '../src/apollo/apollo-client.storybook.ts'),
			// Use the view-only FaqsBlock that doesn't fetch on the server in Storybook
			'@/components/blocks/PageBlocks/FaqsBlock/FaqsBlock': path.resolve(
				__dirname,
				'../src/components/blocks/PageBlocks/FaqsBlock/FaqsBlock.storybook.tsx',
			),
		}
		return config
	},
}

export default config
