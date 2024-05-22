'use client'
import React from 'react'
import styles from './HazardsPanel.module.scss'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import hazardColors from '@/data/hazardColors.json'
import ColorSquare from './ColorSquare/ColorSquare'
import useHazardsStore from '@/store/useHazardsStore'

const HazardsPanel = ({ basepath }) => {
	const { setFireActive } = useHazardsStore((state) => state)
	const hazardInfo = [
		{ name: 'Fire', id: 'fire', setActive: setFireActive },
		{ name: 'Winter', id: 'winter' },
		{ name: 'Marine', id: 'marine' },
		{ name: 'Tropical', id: 'tropical' },
		{ name: 'Hydro', id: 'hydrological' },
		{ name: 'Non-Precip', id: 'nonprecip' },
		{ name: 'Non-met', id: 'nonmet' }
	]
	const hazardType = ['Statement', 'Watch', 'Advisory', 'Warning']
	const hazardSevereType = [
		{ name: 'Severe Watch', id: 'convective watch svr' },
		{ name: 'Severe Warning', id: 'convective warning svr' },
		{ name: 'Tornado Watch', id: 'convective watch tor' },
		{ name: 'Tornado Warning', id: 'convective warning tor' }
	]
	return (
		<>
			<SidebarSectionHeader name="Hazards" linkUrl={basepath} />
			<SidebarPanelPad>
				<div className={styles.HazardsPanel}>
					<div className={styles.gridItem}></div>
					{hazardType.map((severity, index) => {
						return (
							<div key={index} className={styles.gridItem}>
								<span className={styles.rotatedTitle}>{severity}</span>
							</div>
						)
					})}
					{hazardInfo.map((hazard, hazardIndex) => (
						<React.Fragment key={hazardIndex}>
							<div
								className={styles.gridItem}
								onMouseOver={() => {
									if (hazard.setActive) {
										hazard.setActive(true)
									}
								}}
								onMouseOut={() => {
									if (hazard.setActive) {
										hazard.setActive(false)
									}
								}}
							>
								<span className={styles.rowTitle}>{hazard.name}</span>
							</div>
							{hazardType.map((severity, index) => {
								return (
									<div key={index} className={styles.gridItem}>
										<ColorSquare color={hazardColors[`${hazard.id} ${severity.toLowerCase()}`]} />
									</div>
								)
							})}
						</React.Fragment>
					))}
					<div className={`${styles.gridItem} ${styles.bigRow}`}></div>
					{hazardSevereType.map((severity, index) => {
						return (
							<div key={index} className={styles.gridItem}>
								<span className={styles.rotatedTitle}>{severity.name}</span>
							</div>
						)
					})}
					<div className={styles.gridItem}>
						<span className={styles.rowTitle}>Convective</span>
					</div>
					{hazardSevereType.map((severity, index) => {
						return (
							<div key={index} className={styles.gridItem}>
								<ColorSquare color={hazardColors[severity.id]} />
							</div>
						)
					})}
					<div className={styles.gridItem}>
						<span className={styles.rowTitle}>Special</span>
					</div>
					<div className={styles.gridItem}>
						<ColorSquare color={hazardColors['specialwx statement']} />
					</div>
				</div>
			</SidebarPanelPad>
		</>
	)
}

export default HazardsPanel
