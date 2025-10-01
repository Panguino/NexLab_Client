import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('ndy9pmo5lbo62tz0f65lleve')
	return <PageBlocks blocks={blocks} />
}

export default Page
