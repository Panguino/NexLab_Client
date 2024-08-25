import type { Preview } from '@storybook/react'

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: ['Introduction', 'Components'],
				method: 'alphabetical',
			},
		},
		backgrounds: {
			default: 'Slingshot Black',
			values: [
				{
					name: 'light',
					value: '#FFFFFF',
				},
				{
					name: 'dark',
					value: '#333333',
				},
				{
					name: 'Slingshot Black',
					value: '#000000',
				},
			],
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		docs: {
			canvas: { sourceState: 'shown' },
		},
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
}

export default preview
