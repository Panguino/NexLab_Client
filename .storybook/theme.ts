import { create } from '@storybook/theming/create'
const logo = require('../public/img/logo-cloud.svg') as string

export default create({
	base: 'dark',
	brandTitle: 'NexLab React Component Storybook',
	brandImage: logo,
	brandTarget: '_blank',
})
