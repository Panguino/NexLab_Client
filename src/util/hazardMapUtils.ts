export const getTitleFromFeature = (properties) => {
	if (properties) {
		if (properties.COUNTYNAME) {
			return `${properties.COUNTYNAME} county, ${properties.STATE}`
		}
		if (properties.NAME) {
			return properties.NAME
		}
	}
	return ''
}

export const isHazardActive = (hazardId, activeHazards) => {
	let hazardFound = false
	activeHazards.map((hazard) => {
		if (hazardId.includes(hazard)) {
			hazardFound = true
		}
	})
	return hazardFound
}

export const highlightHazard = (hazardId, activeHazards, toggledHazards) => {
	return (
		isHazardActive(hazardId, activeHazards) ||
		(activeHazards.length === 0 && toggledHazards.length === 0) ||
		isHazardActive(hazardId, toggledHazards)
	)
}

export const calculateHazardTotals = (hazards) => {
	const newTotals = {}
	Object.keys(hazards).forEach((key) => {
		hazards[key].alerts.forEach((alert) => {
			const { hazardInfo } = alert
			const id = `${hazardInfo.type.type} ${hazardInfo.level.level}`
			newTotals[id] = newTotals[id] ? newTotals[id] + 1 : 1
		})
	})
	console.log('newTotals', newTotals)
	return newTotals
}
