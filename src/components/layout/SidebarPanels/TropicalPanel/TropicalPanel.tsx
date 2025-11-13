'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import Select from '@/components/elements/Select/Select'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { TROPICAL_PRODUCTS } from '@/data/text/tropical/products'
import { TROPICAL_TEXT_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { getActiveTropicalStorms, getTropicalGeneralData, getTropicalStormData } from '@/util/dataCalls/text/query-tropical'
import styles from './TropicalPanel.module.scss'

interface TropicalPanelProps {
	basepath: string
}

const TropicalPanel = ({ basepath }: TropicalPanelProps) => {
	const router = useRouter()
	const { tropicalProductId, tropicalValidtimeId, tropicalStormId } = useParams()
	const [selectedStorm, setSelectedStorm] = useState<string | null>(null)
	const [stormData, setStormData] = useState<any>(null)
	const [stormOptions, setStormOptions] = useState<{ label: string; value: string }[]>([])
	const setTropicalTextContent = useRootStore.use.setTropicalTextContent()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()

	// Full path to tropical section
	const tropicalBasePath = `${basepath}/nhc-tropical-hurricane-weather`

	// Use 'latest' as default validtime if not specified in URL
	const validtimeId = (tropicalValidtimeId as string) || 'latest'

	// Fetch and transform active storms into select options
	useEffect(() => {
		const fetchStorms = async () => {
			const data = await getActiveTropicalStorms()
			if (data && typeof data === 'object') {
				const options = Object.values(data).map((storm: any) => ({
					label: storm.name,
					value: storm.id,
				}))
				setStormOptions(options)
			}
		}
		fetchStorms()
	}, [])

	// Sync selected storm with URL parameter
	useEffect(() => {
		if (tropicalStormId) {
			setSelectedStorm(tropicalStormId as string)
		} else {
			// Clear selection when no storm in URL
			setSelectedStorm(null)
		}
	}, [tropicalStormId])

	// Watch for tropicalProductId changes and fetch/display product data
	useEffect(() => {
		const fetchAndDisplayProduct = async () => {
			if (tropicalProductId && typeof tropicalProductId === 'string') {
				const product = TROPICAL_PRODUCTS[tropicalProductId]

				// Check if this is a valid general product (not a storm-specific product)
				if (product && !product.requiresStorm) {
					const productData = await getTropicalGeneralData(tropicalProductId)
					if (productData && typeof productData !== 'boolean') {
						// Send the full product data object with validtimes
						setTropicalTextContent({
							productData,
							validtimeId,
							productKey: tropicalProductId,
							productName: product.name,
						})
						openSlideoutPanel(TROPICAL_TEXT_SLIDEOUT)
					}
				}
				// Check if this is a storm-specific product and we have storm data
				else if (product && product.requiresStorm && tropicalStormId && stormData) {
					// Get the storm name from stormOptions
					const stormName = stormOptions.find((s) => s.value === tropicalStormId)?.label

					// Get the product history from stormData
					if (stormData[tropicalProductId]) {
						const productHistory = stormData[tropicalProductId]
						// Send the full product history object with validtimes
						setTropicalTextContent({
							productData: productHistory,
							validtimeId,
							productKey: tropicalProductId,
							productName: product.name,
							stormName,
						})
						openSlideoutPanel(TROPICAL_TEXT_SLIDEOUT)
					}
				}
			}
		}

		fetchAndDisplayProduct()
	}, [tropicalProductId, tropicalStormId, stormData, stormOptions, validtimeId, setTropicalTextContent, openSlideoutPanel])

	const handleProductClick = useCallback(
		async (productKey: string) => {
			// Just navigate - the useEffect will handle fetching and opening the slideout
			// Use 'latest' as the validtime for now
			if (tropicalStormId) {
				router.push(`${tropicalBasePath}/${productKey}/${validtimeId}/storm/${tropicalStormId}`)
			} else {
				router.push(`${tropicalBasePath}/${productKey}/${validtimeId}`)
			}
		},
		[tropicalBasePath, router, tropicalStormId, validtimeId],
	)

	const handleStormProductClick = useCallback(
		async (productKey: string, stormId: string) => {
			// Just navigate - the useEffect will handle fetching and opening the slideout
			// Use 'latest' as the validtime for now
			router.push(`${tropicalBasePath}/${productKey}/${validtimeId}/storm/${stormId}`)
		},
		[tropicalBasePath, router, validtimeId],
	)

	const handleStormChange = useCallback(
		async (stormValue: string) => {
			setSelectedStorm(stormValue)

			// Fetch the storm data for this storm ID
			const data = await getTropicalStormData(stormValue)

			// Store the raw data without transformation
			if (data && typeof data === 'object') {
				setStormData(data)
			}

			// Navigate to storm viewer page - use product if available, otherwise use 'overview'
			const productForUrl = tropicalProductId || 'overview'
			router.push(`${tropicalBasePath}/${productForUrl}/${validtimeId}/storm/${stormValue}`)
		},
		[tropicalBasePath, router, tropicalProductId, validtimeId],
	)

	// Filter products that don't require a storm
	const basinProducts = Object.entries(TROPICAL_PRODUCTS)
		.filter(([, product]) => !product.requiresStorm)
		.map(([key, product]) => ({ key, ...product }))

	// Filter products that require a storm
	const stormProducts = Object.entries(TROPICAL_PRODUCTS)
		.filter(([, product]) => product.requiresStorm)
		.map(([key, product]) => ({ key, ...product }))

	return (
		<>
			<SidebarSectionHeader name="Tropical" linkUrl={basepath} />
			<div className={styles.panelContainer}>
				<SidebarPanelPad>
					<div className={styles.productsGroup}>
						<div className={styles.sectionTitle}>General Products</div>
						{basinProducts.map((product) => (
							<SidebarLink
								key={product.key}
								name={product.name}
								linkUrl=""
								onClick={() => handleProductClick(product.key)}
								active={tropicalProductId === product.key && !tropicalStormId}
							/>
						))}
					</div>

					<div className={styles.stormSelector}>
						<Select value={selectedStorm} options={stormOptions} onChange={handleStormChange} placeholder={'Select Active Storm'} />
					</div>

					{selectedStorm && (
						<div className={styles.productsGroup}>
							<div className={styles.sectionTitle}>Storm Products</div>
							{stormProducts.map((product) => (
								<SidebarLink
									key={product.key}
									name={product.name}
									linkUrl=""
									onClick={() => handleStormProductClick(product.key, selectedStorm)}
									active={tropicalProductId === product.key && tropicalStormId === selectedStorm}
								/>
							))}
						</div>
					)}
				</SidebarPanelPad>
			</div>
		</>
	)
}

export default TropicalPanel
