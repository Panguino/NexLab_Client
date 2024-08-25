import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@chromatic-com/storybook'
    ],
    framework: '@storybook/nextjs',

    docs: {},

    core: {
		disableTelemetry: true,
	},

    typescript: {
        reactDocgen: 'react-docgen-typescript'
    }
}

export default config
