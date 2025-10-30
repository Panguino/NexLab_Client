'use client'

import Select from '@/components/elements/Select/Select'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { TROPICAL_PRODUCTS } from '@/data/text/tropical/products'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import styles from './TropicalPanel.module.scss'

interface TropicalPanelProps {
	basepath: string
}

const TropicalPanel = ({ basepath }: TropicalPanelProps) => {
	const router = useRouter()
	const { tropicalProductId, tropicalStormId } = useParams()
	const [selectedStorm, setSelectedStorm] = useState<string | null>(null)

	// Full path to tropical section
	const tropicalBasePath = `${basepath}/nhc-tropical-hurricane-weather`

	// Sync selected storm with URL parameter
	useEffect(() => {
		if (tropicalStormId) {
			setSelectedStorm(tropicalStormId as string)
		} else {
			// Clear selection when no storm in URL
			setSelectedStorm(null)
		}
	}, [tropicalStormId])

	const handleProductClick = useCallback(
		(productKey: string, productName: string) => {
			console.log(`Tropical product clicked: ${productKey} - ${productName}`)
			// Update URL with new product but stay on same page
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
		(stormValue: string) => {
			console.log(`Storm selected: ${stormValue}`)
			setSelectedStorm(stormValue)
			// Navigate to storm viewer page - use product if available, otherwise use 'overview'
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

	// Mock storm options - will be fetched later
	const stormOptions = [
		{ label: 'Storm One', value: 'st1' },
		{ label: 'Storm Two', value: 'st2' },
	]

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
