/**
 * Deck.gl implementation of MapProvider
 * GPU-accelerated map rendering with excellent performance
 */

import { Deck } from '@deck.gl/core'
import { GeoJsonLayer } from '@deck.gl/layers'
import { Feature, FeatureCollection } from 'geojson'
import { DeckglLayerConfig, MapProviderConfig, MapViewState } from '../types'
import { MapProvider } from './MapProvider'

/**
 * Deck.gl-based map provider
 * Provides GPU-accelerated rendering with excellent performance
 */
export class DeckglProvider extends MapProvider {
	private deck: Deck | null = null
	private layers: Map<string, any> = new Map()
	private viewStateChangeCallback: ((viewState: MapViewState) => void) | null = null

	/**
	 * Initialize Deck.gl instance
	 */
	async initialize(config: MapProviderConfig): Promise<void> {
		this.validateContainer(config.container)

		try {
			// Ensure container has proper dimensions and styling
			const container = config.container as HTMLElement

			// Ensure container has proper positioning
			if (container.style.position !== 'absolute' && container.style.position !== 'relative') {
				container.style.position = 'relative'
			}

			const rect = container.getBoundingClientRect()
			const width = rect.width || container.clientWidth || 800
			const height = rect.height || container.clientHeight || 600

			console.log(`Initializing Deck.gl with dimensions: ${width}x${height}`)

			// Create base layers (background)
			const baseLayers: any[] = [
				// Ocean background layer
				new GeoJsonLayer({
					id: 'ocean-background',
					data: {
						type: 'FeatureCollection' as const,
						features: [
							{
								type: 'Feature' as const,
								geometry: {
									type: 'Polygon' as const,
									coordinates: [
										[
											[-180, -90],
											[180, -90],
											[180, 90],
											[-180, 90],
											[-180, -90],
										],
									],
								},
								properties: {},
							},
						],
					} as any,
					filled: true,
					stroked: false,
					getFillColor: [30, 144, 255, 255], // Dodger blue for ocean
					opacity: 1,
				}),
				// Land layer with green color - will be added after initialization
			]

			// Create Deck.gl instance
			this.deck = new Deck({
				container: config.container,
				width: width,
				height: height,
				initialViewState: {
					longitude: config.initialViewState.longitude,
					latitude: config.initialViewState.latitude,
					zoom: config.initialViewState.zoom,
					pitch: config.initialViewState.pitch || 0,
					bearing: config.initialViewState.bearing || 0,
				},
				controller: true,
				layers: baseLayers,
				onViewStateChange: (viewState: any) => {
					this.updateViewState({
						longitude: viewState.viewState.longitude,
						latitude: viewState.viewState.latitude,
						zoom: viewState.viewState.zoom,
						pitch: viewState.viewState.pitch,
						bearing: viewState.viewState.bearing,
					})

					if (this.viewStateChangeCallback) {
						this.viewStateChangeCallback(this.viewState)
					}
				},
			})

			// Add land layer with states data
			try {
				const statesData = await import('@/data/d3Map/states.json').then((m) => m.default)
				const landLayer = new GeoJsonLayer({
					id: 'land-layer',
					data: statesData as any,
					filled: true,
					stroked: true,
					lineWidthMinPixels: 1,
					lineWidthMaxPixels: 2,
					getFillColor: [34, 139, 34, 255], // Forest green for land
					getLineColor: [0, 100, 0, 255], // Dark green for borders
					opacity: 1,
				})
				baseLayers.push(landLayer)
				this.deck.setProps({ layers: baseLayers })
			} catch (error) {
				console.warn('Failed to load states data for land layer:', error)
			}

			console.log('Deck.gl provider initialized successfully')
		} catch (error) {
			console.error('Failed to initialize Deck.gl provider:', error)
			throw error
		}
	}

	/**
	 * Add a layer to the map
	 */
	addLayer(layerId: string, layerConfig: DeckglLayerConfig): void {
		if (!this.deck) {
			throw new Error('Deck.gl not initialized')
		}

		try {
			// Create layer based on type
			let layer: any

			if (layerConfig.type === 'GeoJsonLayer') {
				layer = new GeoJsonLayer({
					id: layerId,
					data: layerConfig.data,
					stroked: true,
					filled: true,
					lineWidthMinPixels: layerConfig.lineWidthMinPixels || 1,
					lineWidthMaxPixels: layerConfig.lineWidthMaxPixels || 10,
					getLineColor: layerConfig.getLineColor || [0, 0, 0, 255],
					getFillColor: layerConfig.getFillColor || [200, 200, 200, 128],
					opacity: layerConfig.opacity || 1,
					...layerConfig,
				})
			} else {
				// For other layer types, pass through the config
				layer = {
					id: layerId,
					...layerConfig,
				}
			}

			this.layers.set(layerId, layer)
			this.updateDeckLayers()
		} catch (error) {
			console.error(`Failed to add layer ${layerId}:`, error)
			throw error
		}
	}

	/**
	 * Remove a layer from the map
	 */
	removeLayer(layerId: string): void {
		if (this.layers.has(layerId)) {
			this.layers.delete(layerId)
			this.updateDeckLayers()
		}
	}

	/**
	 * Update an existing layer
	 */
	updateLayer(layerId: string, layerConfig: DeckglLayerConfig): void {
		if (this.layers.has(layerId)) {
			this.removeLayer(layerId)
			this.addLayer(layerId, layerConfig)
		}
	}

	/**
	 * Set opacity for a layer
	 */
	setOpacity(layerId: string, opacity: number): void {
		const layer = this.layers.get(layerId)
		if (layer) {
			layer.opacity = opacity
			this.updateDeckLayers()
		}
	}

	/**
	 * Update data for a layer
	 */
	updateData(layerId: string, data: FeatureCollection | Feature[]): void {
		const layer = this.layers.get(layerId)
		if (layer) {
			layer.data = data
			this.updateDeckLayers()
		}
	}

	/**
	 * Set the view state
	 */
	setViewState(viewState: MapViewState): void {
		if (!this.deck) {
			throw new Error('Deck.gl not initialized')
		}

		this.updateViewState(viewState)
		this.deck.setProps({
			initialViewState: {
				longitude: viewState.longitude,
				latitude: viewState.latitude,
				zoom: viewState.zoom,
				pitch: viewState.pitch || 0,
				bearing: viewState.bearing || 0,
			},
		})
	}

	/**
	 * Update Deck.gl layers
	 */
	private updateDeckLayers(): void {
		if (!this.deck) return

		const layersArray = Array.from(this.layers.values())
		this.deck.setProps({ layers: layersArray })
	}

	/**
	 * Set view state change callback
	 */
	setViewStateChangeCallback(callback: (viewState: MapViewState) => void): void {
		this.viewStateChangeCallback = callback
	}

	/**
	 * Cleanup and destroy
	 */
	destroy(): void {
		if (this.deck) {
			this.deck.finalize()
			this.deck = null
		}
		this.layers.clear()
		this.viewStateChangeCallback = null
	}
}
