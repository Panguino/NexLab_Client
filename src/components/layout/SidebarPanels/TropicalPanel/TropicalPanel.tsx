'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import Select from '@/components/elements/Select/Select'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { TROPICAL_PRODUCTS } from '@/data/text/tropical/products'
import { TROPICAL_TEXT_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { getData } from '@/util/dataCalls/dataCall-generic'
import { getTropicalGeneralData, getTropicalStormData } from '@/util/dataCalls/text/query-tropical'
import styles from './TropicalPanel.module.scss'

interface TropicalPanelProps {
	basepath: string
}

const TropicalPanel = ({ basepath }: TropicalPanelProps) => {
	const router = useRouter()
	const { tropicalProductId, tropicalStormId } = useParams()
	const [selectedStorm, setSelectedStorm] = useState<string | null>(null)
	const [currentStorms, setCurrentStorms] = useState<any[]>([])
	const [stormData, setStormData] = useState<any>(null)
	const setTropicalTextContent = useRootStore.use.setTropicalTextContent()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()

	// Full path to tropical section
	const tropicalBasePath = `${basepath}/nhc-tropical-hurricane-weather`

	// Fetch current storms data
	useEffect(() => {
		const fetchStorms = async () => {
			try {
				const data = await getData('https://climate.cod.edu/data/tropical/gis/CurrentStorms.json')
				console.log('Raw storm data:', data)

				// Extract storms from the object - each entry is a storm with name and id properties
				const stormArray = data && typeof data === 'object' ? Object.values(data) : []

				console.log('Processed storm array:', stormArray)
				setCurrentStorms(stormArray)
			} catch (error) {
				console.error('Error fetching current storms:', error)
				setCurrentStorms([])
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
				// Check if this is a valid general product (not a storm-specific product)
				const product = TROPICAL_PRODUCTS[tropicalProductId]
				if (product && !product.requiresStorm) {
					console.log(`Loading tropical product from URL: ${tropicalProductId}`)
					const productData = await getTropicalGeneralData(tropicalProductId)
					if (productData && typeof productData !== 'boolean') {
						setTropicalTextContent(productData.content)
						openSlideoutPanel(TROPICAL_TEXT_SLIDEOUT)
					}
				}
			}
		}

		fetchAndDisplayProduct()
	}, [tropicalProductId, setTropicalTextContent, openSlideoutPanel])

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
		(productKey: string, productName: string, stormId: string) => {
			console.log(`Storm-specific product clicked: ${productKey} - ${productName} for storm: ${stormId}`)
			// Update URL with new product but stay on storm page
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
			setStormData(data)

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

	// Transform current storms data into select options
	const stormOptions = useMemo(() => {
		return currentStorms.map((storm) => ({
			label: storm.name,
			value: storm.id,
		}))
	}, [currentStorms])

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
