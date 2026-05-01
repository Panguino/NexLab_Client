'use client'

import { useRootStore } from '@/store/useRootStore'
import { SpotterNetworkReport, TrackerData } from '@/types/tracker'
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Feature from 'ol/Feature'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import View from 'ol/View'
import GeoJSON from 'ol/format/GeoJSON'
import Point from 'ol/geom/Point'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'
import { useEffect, useRef, useState } from 'react'
import styles from './TrackerMap.module.scss'

export type TrackerMapProps = {
	data: TrackerData
	convectiveOutlookData?: object | null
	spotterNetworkData?: SpotterNetworkReport[]
}

type TrackerPopupState = { type: 'team' } | { type: 'spotter'; report: SpotterNetworkReport } | null

const TEAM_LAYER_Z_INDEX = 100
const SPOTTER_NETWORK_LAYER_Z_INDEX = 90
const CONVECTIVE_LAYER_Z_INDEX = 50
const LIVE_RADAR_LAYER_Z_INDEX = 40

// DN → [strokeColor, fillColor]
const CONVECTIVE_COLORS: Record<number, [string, string]> = {
	2: ['#55bb55', 'rgba(85, 187, 85, 0.15)'], // TSTM - light green
	3: ['#006600', 'rgba(0, 102, 0, 0.15)'], // MRGL - dark green
	4: ['#dddd00', 'rgba(221, 221, 0, 0.15)'], // SLGT - yellow
	5: ['#ff8800', 'rgba(255, 136, 0, 0.15)'], // ENH - orange
	6: ['#cc0000', 'rgba(204, 0, 0, 0.15)'], // MDT - red
	8: ['#ff00cc', 'rgba(255, 0, 204, 0.15)'], // HIGH - pink/magenta
}

// DN → display label
const CONVECTIVE_LABELS: Record<number, string> = {
	2: 'General T-Storm',
	3: 'Marginal',
	4: 'Slight',
	5: 'Enhanced',
	6: 'Moderate',
	8: 'High',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getConvectiveStyle = (feature: any): Style[] => {
	const dn = feature.get('DN') as number
	const colors = CONVECTIVE_COLORS[dn] ?? CONVECTIVE_COLORS[2]
	const label = CONVECTIVE_LABELS[dn] ?? ''

	const polygonStyle = new Style({
		stroke: new Stroke({ color: colors[0], width: 2 }),
		fill: new Fill({ color: colors[1] }),
	})

	// Collect exterior rings from Polygon or MultiPolygon
	const geometry = feature.getGeometry()
	const rings: number[][][] = []
	if (geometry.getType() === 'Polygon') {
		rings.push(geometry.getCoordinates()[0])
	} else if (geometry.getType() === 'MultiPolygon') {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		geometry.getCoordinates().forEach((poly: number[][][]) => rings.push(poly[0]))
	}

	const labelStyles: Style[] = []
	rings.forEach((ring) => {
		if (ring.length < 2) return

		// Find the segment whose midpoint is most northwest:
		// In EPSG:3857 projected coords x=easting, y=northing.
		// Maximize (y − x) to prefer high latitude and low longitude.
		let bestScore = -Infinity
		let bestMid: [number, number] = [0, 0]
		let bestAngle = 0

		for (let i = 0; i < ring.length - 1; i++) {
			const a = ring[i]
			const b = ring[i + 1]
			const mid: [number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
			const score = mid[1] - mid[0]
			if (score > bestScore) {
				bestScore = score
				bestMid = mid
				let angle = Math.atan2(b[1] - a[1], b[0] - a[0])
				// Normalize so text never renders upside-down
				if (angle > Math.PI / 2) angle -= Math.PI
				if (angle < -Math.PI / 2) angle += Math.PI
				bestAngle = angle
			}
		}

		labelStyles.push(
			new Style({
				geometry: new Point(bestMid),
				text: new Text({
					text: label,
					font: 'bold 11px sans-serif',
					fill: new Fill({ color: '#ffffff' }),
					stroke: new Stroke({ color: 'rgba(0, 0, 0, 0.75)', width: 3 }),
					rotation: -bestAngle, // OL rotates CW; atan2 is CCW, so negate
					padding: [2, 4, 2, 4],
				}),
			}),
		)
	})

	return [polygonStyle, ...labelStyles]
}

const formatCoord = (val: number, pos: 'lat' | 'lon') => {
	const abs = Math.abs(val).toFixed(4)
	if (pos === 'lat') return `${abs}° ${val >= 0 ? 'N' : 'S'}`
	return `${abs}° ${val >= 0 ? 'E' : 'W'}`
}

const TrackerMap = ({ data, convectiveOutlookData, spotterNetworkData = [] }: TrackerMapProps) => {
	const mapRef = useRef<HTMLDivElement>(null)
	const popupRef = useRef<HTMLDivElement>(null)
	const mapInstanceRef = useRef<Map | null>(null)
	const teamCoordsRef = useRef<number[]>([0, 0])
	const convectiveLayerRef = useRef<VectorLayer<VectorSource> | null>(null)
	const liveRadarLayerRef = useRef<TileLayer<TileWMS> | null>(null)
	const spotterNetworkLayerRef = useRef<VectorLayer<VectorSource> | null>(null)
	const [popupOpen, setPopupOpen] = useState(false)
	const [popupState, setPopupState] = useState<TrackerPopupState>(null)
	const [mapReady, setMapReady] = useState(false)
	const trackerLayers = useRootStore.use.trackerLayers()

	// Map initialisation
	useEffect(() => {
		if (!mapRef.current || !popupRef.current) return undefined

		const teamCoords = fromLonLat([data.longitude, data.latitude])
		teamCoordsRef.current = teamCoords

		const teamFeature = new Feature({ geometry: new Point(teamCoords) })
		teamFeature.set('type', 'team')
		teamFeature.setStyle(
			new Style({
				image: new CircleStyle({
					radius: 8,
					fill: new Fill({ color: '#e74c3c' }),
					stroke: new Stroke({ color: '#ffffff', width: 2 }),
				}),
			}),
		)

		const teamLayer = new VectorLayer({
			source: new VectorSource({ features: [teamFeature] }),
			zIndex: TEAM_LAYER_Z_INDEX,
		})

		const popup = new Overlay({
			element: popupRef.current,
			positioning: 'bottom-center',
			offset: [0, -15],
			stopEvent: true,
		})

		const map = new Map({
			target: mapRef.current,
			layers: [new TileLayer({ source: new OSM() }), teamLayer],
			view: new View({ center: teamCoords, zoom: 8 }),
			overlays: [popup],
		})

		map.on('click', (e) => {
			const interactiveFeature = map.forEachFeatureAtPixel(e.pixel, (f) => {
				const featureType = f.get('type')
				return featureType === 'team' || featureType === 'spotter' ? f : undefined
			}) as Feature | undefined

			if (interactiveFeature?.get('type') === 'team') {
				popup.setPosition(teamCoords)
				setPopupState({ type: 'team' })
				setPopupOpen(true)
			} else if (interactiveFeature?.get('type') === 'spotter') {
				const spotterReport = interactiveFeature.get('spotterData') as SpotterNetworkReport | undefined
				const geometry = interactiveFeature.getGeometry() as Point | null
				if (!spotterReport || !geometry) return
				popup.setPosition(geometry.getCoordinates())
				setPopupState({ type: 'spotter', report: spotterReport })
				setPopupOpen(true)
			} else {
				popup.setPosition(undefined)
				setPopupState(null)
				setPopupOpen(false)
			}
		})

		map.on('pointermove', (e) => {
			const isInteractive = map.forEachFeatureAtPixel(e.pixel, (f) => {
				const featureType = f.get('type')
				return featureType === 'team' || featureType === 'spotter'
			})
			map.getTargetElement().style.cursor = isInteractive ? 'pointer' : ''
		})

		mapInstanceRef.current = map
		setMapReady(true)
		requestAnimationFrame(() => map.updateSize())

		return () => {
			map.setTarget(undefined)
			mapInstanceRef.current = null
			convectiveLayerRef.current = null
			liveRadarLayerRef.current = null
			spotterNetworkLayerRef.current = null
			setMapReady(false)
		}
	}, [data.latitude, data.longitude])

	// Convective outlook layer management
	useEffect(() => {
		if (!mapReady || !mapInstanceRef.current) return

		const isActive = trackerLayers.find((l) => l.id === 'convective-outlook')?.active ?? false

		if (isActive && convectiveOutlookData) {
			if (!convectiveLayerRef.current) {
				const features = new GeoJSON().readFeatures(convectiveOutlookData, {
					dataProjection: 'EPSG:4326',
					featureProjection: 'EPSG:3857',
				})
				const layer = new VectorLayer({
					source: new VectorSource({ features }),
					style: getConvectiveStyle,
					zIndex: CONVECTIVE_LAYER_Z_INDEX,
				})
				mapInstanceRef.current.addLayer(layer)
				convectiveLayerRef.current = layer
			}
		} else {
			if (convectiveLayerRef.current) {
				mapInstanceRef.current.removeLayer(convectiveLayerRef.current)
				convectiveLayerRef.current = null
			}
		}
	}, [mapReady, trackerLayers, convectiveOutlookData])

	// Live radar WMS layer management
	useEffect(() => {
		if (!mapReady || !mapInstanceRef.current) return

		const isActive = trackerLayers.find((l) => l.id === 'live-radar')?.active ?? false

		if (isActive) {
			if (!liveRadarLayerRef.current) {
				const layer = new TileLayer({
					source: new TileWMS({
						url: 'https://opengeo.ncep.noaa.gov/geoserver/conus/conus_bref_qcd/ows',
						params: {
							LAYERS: 'conus_bref_qcd',
							STYLES: 'radar_reflectivity',
							FORMAT: 'image/png',
							TRANSPARENT: true,
							TILED: true,
							VERSION: '1.3.0',
						},
						crossOrigin: 'anonymous',
					}),
					opacity: 0.5,
					zIndex: LIVE_RADAR_LAYER_Z_INDEX,
				})
				mapInstanceRef.current.addLayer(layer)
				liveRadarLayerRef.current = layer
			}
		} else if (liveRadarLayerRef.current) {
			mapInstanceRef.current.removeLayer(liveRadarLayerRef.current)
			liveRadarLayerRef.current = null
		}
	}, [mapReady, trackerLayers])

	// Spotter Network layer management
	useEffect(() => {
		if (!mapReady || !mapInstanceRef.current) return

		const isActive = trackerLayers.find((l) => l.id === 'spotter-network')?.active ?? false

		if (isActive && spotterNetworkData.length > 0) {
			const features = spotterNetworkData.map((report) => {
				const feature = new Feature({
					geometry: new Point(fromLonLat([report.longitude, report.latitude])),
				})
				feature.set('type', 'spotter')
				feature.set('spotterData', report)
				return feature
			})

			if (!spotterNetworkLayerRef.current) {
				const layer = new VectorLayer({
					source: new VectorSource({ features }),
					style: new Style({
						image: new CircleStyle({
							radius: 5,
							fill: new Fill({ color: '#7a7f87' }),
							stroke: new Stroke({ color: '#ffffff', width: 1.25 }),
						}),
					}),
					zIndex: SPOTTER_NETWORK_LAYER_Z_INDEX,
				})
				mapInstanceRef.current.addLayer(layer)
				spotterNetworkLayerRef.current = layer
			} else {
				spotterNetworkLayerRef.current.setSource(new VectorSource({ features }))
			}
		} else {
			if (spotterNetworkLayerRef.current) {
				mapInstanceRef.current.removeLayer(spotterNetworkLayerRef.current)
				spotterNetworkLayerRef.current = null
			}
			if (popupState?.type === 'spotter') {
				setPopupOpen(false)
				setPopupState(null)
				if (mapInstanceRef.current) {
					mapInstanceRef.current.getOverlays().forEach((o) => o.setPosition(undefined))
				}
			}
		}
	}, [mapReady, popupState, spotterNetworkData, trackerLayers])

	const handleRecenter = () => {
		if (!mapInstanceRef.current) return
		mapInstanceRef.current.getView().animate({ center: teamCoordsRef.current, duration: 400 })
	}

	return (
		<div className={styles.TrackerMap} ref={mapRef}>
			<div className={styles.mapControls}>
				<button className={styles.recenterButton} onClick={handleRecenter} title="Recenter on team">
					<FontAwesomeIcon icon={faCrosshairs} />
				</button>
			</div>
			<div ref={popupRef} className={styles.popup}>
				<div className={`${styles.popupContent} ${popupOpen ? styles.popupContentVisible : ''}`}>
					<button
						className={styles.popupClose}
						onClick={() => {
							setPopupOpen(false)
							setPopupState(null)
							if (mapInstanceRef.current) {
								mapInstanceRef.current.getOverlays().forEach((o) => o.setPosition(undefined))
							}
						}}
					>
						×
					</button>
					{popupState?.type === 'spotter' ? (
						<>
							<div className={styles.popupRow}>
								<span className={styles.popupLabel}>Name</span>
								<span className={styles.popupValue}>{popupState.report.name}</span>
							</div>
							<div className={styles.popupRow}>
								<span className={styles.popupLabel}>Reported At</span>
								<span className={styles.popupValue}>{popupState.report.reportedAt || 'N/A'}</span>
							</div>
							{popupState.report.note && (
								<div className={styles.popupRow}>
									<span className={styles.popupLabel}>Note</span>
									<span className={styles.popupValue}>{popupState.report.note}</span>
								</div>
							)}
							<div className={styles.popupRow}>
								<span className={styles.popupLabel}>Coordinates</span>
								<span className={styles.popupValue}>
									{formatCoord(popupState.report.latitude, 'lat')}, {formatCoord(popupState.report.longitude, 'lon')}
								</span>
							</div>
						</>
					) : (
						<>
							<div className={styles.popupRow}>
								<span className={styles.popupLabel}>Location</span>
								<span className={styles.popupValue}>
									{formatCoord(data.latitude, 'lat')}, {formatCoord(data.longitude, 'lon')}
								</span>
							</div>
							<div className={styles.popupRow}>
								<span className={styles.popupLabel}>Heading</span>
								<span className={styles.popupValue}>{data.movement}</span>
							</div>
							<div className={styles.popupRow}>
								<span className={styles.popupLabel}>Last Update</span>
								<span className={styles.popupValue}>{data.last_update}</span>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default TrackerMap
