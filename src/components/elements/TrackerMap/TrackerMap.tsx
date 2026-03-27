'use client'

import { TrackerData } from '@/types/tracker'
import Feature from 'ol/Feature'
import Map from 'ol/Map'
import View from 'ol/View'
import Point from 'ol/geom/Point'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import { useEffect, useRef } from 'react'
import styles from './TrackerMap.module.scss'

export type TrackerMapProps = {
	data: TrackerData
}

const TrackerMap = ({ data }: TrackerMapProps) => {
	const mapRef = useRef<HTMLDivElement>(null)
	const mapInstanceRef = useRef<Map | null>(null)

	useEffect(() => {
		if (!mapRef.current) return

		const teamCoords = fromLonLat([data.longitude, data.latitude])

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

	return <div ref={mapRef} className={styles.TrackerMap} />
}

export default TrackerMap
