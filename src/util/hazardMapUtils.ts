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
	console.log('alertFeature', alertFeature)
	if (alertFeature && alertFeature.properties) {
		return alertFeature.properties.event
	}
	return ''
}
