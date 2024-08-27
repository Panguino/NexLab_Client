export const celsiusToFahrenheit = (celsius) => {
	return ((celsius * 9) / 5 + 32).toFixed(0)
}
export const kphToMph = (kph) => {
	return (kph * 0.621371).toFixed(0)
}
export const getCompassDirection = (degree) => {
	const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']
	const index = Math.round(degree / 22.5)
	return directions[index % 16]
}
