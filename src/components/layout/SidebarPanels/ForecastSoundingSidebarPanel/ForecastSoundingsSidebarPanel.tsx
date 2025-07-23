'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './ForecastSoundingsSidebarPanel.module.scss'

const ForecastSoundingsSidebarPanel = () => {
	const {
		fcstModel: modelId,
		fcstRun: runId,
		fcstSector: sectorId,
		fcstLevel: levelId,
		fcstProduct: productId,
		fcstSndValid: validTimeId,
		fcstSndLoc: tempLocId,
		fcstSndParcel: parcelId,
		fcstSndWeather: weatherId,
	} = useParams()

	const decodedLocationId = tempLocId ? decodeURIComponent(tempLocId as string) : null
	const isStationId = decodedLocationId?.length === 4 && !decodedLocationId?.includes(',')

	const [locationId, setLocationId] = useState(decodedLocationId)
	const [isLoading, setIsLoading] = useState(isStationId)
	const [error, setError] = useState(null)

	useEffect(() => {
		// Only fetch if this is a station ID
		if (isStationId) {
			setIsLoading(true)
			// may want to pull this out as a separate utility function
			const fetchStationCoordinates = async () => {
				try {
					const response = await fetch(`https://api.weather.gov/stations/${decodedLocationId}`)
					if (!response.ok) {
						throw new Error(`Station API error: ${response.status}`)
					}
					const data = await response.json()
					if (data.geometry && Array.isArray(data.geometry.coordinates) && data.geometry.coordinates.length === 2) {
						const [longitude, latitude] = data.geometry.coordinates
						const formattedCoordinates = `${latitude},${longitude}`
						setLocationId(formattedCoordinates)
					} else {
						setLocationId(decodedLocationId)
					}
				} catch (err) {
					console.error('Error fetching station data:', err)
					setError(err.message)
					setLocationId(decodedLocationId)
				} finally {
					setIsLoading(false)
				}
			}
			fetchStationCoordinates()
		} else {
			setLocationId(decodedLocationId)
		}
	}, [decodedLocationId, isStationId])

	return (
		<ScrollArea>
			<div className={styles.ForecastSoundingsSidebarPanel}>
				Parameters:
				{isLoading ? (
					<p>Loading station coordinates...</p>
				) : (
					<>
						{modelId && <p>Model ID: {modelId}</p>}
						{runId && <p>Run ID: {runId}</p>}
						{sectorId && <p>Sector ID: {sectorId}</p>}
						{levelId && <p>Level ID: {levelId}</p>}
						{productId && <p>Product ID: {productId}</p>}
						{validTimeId && <p>Valid Time ID: {validTimeId}</p>}
						{locationId && <p>Location: {locationId}</p>}
						{parcelId && <p>Parcel ID: {parcelId}</p>}
						{weatherId && <p>Weather ID: {weatherId}</p>}
						{error && <p className={styles.error}>Error: {error}</p>}
					</>
				)}
			</div>
		</ScrollArea>
	)
}

export default ForecastSoundingsSidebarPanel
