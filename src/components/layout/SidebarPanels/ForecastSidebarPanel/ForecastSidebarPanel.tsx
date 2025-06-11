'use client'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import { SectorChangeButton } from '@/components/elements/SectorChangeButton/SectorChangeButton'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { DEFAULT_FORECAST_LEVEL, FORECAST_LEVELS } from '@/data/forecast/levels'
import { DEFAULT_FORECAST_MODEL, FORECAST_MODELS } from '@/data/forecast/models'
import { DEFAULT_FORECAST_PRODUCT, FORECAST_PRODUCTS } from '@/data/forecast/products'
import { DEFAULT_FORECAST_SECTOR, FORECAST_SECTORS } from '@/data/forecast/sectors'
import { getForecastMenu } from '@/util/dataCalls/forecast/query-menu'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import SidebarPanelPad from '../../SidebarPanelPad/SidebarPanelPad'
import styles from './ForecastSidebarPanel.module.scss'

const ForecastSidebarPanel = () => {
	const router = useRouter()
	const [forecastMenu, setForecastMenu] = useState<any[]>([])
	const { forecastModelId: modelId, forecastSectorId: sectorId, forecastLevelId: levelId, forecastProductId: productId } = useParams()
	useEffect(() => {
		if (
			!FORECAST_MODELS[modelId as string] ||
			!FORECAST_SECTORS[sectorId as string] ||
			!FORECAST_LEVELS[levelId as string] ||
			!FORECAST_PRODUCTS[productId as string]
		) {
			router.push(
				`/weather-data/forecast-models/${DEFAULT_FORECAST_MODEL}/${DEFAULT_FORECAST_SECTOR}/${DEFAULT_FORECAST_LEVEL}/${DEFAULT_FORECAST_PRODUCT}`,
			)
		}
	}, [productId, sectorId, router, modelId, levelId])

	const getMenu = useCallback(async () => {
		console.log('Fetching forecast menu...')
		const menu = await getForecastMenu(modelId, sectorId)
		if (menu && Array.isArray(menu.menu)) {
			setForecastMenu(menu.menu)
			console.log('Forecast menu fetched:', menu.menu)
		} else {
			console.error('Failed to fetch forecast menu', modelId, sectorId)
		}
	}, [modelId, sectorId])

	useEffect(() => {
		getMenu()
	}, [modelId, sectorId, getMenu])

	console.log('just logging forecastMenu:', forecastMenu)
	return (
		<ScrollArea>
			<div className={styles.ForecastSidebarPanel}>
				<div className={styles.options}>
					<SectorChangeButton onClick={() => console.log('sector change')} label="Selected Sector:" labelValue="Sector Name" />
				</div>
				<Accordian title="Level Menu" initiallyClosed={true} variant="line">
					<SidebarPanelPad>
						<SidebarLink name="product 1" active={false} onClick={() => console.log('Product 1 clicked')} />
						<SidebarLink name="product 2" active={false} onClick={() => console.log('Product 2 clicked')} />
						<SidebarLink name="product 3" active={false} onClick={() => console.log('Product 3 clicked')} />
					</SidebarPanelPad>
				</Accordian>
				<Accordian title="Level Menu 2" initiallyClosed={true} variant="line">
					<SidebarLink name="product 1" active={false} onClick={() => console.log('Product 1 clicked')} />
					<SidebarLink name="product 2" active={false} onClick={() => console.log('Product 2 clicked')} />
					<SidebarLink name="product 3" active={false} onClick={() => console.log('Product 3 clicked')} />
				</Accordian>
			</div>
		</ScrollArea>
	)
}

export default ForecastSidebarPanel
