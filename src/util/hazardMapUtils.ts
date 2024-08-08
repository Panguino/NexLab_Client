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

export const flattenAlerts = (alerts: any) => {
	const flatAlerts = new Set()
	const alertInfo = []
	alerts.map((alert: any) => {
		const alertId = `${alert.hazardInfo.type.type} ${alert.hazardInfo.level.level}`
		if (!flatAlerts.has(alertId)) {
			flatAlerts.add(`${alert.hazardInfo.type.type} ${alert.hazardInfo.level.level}`)
			alertInfo.push({
				color: alert.hazardInfo.color.HEX,
				name: `${alert.hazardInfo.type.name} ${alert.hazardInfo.level.name}`,
				id: `${alert.hazardInfo.type.type} ${alert.hazardInfo.level.level}`,
				type: alert.hazardInfo.type.type,
				level: alert.hazardInfo.level.level,
				event: alert.event
			})
		}
	})
	return alertInfo
}
