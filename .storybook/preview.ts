import type { Preview } from '@storybook/react'
import '../src/styles/global.scss'

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: ['Introduction', 'Components'],
				method: 'alphabetical',
			},
		},
		backgrounds: {
			default: 'Nexlab Black',
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
					name: 'Nexlab Black',
					value: 'var(--color-white-grey19)',
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
		darkMode: {
			darkClass: 'dark',
			lightClass: 'light',
			classTarget: 'html',
			stylePreview: true,
		},
	},
	tags: ['autodocs', 'autodocs'],
}

export default preview
