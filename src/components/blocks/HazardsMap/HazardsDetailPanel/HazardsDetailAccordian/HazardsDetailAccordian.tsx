import { motion, AnimatePresence } from 'framer-motion'
import moment from 'moment'
import styles from './HazardsDetailAccordian.module.scss'
import hazardColors from '@/data/hazardColors.json'
import getAlertIdByEvent from '@/util/getAlertIdByEvent'
import { getAlertTitleFromAlertFeature } from '@/util/hazardMapUtils'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'

const HazardsDetailAccordian = ({ index, isOpen, setSelectedAlert, alert }) => {
	const title = getAlertTitleFromAlertFeature(alert)
	const { ends, event, description } = alert.properties
	const hazardColor = `rgb(${hazardColors[getAlertIdByEvent(event)]})`

	return (
		<>
			<div className={styles.header} onClick={() => setSelectedAlert(index)}>
				<span className={styles.colorSquare} style={{ backgroundColor: hazardColor }} />
				{title} -<span className={styles.ends}>Expires {moment(ends).calendar()}</span>
			</div>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						className={styles.contentWrapper}
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: 1000 },
							collapsed: { opacity: 0, height: 0 }
						}}
						transition={{ duration: 0.4 }}
					>
						<ScrollArea>
							<div className={styles.content} dangerouslySetInnerHTML={{ __html: description.split('\n').join('<br />') }} />
						</ScrollArea>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default HazardsDetailAccordian
