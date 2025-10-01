import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('dvbejd0mgzz2g5qiqesgvooa')
	return <PageBlocks blocks={blocks} />
}

export default Page
