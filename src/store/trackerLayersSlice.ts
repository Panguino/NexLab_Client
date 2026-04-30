import { TrackerMapLayer } from '@/types/tracker'
import { ZustandStateSlice } from './useRootStore'

export const DEFAULT_TRACKER_LAYERS: TrackerMapLayer[] = [
	{
		id: 'convective-outlook',
		label: 'Convective Outlook',
		description:
			'Categorical outlooks issued by the Storm Prediction Center (SPC) depicting areas of expected severe weather risk, ranging from Marginal to High threat levels.',
		active: false,
	},
	{
		id: 'convective-watches',
		label: 'Convective Watches',
		description:
			'Active Tornado and Severe Thunderstorm Watch polygons issued by the SPC when conditions are favorable for severe weather development in a specific area.',
		active: false,
	},
	{
		id: 'live-radar',
		label: 'Live Radar',
		description: 'Real-time composite NEXRAD radar reflectivity mosaic showing current precipitation intensity across the area.',
		active: false,
	},
	{
		id: 'spotter-reports',
		label: 'Spotter Reports',
		description: 'Real-time storm reports submitted by trained NWS spotters and the public, including tornadoes, hail, and damaging winds.',
		active: false,
	},
]

export interface ITrackerLayersSlice {
	trackerLayers: TrackerMapLayer[]
	toggleTrackerLayer: (id: string) => void
}

export const createTrackerLayersSlice: ZustandStateSlice<ITrackerLayersSlice> = (set) => ({
	trackerLayers: DEFAULT_TRACKER_LAYERS,
	toggleTrackerLayer: (id: string) =>
		set((state) => ({
			trackerLayers: state.trackerLayers.map((layer) => (layer.id === id ? { ...layer, active: !layer.active } : layer)),
		})),
})
