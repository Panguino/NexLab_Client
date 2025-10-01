import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('pxfne44c0h0nwk3xjcz3zgas')
	return <PageBlocks blocks={blocks} />
}

export default Page
