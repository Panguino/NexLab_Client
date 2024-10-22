import { RichText } from '@/components/elements/RichText/RichText'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import { Button } from '@/components/elements/Button/Button'
import { LinkAccordianItem } from '@/components/elements/LinkAccordianItem/LinkAccordianItem'
import styles from './DegreeInfo.module.scss'

export const DegreeInfo = ({ title, buttons, body, schools }) => {
	return (
		<div className={styles.degreeInfo}>
			<div className={styles.info}>
				<h3>{title}</h3>
				<div className={styles.buttons}>
					{buttons.map(({ label, link, style, target }, index) => {
						return <Button key={index} label={label} link={link} style={style} target={target} />
					})}
				</div>
			</div>
			<div className={styles.description}>
				<RichText text={body} />
				<div className={styles.schools}>
					{schools.map(({ schoolList, schoolLinks }, index) => {
						return (
							<Accordian title={schoolList} key={index}>
								{schoolLinks.map(({ school, link }, index) => {
									return <LinkAccordianItem key={index} name={school} link={link} />
								})}
							</Accordian>
						)
					})}
				</div>
			</div>
		</div>
	)
}
