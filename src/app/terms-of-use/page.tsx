import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('kzosix5tygzfe8gn9cd4tez7')
	return <PageBlocks blocks={blocks} />
}

export default Page
