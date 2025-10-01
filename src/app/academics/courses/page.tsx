import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('h653ecrynsz9ztepbboavqdq')
	return <PageBlocks blocks={blocks} />
}

export default Page
