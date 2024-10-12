import { getChasingMaterials } from '@/apollo/strapi/getChasingMaterials'
import { ChasingMaterials } from '@/components/blocks/_stormChasing/ChasingMaterials/ChasingMaterials'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'

const Page = async () => {
	const { title, body, leftGroupTitle, leftGroupMaterials, rightGroupTitle, rightGroupMaterials } = await getChasingMaterials()
	return (
		<PageContentWrapper>
			<ChasingMaterials
				title={title}
				body={body}
				leftGroupTitle={leftGroupTitle}
				leftGroupMaterials={leftGroupMaterials}
				rightGroupTitle={rightGroupTitle}
				rightGroupMaterials={rightGroupMaterials}
			/>
		</PageContentWrapper>
	)
}

export default Page
