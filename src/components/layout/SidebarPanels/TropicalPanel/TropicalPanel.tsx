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
import { getActiveTropicalStorms, getTropicalGeneralData, getTropicalStormData, productURLtoText } from '@/util/dataCalls/text/query-tropical'
import styles from './TropicalPanel.module.scss'

interface TropicalPanelProps {
	basepath: string
}

const TropicalPanel = ({ basepath }: TropicalPanelProps) => {
	const router = useRouter()
	const { tropicalProductId, tropicalStormId } = useParams()
	const [selectedStorm, setSelectedStorm] = useState<string | null>(null)
	const [stormData, setStormData] = useState<any>(null)
	const [stormOptions, setStormOptions] = useState<{ label: string; value: string }[]>([])
	const setTropicalTextContent = useRootStore.use.setTropicalTextContent()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()

	// Full path to tropical section
	const tropicalBasePath = `${basepath}/nhc-tropical-hurricane-weather`

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
					console.log(`Loading tropical product from URL: ${tropicalProductId}`)
					const productData = await getTropicalGeneralData(tropicalProductId)
					if (productData && typeof productData !== 'boolean') {
						setTropicalTextContent(productData.content)
						openSlideoutPanel(TROPICAL_TEXT_SLIDEOUT)
					}
				}
				// Check if this is a storm-specific product and we have storm data
				else if (product && product.requiresStorm && tropicalStormId && stormData) {
					console.log(`Loading storm product from URL: ${tropicalProductId} for storm: ${tropicalStormId}`)

					// Get the product URL from stormData
					if (stormData[tropicalProductId]) {
						const productLink = stormData[tropicalProductId]
						console.log(`Fetching storm product from: ${productLink}`)

						// Use productURLtoText to extract the content
						const productContent = await productURLtoText(productLink)

						if (productContent) {
							// Set the content and open the slideout
							setTropicalTextContent(productContent)
							openSlideoutPanel(TROPICAL_TEXT_SLIDEOUT)
						}
					}
				}
			}
		}

		fetchAndDisplayProduct()
	}, [tropicalProductId, tropicalStormId, stormData, setTropicalTextContent, openSlideoutPanel])

	const handleProductClick = useCallback(
		async (productKey: string, productName: string) => {
			console.log(`Tropical product clicked: ${productKey} - ${productName}`)

			// Just navigate - the useEffect will handle fetching and opening the slideout
			if (tropicalStormId) {
				router.push(`${tropicalBasePath}/${productKey}/storm/${tropicalStormId}`)
			} else {
				router.push(`${tropicalBasePath}/${productKey}`)
			}
		},
		[tropicalBasePath, router, tropicalStormId],
	)

	const handleStormProductClick = useCallback(
		async (productKey: string, productName: string, stormId: string) => {
			console.log(`Storm-specific product clicked: ${productKey} - ${productName} for storm: ${stormId}`)

			// Just navigate - the useEffect will handle fetching and opening the slideout
			router.push(`${tropicalBasePath}/${productKey}/storm/${stormId}`)
		},
		[tropicalBasePath, router],
	)

	const handleStormChange = useCallback(
		async (stormValue: string) => {
			console.log(`Storm selected: ${stormValue}`)
			setSelectedStorm(stormValue)

			// Fetch the storm data for this storm ID
			const data = await getTropicalStormData(stormValue)
			console.log(`Storm data for ${stormValue}:`, data)

			// Transform the data to extract the latest product link for each product
			if (data && typeof data === 'object') {
				const transformedData: Record<string, string> = {}

				// Iterate through each product in the storm data
				Object.keys(data).forEach((productId) => {
					const productHistory = data[productId]

					// Get the most recent entry - keys are timestamps in YYYYMMDDHHmm format
					if (productHistory && typeof productHistory === 'object') {
						const timestamps = Object.keys(productHistory)
						if (timestamps.length > 0) {
							const latestTimestamp = timestamps.sort().reverse()[0]
							const latestProductLink = productHistory[latestTimestamp]
							transformedData[productId] = latestProductLink
						}
					}
				})

				console.log('Transformed storm data:', transformedData)
				setStormData(transformedData)
			}

			// Navigate to storm viewer page - use product if available, otherwise use 'overview'
			// developer note: this overview fallback is something copilot suggested - I don't expect it to ever be used
			const productForUrl = tropicalProductId || 'overview'
			router.push(`${tropicalBasePath}/${productForUrl}/storm/${stormValue}`)
		},
		[tropicalBasePath, router, tropicalProductId],
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
			<SidebarPanelPad>
				<div className={styles.productsGroup}>
					<div className={styles.sectionTitle}>General Products</div>
					{basinProducts.map((product) => (
						<SidebarLink key={product.key} name={product.name} linkUrl="" onClick={() => handleProductClick(product.key, product.name)} />
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
								onClick={() => handleStormProductClick(product.key, product.name, selectedStorm)}
							/>
						))}
					</div>
				)}
			</SidebarPanelPad>
		</>
	)
}

export default TropicalPanel
