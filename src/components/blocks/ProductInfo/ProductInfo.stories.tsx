// src/components/ProductInfo/ProductInfo.stories.tsx
import { Meta, StoryFn } from '@storybook/react'
import ProductInfo from './ProductInfo'
import { infoBlob } from './testInfo'

export default {
	title: 'Components/ProductInfo',
	component: ProductInfo,
} as Meta

// const productInfoContent = (
// 	<div>
// 		<h2>Base Reflectivity</h2>
// 		<p>Abbreviation: BREF</p>
// 		<p>Units: dBz</p>
// 		<p>Tilt: 0.5deg</p>
// 		<p>
// 			More Info:{' '}
// 			<a href="https://www.noaa.gov/jetstream/reflectivity" target="_blank">
// 				NOAA
// 			</a>
// 		</p>
// 	</div>
// )
const productInfoContent = infoBlob

const productImage = 'https://climate.cod.edu/storybook/nexrad/GRB.N0B.20241125.1942.gif'

const productDescription =
	'Base reflectivity is the most basic of all NEXRAD products and can be used to illustrate some fundamental principles. Radar operates by sending out a radio wave pulse that will interact with objects and "reflect" some portion of that signal back to the radar reciever. Reflectivity, put simply is the amount of return that the radar sees at a given azimuth and range. Meteorological targets would include objects like rain, snow, and hail. However these are not the only objects that will reflect the radar signal. Among others, the radar can also see returns from non-meteorological objects such as birds, bugs, dust, terrain, buildings, and other sources of radio waves at similar frequencies. As such, raw weather radar data is characteristically noisy given how common these types of interference are. What we display is Level 3 radar data which means it has been post-processed to reduce or remove some but not all of these sorts of returns. This post-processing is unique to each radar site and may result in some "blindspots". Conversely, some non-meteorlogical returns may be omitted from this post-processing clean-up (Ex. Wind farms) to avoid a loss of data in critical areas resulting in "hotspots". All of these caveats must be taken into consideration when viewing nearly all radar data. '

const Template: StoryFn = (args) => <ProductInfo {...args} />

export const Default = Template.bind({})
Default.args = {
	info: productInfoContent,
	image: productImage,
	description: productDescription,
}

export const NoImage = Template.bind({})
NoImage.args = {
	info: productInfoContent,
	description: productDescription,
}

export const NoDescription = Template.bind({})
NoDescription.args = {
	info: productInfoContent,
	image: productImage,
}

export const Responsive = Template.bind({})
Responsive.args = {
	info: productInfoContent,
	image: productImage,
	description: productDescription,
}
Responsive.parameters = {
	viewport: {
		defaultViewport: 'responsive',
	},
}
