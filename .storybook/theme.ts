import { create } from '@storybook/theming/create'
const logoText = require('../public/img/logo-text.svg') as string

export default create({
	base: 'dark',
	brandTitle: 'NexLab React Component Storybook',
	brandImage: logoText,
	brandTarget: '_blank',
})
