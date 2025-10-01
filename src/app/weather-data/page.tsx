import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('ff57k1ui0d22pdtolm7vmu4h')
	return <PageBlocks blocks={blocks} />
}

export default Page
