import Carrot from '@/components/elements/icons/Carrot/Carrot'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { AnimatePresence, motion } from 'framer-motion'
import moment from 'moment'
import styles from './HazardsDetailAccordian.module.scss'

const HazardsDetailAccordian = ({ index, isOpen, setSelectedAlert, alert }) => {
	const { ends, description, hazardInfo, event } = alert
	return (
		<>
			<div className={styles.header} onClick={() => setSelectedAlert(index)}>
				<span className={styles.colorSquare} style={{ backgroundColor: hazardInfo.color.HEX }} />
				<div className={styles.headerText}>
					<h4>{event}</h4>
					<span className={styles.ends}>Expires {ends ? moment(ends).calendar() : ' N/A'}</span>
				</div>
				<motion.div className={styles.openToggleCarrot} animate={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}>
					<Carrot />
				</motion.div>
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
							collapsed: { opacity: 0, height: 0 },
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
