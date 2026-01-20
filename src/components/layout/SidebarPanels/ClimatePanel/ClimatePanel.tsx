'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import Select from '@/components/elements/Select/Select'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import {
	CLIMATE_SSTOLR_PRODUCTS,
	CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID,
	CLIMATE_TEXT_PRODUCT_HAWAIIAN_OUTLOOK_ID,
	CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID,
	CLIMATE_TEXT_PRODUCT_SEASONAL_PRECIP_OUTLOOK_ID,
	CLIMATE_TEXT_PRODUCT_SEASONAL_TEMP_OUTLOOK_ID,
	CLIMATE_TEXT_PRODUCT_SST_ID,
	CLIMATE_TEXT_PRODUCT_TROPICAL_PACIFIC_SST_ID,
	CLIMATE_TEXT_PRODUCTS,
} from '@/data/text/climate/products'
import { CLIMATE_TEXT_SSTOLR_SECTOR_WORLD_ID, CLIMATE_TEXT_SSTOLR_SECTORS } from '@/data/text/climate/sectors'
import styles from './ClimatePanel.module.scss'

interface ClimatePanelProps {
	basepath: string
}

// Text-only products (no graphics)
const TEXT_ONLY_PRODUCTS = [CLIMATE_TEXT_PRODUCT_HAWAIIAN_OUTLOOK_ID, CLIMATE_TEXT_PRODUCT_TROPICAL_PACIFIC_SST_ID]

// Outlook products with graphics
const OUTLOOK_PRODUCTS = [CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID, CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID]

// Seasonal products with animator
const SEASONAL_PRODUCTS = [CLIMATE_TEXT_PRODUCT_SEASONAL_TEMP_OUTLOOK_ID, CLIMATE_TEXT_PRODUCT_SEASONAL_PRECIP_OUTLOOK_ID]

const ClimatePanel = ({ basepath }: ClimatePanelProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const { cpcDiscussionProdId, cpcOutlookProdId, cpcSeasonalProdId, sstolrProdId, sstolrSectorId } = useParams()

	const [selectedProduct, setSelectedProduct] = useState<string>(CLIMATE_TEXT_PRODUCT_SST_ID)
	const [selectedSector, setSelectedSector] = useState<string>(CLIMATE_TEXT_SSTOLR_SECTOR_WORLD_ID)

	// Full path to Climate section
	const climateBasePath = `${basepath}/cpc-climate`

	// Check if we're deeper than the main climate page
	const isOnSubpage = pathname !== climateBasePath && pathname.startsWith(climateBasePath)

	// Build options for SST-OLR product select
	const productOptions = CLIMATE_SSTOLR_PRODUCTS.map((product) => ({
		label: product.name,
		value: product.id,
	}))

	// Build options for SST-OLR sector select
	const sectorOptions = CLIMATE_TEXT_SSTOLR_SECTORS.map((sector) => ({
		label: sector.name,
		value: sector.id,
	}))

	// Helper to get link URL for a discussion product
	const getProductLinkUrl = (productId: string) => {
		if (TEXT_ONLY_PRODUCTS.includes(productId)) {
			return `${climateBasePath}/text/${productId}/latest`
		}
		if (OUTLOOK_PRODUCTS.includes(productId)) {
			return `${climateBasePath}/outlooks/${productId}/latest`
		}
		if (SEASONAL_PRODUCTS.includes(productId)) {
			return `${climateBasePath}/seasonal/${productId}/latest`
		}
		return `${climateBasePath}/text/${productId}/latest`
	}

	// Helper to check if product is active
	const isProductActive = (productId: string) => {
		return cpcDiscussionProdId === productId || cpcOutlookProdId === productId || cpcSeasonalProdId === productId
	}

	// Handle SST-OLR product selection
	const handleProductChange = (value: string) => {
		setSelectedProduct(value)
		// If sector is already selected, navigate to the page
		if (value && selectedSector) {
			router.push(`${climateBasePath}/sst-olr/${value}/${selectedSector}`)
		}
	}

	// Handle SST-OLR sector selection
	const handleSectorChange = (value: string) => {
		setSelectedSector(value)
		// If product is already selected, navigate to the page
		if (value && selectedProduct) {
			router.push(`${climateBasePath}/sst-olr/${selectedProduct}/${value}`)
		}
	}

	// Handle View Analysis button click
	const handleViewAnalysis = () => {
		if (selectedProduct && selectedSector) {
			router.push(`${climateBasePath}/sst-olr/${selectedProduct}/${selectedSector}`)
		}
	}

	// Sync select state from URL params
	useState(() => {
		if (typeof sstolrProdId === 'string') {
			setSelectedProduct(sstolrProdId)
		}
		if (typeof sstolrSectorId === 'string') {
			setSelectedSector(sstolrSectorId)
		}
	})

	return (
		<>
			<SidebarSectionHeader name="Climatology" linkUrl={basepath} />

			{isOnSubpage && (
				<div className={styles.backToMain}>
					<button onClick={() => router.push(climateBasePath)} className={styles.backButton}>
						&larr; Return to Climatology Main
					</button>
				</div>
			)}

			<SidebarGroup title="Outlooks & Discussions">
				<SidebarGrid columns={1}>
					{Object.entries(CLIMATE_TEXT_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={getProductLinkUrl(productId)}
							active={isProductActive(productId)}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="SST-OLR Analysis">
				<div className={styles.selectWrapper}>
					<Select
						value={selectedProduct}
						options={productOptions}
						onChange={handleProductChange}
						placeholder="Select Product"
						optionsEmptyText="No products available"
					/>
				</div>
				<div className={styles.selectWrapper}>
					<Select
						value={selectedSector}
						options={sectorOptions}
						onChange={handleSectorChange}
						placeholder="Select Sector"
						optionsEmptyText="No sectors available"
					/>
				</div>
				<div className={styles.buttonWrapper}>
					<button className={styles.viewButton} onClick={handleViewAnalysis}>
						View Analysis
					</button>
				</div>
			</SidebarGroup>
		</>
	)
}

export default ClimatePanel
