/**
 * Mock map data for Animator stories
 * Simulates hurricane track data with GeoJSON format
 */

export interface MapFrame {
	id: string
	timestamp: string
	data: GeoJSON.FeatureCollection
}

/**
 * Mock hurricane track data - simulates Hurricane Irma's path
 * Each frame represents a 12-hour interval
 */
export const mockHurricaneTrackFrames: MapFrame[] = [
	{
		id: 'frame-1',
		timestamp: '2017-09-05T00:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-30, 15],
					},
					properties: {
						name: 'Hurricane Irma',
						intensity: 85,
						pressure: 980,
						windSpeed: 100,
					},
				},
			],
		},
	},
	{
		id: 'frame-2',
		timestamp: '2017-09-05T12:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-35, 18],
					},
					properties: {
						name: 'Hurricane Irma',
						intensity: 95,
						pressure: 970,
						windSpeed: 115,
					},
				},
			],
		},
	},
	{
		id: 'frame-3',
		timestamp: '2017-09-06T00:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-40, 21],
					},
					properties: {
						name: 'Hurricane Irma',
						intensity: 110,
						pressure: 950,
						windSpeed: 135,
					},
				},
			],
		},
	},
	{
		id: 'frame-4',
		timestamp: '2017-09-06T12:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-45, 24],
					},
					properties: {
						name: 'Hurricane Irma',
						intensity: 120,
						pressure: 935,
						windSpeed: 150,
					},
				},
			],
		},
	},
	{
		id: 'frame-5',
		timestamp: '2017-09-07T00:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-50, 27],
					},
					properties: {
						name: 'Hurricane Irma',
						intensity: 125,
						pressure: 930,
						windSpeed: 160,
					},
				},
			],
		},
	},
	{
		id: 'frame-6',
		timestamp: '2017-09-07T12:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-55, 30],
					},
					properties: {
						name: 'Hurricane Irma',
						intensity: 125,
						pressure: 930,
						windSpeed: 160,
					},
				},
			],
		},
	},
	{
		id: 'frame-7',
		timestamp: '2017-09-08T00:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-60, 33],
					},
					properties: {
						name: 'Hurricane Irma',
						intensity: 120,
						pressure: 935,
						windSpeed: 150,
					},
				},
			],
		},
	},
	{
		id: 'frame-8',
		timestamp: '2017-09-08T12:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-65, 36],
					},
					properties: {
						name: 'Hurricane Irma',
						intensity: 110,
						pressure: 950,
						windSpeed: 135,
					},
				},
			],
		},
	},
	{
		id: 'frame-9',
		timestamp: '2017-09-09T00:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-70, 39],
					},
					properties: {
						name: 'Hurricane Irma',
						intensity: 95,
						pressure: 970,
						windSpeed: 115,
					},
				},
			],
		},
	},
	{
		id: 'frame-10',
		timestamp: '2017-09-09T12:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-75, 42],
					},
					properties: {
						name: 'Hurricane Irma',
						intensity: 75,
						pressure: 990,
						windSpeed: 90,
					},
				},
			],
		},
	},
]

/**
 * Mock data for testing different regions
 */
export const mockAlaskaFrames: MapFrame[] = [
	{
		id: 'alaska-frame-1',
		timestamp: '2017-09-05T00:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-160, 65],
					},
					properties: {
						name: 'Storm System',
						intensity: 50,
						pressure: 1000,
					},
				},
			],
		},
	},
	{
		id: 'alaska-frame-2',
		timestamp: '2017-09-05T12:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-155, 63],
					},
					properties: {
						name: 'Storm System',
						intensity: 55,
						pressure: 995,
					},
				},
			],
		},
	},
]

/**
 * Mock data for Hawaii region
 */
export const mockHawaiiFrames: MapFrame[] = [
	{
		id: 'hawaii-frame-1',
		timestamp: '2017-09-05T00:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-157, 21],
					},
					properties: {
						name: 'Tropical System',
						intensity: 40,
						pressure: 1005,
					},
				},
			],
		},
	},
	{
		id: 'hawaii-frame-2',
		timestamp: '2017-09-05T12:00:00Z',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-156, 20],
					},
					properties: {
						name: 'Tropical System',
						intensity: 45,
						pressure: 1000,
					},
				},
			],
		},
	},
]
