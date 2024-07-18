export const getTitleFromFeature = (feature) => {
	if (feature && feature.properties) {
		if (feature.properties.COUNTYNAME) {
			return `${feature.properties.COUNTYNAME} county, ${feature.properties.STATE}`
		}
		if (feature.properties.NAME) {
			return feature.properties.NAME
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
