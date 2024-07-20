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

export const getAlertTitleFromAlertFeature = (alertFeature) => {
	if (alertFeature && alertFeature.properties) {
		return alertFeature.properties.event
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
