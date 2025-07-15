export function findClosestValidTimeIndex(validTimes: number[], currentFrameValidTime: number): number {
	// Check if the currentFrameValidTime exists in the array
	const exactMatchIndex = validTimes.indexOf(currentFrameValidTime)

	if (exactMatchIndex >= 0) {
		// If it exists, return its index
		return exactMatchIndex
	} else {
		// Otherwise find the closest match
		const closestValidTime = validTimes.reduce((closest, current) => {
			const currentDiff = Math.abs(current - currentFrameValidTime)
			const closestDiff = Math.abs(closest - currentFrameValidTime)
			return currentDiff < closestDiff ? current : closest
		}, validTimes[0]) // Start with first timestamp as default closest

		// Return the index of the closest timestamp
		return validTimes.indexOf(closestValidTime)
	}
}
