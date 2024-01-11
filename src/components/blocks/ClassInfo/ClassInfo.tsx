import { LinkAccordian } from '@/components/elements/LinkAccordian/LinkAccordian'
import { LinkAccordianItem } from '@/components/elements/LinkAccordian/LinkAccordianItem/LinkAccordianItem'
import { RichText } from '@/components/elements/RichText/RichText'

import styles from './ClassInfo.module.scss'

export const ClassInfo = ({ Title, CourseID, Description, MaterialGroup }) => {
	return (
		<div className={styles.ClassInfo}>
			<div className={styles.Content}>
				<h3>Earth {CourseID}</h3>
				<h1>{Title}</h1>
				<RichText text={Description} />
			</div>
			<div className={styles.Materials}>
				{MaterialGroup.map((MaterialGroupItem, index) => {
					const { Name, Materials } = MaterialGroupItem
					// make sure materials group has items in it before displaying it
					if (Materials.length > 0) {
						return (
							<LinkAccordian key={index} title={Name}>
								{Materials.map((Material, index) => {
									const { Name, File, Link } = Material
									const url = File?.data?.attributes?.url ? File.data.attributes.url : Link
									return <LinkAccordianItem key={index} name={Name} link={url} />
								})}
							</LinkAccordian>
						)
					}
				})}
			</div>
		</div>
	)
}
