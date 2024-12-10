// src/components/ProductInfo/ProductInfo.stories.tsx
import { Meta, StoryFn } from '@storybook/react'
import ProductInfo from './ProductInfo'
import { descriptionBlob, infoBlob } from './testInfo'

export default {
	title: 'Components/ProductInfo',
	component: ProductInfo,
} as Meta

const productInfoContent = infoBlob

const productImage = 'https://climate.cod.edu/storybook/logo/missing.png'

const productDescription = descriptionBlob

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
