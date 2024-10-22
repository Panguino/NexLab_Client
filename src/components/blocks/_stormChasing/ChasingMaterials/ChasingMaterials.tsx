import { Accordian } from '@/components/elements/Accordian/Accordian'
import { LinkAccordianItem } from '@/components/elements/LinkAccordianItem/LinkAccordianItem'
import { RichText } from '@/components/elements/RichText/RichText'
import { RootNode } from '@strapi/blocks-react-renderer/dist/BlocksRenderer'
import styles from './ChasingMaterials.module.scss'

type Material = {
	id: string
	name: string
	file: string
	link: string
}
type MaterialsGroup = {
	id: string
	name: string
	materials: Material[]
}

interface IChasingMaterials {
	title: string
	body: RootNode[]
	leftGroupTitle: string
	rightGroupTitle: string
	leftGroupMaterials: MaterialsGroup[]
	rightGroupMaterials: MaterialsGroup[]
}

export const ChasingMaterials = ({ title, body, leftGroupTitle, leftGroupMaterials, rightGroupTitle, rightGroupMaterials }: IChasingMaterials) => {
	return (
		<div className={styles.chasingMaterials}>
			<div className={styles.intro}>
				<h1>{title}</h1>
				<RichText text={body} />
			</div>
			<div className={styles.materialColumns}>
				<div className={styles.materialColumn}>
					<h2>{leftGroupTitle}</h2>
					{leftGroupMaterials.map((group) => (
						<Accordian key={group.id} title={group.name}>
							{group.materials.map((material) => (
								<LinkAccordianItem key={material.id} name={material.name} link={material.link} file={material.file} />
							))}
						</Accordian>
					))}
				</div>
				<div className={styles.materialColumn}>
					<h2>{rightGroupTitle}</h2>
					{rightGroupMaterials.map((group) => (
						<Accordian key={group.id} title={group.name}>
							{group.materials.map((material) => (
								<LinkAccordianItem key={material.id} name={material.name} link={material.link} file={material.file} />
							))}
						</Accordian>
					))}
				</div>
			</div>
		</div>
	)
}
