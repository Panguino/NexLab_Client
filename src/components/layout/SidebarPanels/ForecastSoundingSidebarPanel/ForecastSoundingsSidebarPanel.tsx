'use client'

import { useParams } from 'next/navigation'
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
		fcstSndLoc: locationId,
		fcstSndParcel: parcelId,
		fcstSndWeather: weatherId,
	} = useParams()

	return (
		<ScrollArea>
			<div className={styles.ForecastSoundingsSidebarPanel}>
				Thank you for supplying me with params.
				{modelId && <p>Model ID: {modelId}</p>}
				{runId && <p>Run ID: {runId}</p>}
				{sectorId && <p>Sector ID: {sectorId}</p>}
				{levelId && <p>Level ID: {levelId}</p>}
				{productId && <p>Product ID: {productId}</p>}
				{validTimeId && <p>Valid Time ID: {validTimeId}</p>}
				{locationId && <p>Location ID: {locationId}</p>}
				{parcelId && <p>Parcel ID: {parcelId}</p>}
				{weatherId && <p>Weather ID: {weatherId}</p>}
			</div>
		</ScrollArea>
	)
}

export default ForecastSoundingsSidebarPanel
