// src/components/ProductInfo/ProductInfo.stories.tsx
import { Meta, StoryFn } from '@storybook/react'
import ProductInfo from './ProductInfo'

export default {
	title: 'Components/ProductInfo',
	component: ProductInfo,
} as Meta

const productInfoContent = (
	<div>
		<h2>Product Name</h2>
		<p>Band Type: XYZ</p>
	</div>
)

const productImage = 'https://via.placeholder.com/150'

const productDescription = (
	<div>
		<p>This is a detailed description of the product.</p>
	</div>
)

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
