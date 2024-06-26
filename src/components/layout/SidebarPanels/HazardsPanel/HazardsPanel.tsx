'use client'
import React from 'react'
import styles from './HazardsPanel.module.scss'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import hazardColors from '@/data/hazardColors.json'
import ColorSquare from './ColorSquare/ColorSquare'
import { useRootStore } from '@/store/useRootStore'

const HazardsPanel = ({ basepath }) => {
	const activeHazard = useRootStore.use.activeHazard()
	const setActiveHazard = useRootStore.use.setActiveHazard()
	const hazardTotals = useRootStore.use.hazardTotals()
	const hazardInfo = [
		{ name: 'Fire', id: 'fire' },
		{ name: 'Winter', id: 'winter' },
		{ name: 'Marine', id: 'marine' },
		{ name: 'Tropical', id: 'tropical' },
		{ name: 'Hydro', id: 'hydrological' },
		{ name: 'Non-Precip', id: 'nonprecip' },
		{ name: 'Non-met', id: 'nonmet' },
		{ name: 'Tornado', id: 'tor' },
		{ name: 'Severe', id: 'svr' },
		{ name: 'Special', id: 'specialwx' }
	]
	const hazardType = [
		{ name: 'Statement', id: 'statement' },
		{ name: 'Watch', id: 'watch' },
		{ name: 'Advisory', id: 'advisory' },
		{ name: 'Warning', id: 'warning' }
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
								const active = hazardColors[hazardId] ? true : false
								return (
									<div
										key={index}
										className={styles.gridItem}
										onMouseOver={() => {
											if (active) {
												setActiveHazard(hazardId)
											}
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
				</div>
			</SidebarPanelPad>
		</>
	)
}

export default HazardsPanel
