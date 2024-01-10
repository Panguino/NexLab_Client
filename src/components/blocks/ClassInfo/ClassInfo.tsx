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
							<div key={index}>
								<b>{Name}</b>
								{Materials.map((Material, index) => {
									return (
										<div key={index}>
											{Material.Name} - {Material.File.data.attributes.url}
										</div>
									)
								})}
							</div>
						)
					}
				})}
			</div>
		</div>
	)
}
