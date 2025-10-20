/**
 * AnimatorMapMachine - Deck.gl-based map animation component
 * Exports all components, types, and utilities
 */

// Components
export { AnimatorMapMachine } from './AnimatorMapMachine'

// Types
export type {
	MapFrame,
	MapOverlay,
	RegionType,
	RegionConfig,
	MapViewState,
	IAnimatorMapMachineProps,
	MapProviderConfig,
	IMapProvider,
	DeckglLayerConfig,
	StaticMapData,
} from './types'

// Providers
export { MapProvider, createMapProvider } from './providers/MapProvider'
export { DeckglProvider } from './providers/DeckglProvider'

// Utilities
export {
	REGION_CONFIGS,
	getRegionConfig,
	getInitialViewState,
	getRegionBounds,
	isWithinBounds,
	constrainViewStateToBounds,
	getAvailableRegions,
	getRegionLabel,
} from './utils/projections'

