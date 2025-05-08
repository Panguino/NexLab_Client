import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('i04978qr874b23i5t81emlu8')
	return <PageBlocks blocks={blocks} />
}

export default Page
