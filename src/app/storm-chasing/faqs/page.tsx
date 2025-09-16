import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('uyfk1etrm17cpcvdync1i87l')
	return <PageBlocks blocks={blocks} />
}

export default Page
