/**
 * Abstract interface for map provider implementations
 * Allows swapping between different map rendering backends (Deck.gl, Canvas-D3, Mapbox)
 */

import { IMapProvider, MapProviderConfig, MapViewState, DeckglLayerConfig } from '../types'
import { FeatureCollection, Feature } from 'geojson'

/**
 * Base class for map provider implementations
 * Provides common interface for all map rendering backends
 */
export abstract class MapProvider implements IMapProvider {
	protected container: HTMLElement | null = null
	protected viewState: MapViewState = {
		longitude: -95,
		latitude: 37,
		zoom: 3,
	}

	/**
	 * Initialize the map provider
	 */
	abstract initialize(config: MapProviderConfig): Promise<void>

	/**
	 * Add a layer to the map
	 */
	abstract addLayer(layerId: string, layer: DeckglLayerConfig): void

	/**
	 * Remove a layer from the map
	 */
	abstract removeLayer(layerId: string): void

	/**
	 * Update an existing layer
	 */
	abstract updateLayer(layerId: string, layer: DeckglLayerConfig): void

	/**
	 * Set opacity for a layer
	 */
	abstract setOpacity(layerId: string, opacity: number): void

	/**
	 * Update data for a layer
	 */
	abstract updateData(layerId: string, data: FeatureCollection | Feature[]): void

	/**
	 * Set the view state (zoom, pan, etc.)
	 */
	abstract setViewState(viewState: MapViewState): void

	/**
	 * Get the current view state
	 */
	getViewState(): MapViewState {
		return this.viewState
	}

	/**
	 * Cleanup and destroy the map
	 */
	abstract destroy(): void

	/**
	 * Helper method to validate container
	 */
	protected validateContainer(container: HTMLElement): void {
		if (!container) {
			throw new Error('Map container element is required')
		}
		this.container = container
	}

	/**
	 * Helper method to update view state
	 */
	protected updateViewState(viewState: Partial<MapViewState>): void {
		this.viewState = {
			...this.viewState,
			...viewState,
		}
	}
}

/**
 * Factory function to create map provider instances
 */
export function createMapProvider(type: 'deckgl' | 'canvas-d3' | 'mapbox'): MapProvider {
	switch (type) {
		case 'deckgl':
			// Lazy import to avoid circular dependencies
			const { DeckglProvider } = require('./DeckglProvider')
			return new DeckglProvider()
		case 'canvas-d3':
			const { CanvasD3Provider } = require('./CanvasD3Provider')
			return new CanvasD3Provider()
		case 'mapbox':
			const { MapboxProvider } = require('./MapboxProvider')
			return new MapboxProvider()
		default:
			throw new Error(`Unknown map provider type: ${type}`)
	}
}

