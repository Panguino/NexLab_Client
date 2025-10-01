import { getPageBlocks } from '@/apollo/strapi/getPageBlocks'
import { PageBlocks } from '@/components/blocks/PageBlocks/PageBlocks'

const Page = async () => {
	const blocks = await getPageBlocks('ckghhnu7ljd0lzp1c64zu9dc')
	return <PageBlocks blocks={blocks} />
}

export default Page
