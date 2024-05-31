'use client'
import React from 'react'
import styles from './HazardsPanel.module.scss'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import hazardColors from '@/data/hazardColors.json'
import ColorSquare from './ColorSquare/ColorSquare'
import useHazardsStore from '@/store/useHazardsStore'
import { motion } from 'framer-motion'

const HazardsPanel = ({ basepath }) => {
	const { activeHazard, setActiveHazard, hazardTotals } = useHazardsStore((state) => state)
	const hazardInfo = [
		{ name: 'Fire', id: 'fire' },
		{ name: 'Winter', id: 'winter' },
		{ name: 'Marine', id: 'marine' },
		{ name: 'Tropical', id: 'tropical' },
		{ name: 'Hydro', id: 'hydrological' },
		{ name: 'Non-Precip', id: 'nonprecip' },
		{ name: 'Non-met', id: 'nonmet' }
	]
	const hazardType = [
		{ name: 'Statement', id: 'statement' },
		{ name: 'Watch', id: 'watch' },
		{ name: 'Advisory', id: 'advisory' },
		{ name: 'Warning', id: 'warning' }
	]
	const hazardSevereType = [
		{ name: 'Severe Watch', id: 'watch svr' },
		{ name: 'Severe Warning', id: 'warning svr' },
		{ name: 'Tornado Watch', id: 'watch tor' },
		{ name: 'Tornado Warning', id: 'warning tor' }
	]
	return (
		<>
			<SidebarSectionHeader name="Hazards" linkUrl={basepath} />
			<SidebarPanelPad>
				<div className={styles.HazardsPanel}>
					<div className={styles.gridItem}></div>
					{hazardType.map((severity, index) => {
						return (
							<div
								key={index}
								className={styles.gridItem}
								onMouseOver={() => {
									if (severity.id) {
										setActiveHazard(severity.id)
									}
								}}
								onMouseOut={() => {
									setActiveHazard('')
								}}
							>
								<span className={styles.rotatedTitle}>{severity.name}</span>
							</div>
						)
					})}
					{hazardInfo.map((hazard, hazardIndex) => (
						<React.Fragment key={hazardIndex}>
							<div
								className={styles.gridItem}
								onMouseOver={() => {
									if (hazard.id) {
										setActiveHazard(hazard.id)
									}
								}}
								onMouseOut={() => {
									setActiveHazard('')
								}}
							>
								<span className={styles.rowTitle}>{hazard.name}</span>
							</div>
							{hazardType.map((severity, index) => {
								const hazardId = `${hazard.id} ${severity.id}`
								return (
									<div
										key={index}
										className={styles.gridItem}
										onMouseOver={() => {
											setActiveHazard(hazardId)
										}}
										onMouseOut={() => {
											setActiveHazard('')
										}}
									>
										<ColorSquare
											color={hazardColors[hazardId]}
											amount={hazardTotals[hazardId]}
											opacity={hazardId.includes(activeHazard) ? 1 : 0.5}
										/>
									</div>
								)
							})}
						</React.Fragment>
					))}
					<div className={`${styles.gridItem} ${styles.bigRow}`}></div>
					{hazardSevereType.map((severity, index) => {
						return (
							<motion.div key={index} className={styles.gridItem}>
								<span className={styles.rotatedTitle}>{severity.name}</span>
							</motion.div>
						)
					})}
					<div
						className={styles.gridItem}
						onMouseOver={() => {
							setActiveHazard('convective')
						}}
						onMouseOut={() => {
							setActiveHazard('')
						}}
					>
						<span className={styles.rowTitle}>Convective</span>
					</div>
					{hazardSevereType.map((severity, index) => {
						const hazardId = `convective ${severity.id}`
						return (
							<div
								key={index}
								className={styles.gridItem}
								onMouseOver={() => {
									setActiveHazard(hazardId)
								}}
								onMouseOut={() => {
									setActiveHazard('')
								}}
							>
								<ColorSquare
									color={hazardColors[hazardId]}
									amount={hazardTotals[hazardId]}
									opacity={hazardId.includes(activeHazard) ? 1 : 0.5}
								/>
							</div>
						)
					})}
					<div
						className={styles.gridItem}
						onMouseOver={() => {
							setActiveHazard('specialwx statement')
						}}
						onMouseOut={() => {
							setActiveHazard('')
						}}
					>
						<span className={styles.rowTitle}>Special</span>
					</div>
					<motion.div
						className={styles.gridItem}
						onMouseOver={() => {
							setActiveHazard('specialwx statement')
						}}
						onMouseOut={() => {
							setActiveHazard('')
						}}
					>
						<ColorSquare
							color={hazardColors['specialwx statement']}
							amount={hazardTotals['specialwx statement']}
							opacity={activeHazard === 'specialwx statement' || activeHazard === '' ? 1 : 0.5}
						/>
					</motion.div>
				</div>
			</SidebarPanelPad>
		</>
	)
}

export default HazardsPanel
