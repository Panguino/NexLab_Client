'use client'
import React from 'react'
import styles from './HazardsPanel.module.scss'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import ColorSquare from './ColorSquare/ColorSquare'
import { useRootStore } from '@/store/useRootStore'
import { HAZARD_LEVELS, HAZARD_LEVEL_NAMES, HAZARD_TYPES, HAZARD_TYPE_NAMES, HAZARD_COLORS } from '@/data/hazardMapVars'

const HazardsPanel = ({ basepath }) => {
	const hazardTotals = useRootStore.use.hazardTotals()
	const selectedRegion = useRootStore.use.selectedRegion()
	const setSelectedRegion = useRootStore.use.setSelectedRegion()

	return (
		<>
			<SidebarSectionHeader name="Hazards" linkUrl={basepath} />
			<SidebarPanelPad>
				<div className={styles.regionSelector}>
					<select
						value={selectedRegion}
						onChange={(e) => {
							setSelectedRegion(e.target.value)
						}}
					>
						<option value="conus">Continental US</option>
						<option value="ak">Alaska</option>
						<option value="hi">Hawaii</option>
						<option value="gum">Guam</option>
						<option value="pr">Puerto Rico</option>
						<option value="sam">American Samoa</option>
					</select>
				</div>
				<div className={styles.HazardsPanel}>
					<div className={styles.gridItem}></div>
					{HAZARD_LEVELS.map((hazardLLevelId, index) => {
						const name = HAZARD_LEVEL_NAMES[hazardLLevelId]
						return (
							<div
								key={index}
								className={styles.gridItem}
								onMouseOver={() => {
									// if (HAZARD_LEVEL_NAMES[levelId]) {
									// 	addActiveHazard(levelId)
									// }
								}}
								onMouseOut={() => {
									// if (severity.id) {
									// 	removeActiveHazard(severity.id)
									// }
								}}
								onClick={() => {
									// hazardInfo.map((hazard) => {
									// 	toggleHazard(`${hazard.id} ${severity.id}`)
									// })
								}}
							>
								<span className={styles.rotatedTitle}>{name}</span>
							</div>
						)
					})}
					{HAZARD_TYPES.sort((a, b) => {
						return a.localeCompare(b)
					}).map((hazardTypeId, hazardIndex) => (
						<React.Fragment key={hazardIndex}>
							<div
								className={styles.gridItem}
								onMouseOver={() => {
									// if (hazard.id) {
									// 	addActiveHazard(hazard.id)
									// }
								}}
								onMouseOut={() => {
									// if (hazard.id) {
									// 	removeActiveHazard(hazard.id)
									// }
								}}
								onClick={() => {
									/*hazardType.map((severity) => {
										toggleHazard(`${hazard.id} ${severity.id}`)
									})*/
								}}
							>
								<span className={styles.rowTitle}>{HAZARD_TYPE_NAMES[hazardTypeId]}</span>
							</div>
							{HAZARD_LEVELS.map((hazardLLevelId, index) => {
								const hazardId = `${hazardTypeId} ${hazardLLevelId}`
								//const active = hazardColors[hazardId] ? true : false
								const color = HAZARD_COLORS[hazardTypeId][hazardLLevelId]
								return (
									<div
										key={index}
										className={styles.gridItem}
										onMouseOver={() => {
											// if (active) {
											// 	addActiveHazard(hazardId)
											// }
										}}
										onMouseOut={() => {
											// if (active) {
											// 	removeActiveHazard(hazardId)
											// }
										}}
										onClick={() => {
											//toggleHazard(hazardId)
										}}
									>
										<ColorSquare
											color={HAZARD_COLORS[hazardTypeId][hazardLLevelId]}
											amount={hazardTotals[hazardId]}
											opacity={1} //highlightHazard(hazardId, activeHazards, toggledHazards) ? 1 : 0.5
											active={false} //isHazardActive(hazardId, toggledHazards)
											disabled={color === undefined}
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
