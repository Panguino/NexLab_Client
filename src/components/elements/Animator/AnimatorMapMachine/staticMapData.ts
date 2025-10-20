/**
 * Static map data for Storybook stories and testing
 * Contains sample GeoJSON data for US states, counties, and hurricane paths
 */

import { MapFrame, StaticMapData } from './types'
import { FeatureCollection } from 'geojson'

/**
 * Simplified US States GeoJSON for demo purposes
 * This is a minimal version - in production, use the full states.json from src/data/d3Map/
 */
export const SAMPLE_STATES_GEOJSON: FeatureCollection = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: { id: '06000', name: 'California' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-124.482003, 42.009517],
						[-120.038202, 41.942745],
						[-119.999999, 38.994746],
						[-118.69541, 34.418165],
						[-117.127997, 32.534994],
						[-114.131211, 32.708946],
						[-114.717998, 34.565443],
						[-114.888701, 35.001035],
						[-117.126437, 37.002075],
						[-119.999999, 38.994746],
						[-120.038202, 41.942745],
						[-124.482003, 42.009517],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { id: '48000', name: 'Texas' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-93.507, 29.63],
						[-93.507, 36.5],
						[-102.042, 36.5],
						[-106.645, 31.783],
						[-106.645, 26.984],
						[-97.438, 26.984],
						[-93.507, 29.63],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { id: '12000', name: 'Florida' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-87.359296, 30.274670],
						[-87.359296, 29.696737],
						[-85.605165, 29.696737],
						[-80.751665, 25.130622],
						[-80.751665, 24.523096],
						[-81.761963, 24.523096],
						[-87.359296, 30.274670],
					],
				],
			},
		},
	],
}

/**
 * Simplified US Counties GeoJSON for demo purposes
 * This is a minimal version with just a few sample counties
 */
export const SAMPLE_COUNTIES_GEOJSON: FeatureCollection = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: { id: '06001', name: 'Alameda County', state: 'CA' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-122.52, 37.92],
						[-122.52, 37.45],
						[-121.47, 37.45],
						[-121.47, 37.92],
						[-122.52, 37.92],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { id: '48001', name: 'Anderson County', state: 'TX' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-95.5, 31.8],
						[-95.5, 31.2],
						[-94.8, 31.2],
						[-94.8, 31.8],
						[-95.5, 31.8],
					],
				],
			},
		},
		{
			type: 'Feature',
			properties: { id: '12001', name: 'Alachua County', state: 'FL' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-82.5, 29.8],
						[-82.5, 29.2],
						[-81.8, 29.2],
						[-81.8, 29.8],
						[-82.5, 29.8],
					],
				],
			},
		},
	],
}

/**
 * Sample hurricane path data
 * Creates 5 frames showing a hurricane path moving from the Atlantic toward Florida
 */
export const SAMPLE_HURRICANE_PATHS: MapFrame[] = [
	{
		id: 'frame-001',
		timestamp: new Date('2024-09-01T00:00:00Z'),
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: { windSpeed: 75, category: 1, pressure: 980 },
					geometry: {
						type: 'LineString',
						coordinates: [
							[-60, 20],
							[-62, 22],
						],
					},
				},
			],
		},
		overlays: [
			{
				id: 'states',
				type: 'polygon',
				data: SAMPLE_STATES_GEOJSON,
				style: {
					fill: '#e8e8e8',
					stroke: '#333333',
					strokeWidth: 1,
					opacity: 0.7,
				},
				opacity: 0.7,
				visible: true,
			},
		],
		metadata: {
			windSpeed: 75,
			category: 1,
			pressure: 980,
		},
	},
	{
		id: 'frame-002',
		timestamp: new Date('2024-09-01T06:00:00Z'),
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: { windSpeed: 85, category: 1, pressure: 975 },
					geometry: {
						type: 'LineString',
						coordinates: [
							[-60, 20],
							[-62, 22],
							[-64, 24],
						],
					},
				},
			],
		},
		overlays: [
			{
				id: 'states',
				type: 'polygon',
				data: SAMPLE_STATES_GEOJSON,
				style: {
					fill: '#e8e8e8',
					stroke: '#333333',
					strokeWidth: 1,
					opacity: 0.7,
				},
				opacity: 0.7,
				visible: true,
			},
		],
		metadata: {
			windSpeed: 85,
			category: 1,
			pressure: 975,
		},
	},
	{
		id: 'frame-003',
		timestamp: new Date('2024-09-01T12:00:00Z'),
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: { windSpeed: 95, category: 2, pressure: 970 },
					geometry: {
						type: 'LineString',
						coordinates: [
							[-60, 20],
							[-62, 22],
							[-64, 24],
							[-66, 26],
						],
					},
				},
			],
		},
		overlays: [
			{
				id: 'states',
				type: 'polygon',
				data: SAMPLE_STATES_GEOJSON,
				style: {
					fill: '#e8e8e8',
					stroke: '#333333',
					strokeWidth: 1,
					opacity: 0.7,
				},
				opacity: 0.7,
				visible: true,
			},
		],
		metadata: {
			windSpeed: 95,
			category: 2,
			pressure: 970,
		},
	},
	{
		id: 'frame-004',
		timestamp: new Date('2024-09-01T18:00:00Z'),
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: { windSpeed: 105, category: 3, pressure: 960 },
					geometry: {
						type: 'LineString',
						coordinates: [
							[-60, 20],
							[-62, 22],
							[-64, 24],
							[-66, 26],
							[-78, 28],
						],
					},
				},
			],
		},
		overlays: [
			{
				id: 'states',
				type: 'polygon',
				data: SAMPLE_STATES_GEOJSON,
				style: {
					fill: '#e8e8e8',
					stroke: '#333333',
					strokeWidth: 1,
					opacity: 0.7,
				},
				opacity: 0.7,
				visible: true,
			},
		],
		metadata: {
			windSpeed: 105,
			category: 3,
			pressure: 960,
		},
	},
	{
		id: 'frame-005',
		timestamp: new Date('2024-09-02T00:00:00Z'),
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: { windSpeed: 85, category: 2, pressure: 975 },
					geometry: {
						type: 'LineString',
						coordinates: [
							[-60, 20],
							[-62, 22],
							[-64, 24],
							[-66, 26],
							[-78, 28],
							[-81, 27],
						],
					},
				},
			],
		},
		overlays: [
			{
				id: 'states',
				type: 'polygon',
				data: SAMPLE_STATES_GEOJSON,
				style: {
					fill: '#e8e8e8',
					stroke: '#333333',
					strokeWidth: 1,
					opacity: 0.7,
				},
				opacity: 0.7,
				visible: true,
			},
		],
		metadata: {
			windSpeed: 85,
			category: 2,
			pressure: 975,
		},
	},
]

/**
 * Complete static map data for stories
 */
export const STATIC_MAP_DATA: StaticMapData = {
	counties: SAMPLE_COUNTIES_GEOJSON,
	states: SAMPLE_STATES_GEOJSON,
	hurricanePaths: SAMPLE_HURRICANE_PATHS,
}

