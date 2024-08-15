import { rewind } from '@turf/turf'

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

export const prepareAlertsFromAPI = (conusCountiesData: any) => {
	const alerts = {}
	conusCountiesData.data.getRegions.forEach((region) => {
		alerts[region.name] = {}
		region.states.forEach((state) => {
			state.counties.forEach((county) => {
				if (county.alerts.length != 0) {
					const shapeFeature = { type: county.type, geometry: county.geometry, properties: {} }
					alerts[region.name][county.properties.ID] = {
						shape: rewind(shapeFeature, { reverse: true }),
						alerts: county.alerts.map((alert) => {
							return alert.properties
						}),
						properties: county.properties
					}
				}
			})
		})
		region.coasts.forEach((coast) => {
			if (coast.alerts.length != 0) {
				const shapeFeature = { type: coast.type, geometry: coast.geometry, properties: {} }
				alerts[region.name][coast.properties.ID] = {
					shape: rewind(shapeFeature, { reverse: true }),
					alerts: coast.alerts.map((alert) => {
						return alert.properties
					}),
					properties: coast.properties
				}
			}
		})
		region.offshores.forEach((offshore) => {
			if (offshore.alerts.length != 0) {
				const shapeFeature = { type: offshore.type, geometry: offshore.geometry, properties: {} }
				alerts[region.name][offshore.properties.ID] = {
					shape: rewind(shapeFeature, { reverse: true }),
					alerts: offshore.alerts.map((alert) => {
						return alert.properties
					}),
					properties: offshore.properties
				}
			}
		})
	})
	return alerts
}
