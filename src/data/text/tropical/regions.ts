// basins = regions
const TROPICAL_ATLANTIC_BASIN = 'AT'
const TROPICAL_EASTERN_PACIFIC_BASIN = 'EP'
const TROPICAL_CENTRAL_PACIFIC_BASIN = 'CP'

export const TROPICAL_BASINS = {
	[TROPICAL_ATLANTIC_BASIN]: {
		name: 'Atlantic Basin',
		rotate: [57.5, -29.7],
		scale: 1.5,
	},
	[TROPICAL_EASTERN_PACIFIC_BASIN]: {
		name: 'Eastern Pacific Basin',
		rotate: [116.0, -22.5],
		scale: 1.5,
	},
	[TROPICAL_CENTRAL_PACIFIC_BASIN]: {
		name: 'Central Pacific Basin',
		rotate: [147.5, -20.3],
		scale: 1.5,
	},
}
