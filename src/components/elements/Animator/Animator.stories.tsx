import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { Animator } from './Animator'

const meta: Meta<typeof Animator> = {
	title: 'Components/Animator',
	component: Animator,
	argTypes: {
		frames: { control: false },
	},
	decorators: [(Story) => <Providers>{Story()}</Providers>],
}

export default meta

const TemplateFactory = () => {
	const Template: StoryFn<typeof Animator> = ({ frames }) => {
		return <Animator frames={frames} />
	}
	return Template
}

export const simpleAutoPlay: StoryFn<typeof Animator> = TemplateFactory()
simpleAutoPlay.args = {
	frames: [
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1144.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1151.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1158.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1205.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1212.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1219.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1227.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1234.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1241.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1248.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1255.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1302.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1309.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1316.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1323.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1330.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1337.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1345.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1352.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1358.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1405.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1412.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1419.gif',
		'https://weather.cod.edu/cdata/nexrad/LOT/N0B/LOT.N0B.20241028.1426.gif',
	],
}
