import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('sq7y0txo5tylin3qjyd4fiaz')
	return <PageBlocks blocks={blocks} />
}

export default Page
