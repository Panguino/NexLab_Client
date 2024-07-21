'use client'
import React from 'react'
import styles from './HazardsPanel.module.scss'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import ColorSquare from './ColorSquare/ColorSquare'
import { useRootStore } from '@/store/useRootStore'
import { HAZARD_LEVELS, HAZARD_LEVEL_NAMES, HAZARD_TYPES, HAZARD_TYPE_NAMES, HAZARD_COLORS } from '@/data/hazardMapVars'
import Select from '@/components/elements/Select/Select'

const HazardsPanel = ({ basepath }) => {
	const hazardTotals = useRootStore.use.hazardTotals()
	const selectedRegion = useRootStore.use.selectedRegion()
	const setSelectedRegion = useRootStore.use.setSelectedRegion()
	//
	const activeHazardTypes = useRootStore.use.activeHazardTypes()
	const addActiveHazardType = useRootStore.use.addActiveHazardType()
	const removeActiveHazardType = useRootStore.use.removeActiveHazardType()
	const activeHazardLevels = useRootStore.use.activeHazardLevels()
	const addActiveHazardLevel = useRootStore.use.addActiveHazardLevel()
	const removeActiveHazardLevel = useRootStore.use.removeActiveHazardLevel()
	const activeHazards = useRootStore.use.activeHazards()
	const addActiveHazard = useRootStore.use.addActiveHazard()
	const removeActiveHazard = useRootStore.use.removeActiveHazard()
	const isHazardActive = useRootStore.use.isHazardActive()
	// needs to re-render when these things change.
	activeHazards
	activeHazardLevels
	activeHazardTypes
	//
	const toggledHazards = useRootStore.use.toggledHazards()
	const toggleHazard = useRootStore.use.toggleHazard()
	const toggledHazardRows = useRootStore.use.toggledHazardRows()
	const toggleHazardRow = useRootStore.use.toggleHazardRow()
	const toggledHazardColumns = useRootStore.use.toggledHazardColumns()
	const toggleHazardColumn = useRootStore.use.toggleHazardColumn()
	const isHazardToggled = useRootStore.use.isHazardToggled()
	// needs to re-render when these things change.
	toggledHazards
	toggledHazardRows
	toggledHazardColumns

	const regions = [
		{ value: 'conus', label: 'Continental US' },
		{ value: 'ak', label: 'Alaska' },
		{ value: 'hi', label: 'Hawaii' },
		{ value: 'gum', label: 'Guam' },
		{ value: 'pr', label: 'Puerto Rico' },
		{ value: 'sam', label: 'American Samoa' }
	]

	return (
		<>
			<SidebarSectionHeader name="Hazards" linkUrl={basepath} />
			<SidebarPanelPad>
				<div className={styles.regionSelector}>
					<Select value={selectedRegion} options={regions} onChange={setSelectedRegion} placeholder={'Select Region'} />
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
									addActiveHazardLevel(hazardLLevelId)
								}}
								onMouseOut={() => {
									removeActiveHazardLevel(hazardLLevelId)
								}}
								onClick={() => {
									toggleHazardColumn(hazardLLevelId)
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
									addActiveHazardType(hazardTypeId)
								}}
								onMouseOut={() => {
									removeActiveHazardType(hazardTypeId)
								}}
								onClick={() => {
									toggleHazardRow(hazardTypeId)
								}}
							>
								<span className={styles.rowTitle}>{HAZARD_TYPE_NAMES[hazardTypeId]}</span>
							</div>
							{HAZARD_LEVELS.map((hazardLevelId, index) => {
								const hazardId = `${hazardTypeId} ${hazardLevelId}`
								const hasAlerts = hazardTotals[hazardId] > 0 ? true : false
								const hovered = isHazardActive(hazardTypeId, hazardLevelId)
								const toggled = isHazardToggled(hazardTypeId, hazardLevelId)
								const color = HAZARD_COLORS[hazardTypeId][hazardLevelId]
								return (
									<div
										key={index}
										className={styles.gridItem}
										onMouseOver={() => {
											if (hasAlerts) {
												addActiveHazard(hazardId)
											}
										}}
										onMouseOut={() => {
											if (hasAlerts) {
												removeActiveHazard(hazardId)
											}
										}}
										onClick={() => {
											if (hasAlerts) {
												toggleHazard(hazardId)
											}
										}}
									>
										<ColorSquare
											color={color}
											amount={hazardTotals[hazardId]}
											opacity={hovered ? 1 : 0.3}
											active={toggled && hasAlerts}
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
