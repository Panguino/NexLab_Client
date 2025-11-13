/**
 * AnimatorMapMachine - Deck.gl-based map animation component
 * Exports all components, types, and utilities
 */

// Components
export { AnimatorMapMachine } from './AnimatorMapMachine'

// Types
export type {
	DeckglLayerConfig,
	IAnimatorMapMachineProps,
	IMapProvider,
	MapFrame,
	MapOverlay,
	MapProviderConfig,
	MapViewState,
	RegionConfig,
	RegionType,
	StaticMapData,
} from './types'

// Providers
export { DeckglProvider } from './providers/DeckglProvider'
export { MapProvider, createMapProvider } from './providers/MapProvider'

// Utilities
export {
	REGION_CONFIGS,
	constrainViewStateToBounds,
	getAvailableRegions,
	getInitialViewState,
	getRegionBounds,
	getRegionConfig,
	getRegionLabel,
	isWithinBounds,
} from './utils/projections'
