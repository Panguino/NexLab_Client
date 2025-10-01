import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('di4ev1cpcsf2atkxv3cxph5r')
	return <PageBlocks blocks={blocks} />
}

export default Page
