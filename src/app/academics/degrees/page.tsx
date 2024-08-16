import { getDegrees } from '@/apollo/strapi/getDegrees'
import { DegreeInfo } from '@/components/blocks/DegreeInfo/DegreeInfo'

const Page = async () => {
	const degrees = await getDegrees()
	return (
		<div>
			{degrees.map((d, index) => {
				const { Title, Buttons, Description } = d.attributes
				return <DegreeInfo key={index} Title={Title} Buttons={Buttons} Description={Description} />
			})}
		</div>
	)
}

export default Page
