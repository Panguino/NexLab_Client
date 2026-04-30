'use client'

import { TrackerData } from '@/types/tracker'
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Feature from 'ol/Feature'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import View from 'ol/View'
import Point from 'ol/geom/Point'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import { useEffect, useRef, useState } from 'react'
import styles from './TrackerMap.module.scss'

export type TrackerMapProps = {
	data: TrackerData
}

const formatCoord = (val: number, pos: 'lat' | 'lon') => {
	const abs = Math.abs(val).toFixed(4)
	if (pos === 'lat') return `${abs}° ${val >= 0 ? 'N' : 'S'}`
	return `${abs}° ${val >= 0 ? 'E' : 'W'}`
}

const TrackerMap = ({ data }: TrackerMapProps) => {
	const mapRef = useRef<HTMLDivElement>(null)
	const popupRef = useRef<HTMLDivElement>(null)
	const mapInstanceRef = useRef<Map | null>(null)
	const teamCoordsRef = useRef<number[]>([0, 0])
	const [popupOpen, setPopupOpen] = useState(false)

	useEffect(() => {
		if (!mapRef.current || !popupRef.current) return undefined

		const teamCoords = fromLonLat([data.longitude, data.latitude])
		teamCoordsRef.current = teamCoords

		const teamFeature = new Feature({
			geometry: new Point(teamCoords),
		})

		teamFeature.setStyle(
			new Style({
				image: new CircleStyle({
					radius: 8,
					fill: new Fill({ color: '#e74c3c' }),
					stroke: new Stroke({ color: '#ffffff', width: 2 }),
				}),
			}),
		)

		const vectorSource = new VectorSource({
			features: [teamFeature],
		})

		const vectorLayer = new VectorLayer({
			source: vectorSource,
		})

		const popup = new Overlay({
			element: popupRef.current,
			positioning: 'bottom-center',
			offset: [0, -15],
			stopEvent: true,
		})

		const map = new Map({
			target: mapRef.current,
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				vectorLayer,
			],
			view: new View({
				center: teamCoords,
				zoom: 8,
			}),
			overlays: [popup],
		})

		map.on('click', (e) => {
			const hit = map.hasFeatureAtPixel(e.pixel)
			if (hit) {
				popup.setPosition(teamCoords)
				setPopupOpen(true)
			} else {
				popup.setPosition(undefined)
				setPopupOpen(false)
			}
		})

		map.on('pointermove', (e) => {
			const hit = map.hasFeatureAtPixel(e.pixel)
			map.getTargetElement().style.cursor = hit ? 'pointer' : ''
		})

		mapInstanceRef.current = map

		requestAnimationFrame(() => {
			map.updateSize()
		})

		return () => {
			map.setTarget(undefined)
			mapInstanceRef.current = null
		}
	}, [data.latitude, data.longitude])

	const handleRecenter = () => {
		if (!mapInstanceRef.current) return
		mapInstanceRef.current.getView().animate({
			center: teamCoordsRef.current,
			duration: 400,
		})
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
							if (mapInstanceRef.current) {
								const overlays = mapInstanceRef.current.getOverlays()
								overlays.forEach((o) => o.setPosition(undefined))
							}
						}}
					>
						×
					</button>
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
				</div>
			</div>
		</div>
	)
}

export default TrackerMap
