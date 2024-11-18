import { getChasingMaterials } from '@/apollo/strapi/getChasingMaterials'
import { ChasingMaterials } from '@/components/blocks/_stormChasing/ChasingMaterials/ChasingMaterials'
import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'

const Page = async () => {
	const { title, body, leftGroupTitle, leftGroupMaterials, rightGroupTitle, rightGroupMaterials } = await getChasingMaterials()
	return (
		<ScrollArea>
			<ChasingMaterials
				title={title}
				body={body}
				leftGroupTitle={leftGroupTitle}
				leftGroupMaterials={leftGroupMaterials}
				rightGroupTitle={rightGroupTitle}
				rightGroupMaterials={rightGroupMaterials}
			/>
			<Footer />
		</ScrollArea>
	)
}

export default Page
