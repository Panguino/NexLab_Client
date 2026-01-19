'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Select from '@/components/elements/Select/Select'
import SelectSearchable from '@/components/elements/SelectSearchable/SelectSearchable'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { HYDRO_FFG_PRODUCTS, HYDRO_TEXT_MRMS_QPE_PRODUCTS, HYDRO_TEXT_PRODUCTS, HYDRO_TEXT_QPF_PRODUCTS } from '@/data/text/hydrological/products'
import { getHydroGeneralTextProducts } from '@/util/dataCalls/text/query-hydrological'
import styles from './HydrologicalPanel.module.scss'

interface HydrologicalPanelProps {
	basepath: string
}

interface TextProductItem {
	date: string
	location: string
	office: string
	productQueryString: string
	title: string
	url: string
}

interface GeneralTextProducts {
	[category: string]: {
		[productKey: string]: TextProductItem
	}
}

const HydrologicalPanel = ({ basepath }: HydrologicalPanelProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const { hydroAnalysisProdId, hydroTextProdId } = useParams()

	// State for general text products
	const [generalTextProducts, setGeneralTextProducts] = useState<GeneralTextProducts | null>(null)
	const [selectedTextProducts, setSelectedTextProducts] = useState<Record<string, string>>({})

	// Full path to Hydrological section
	const hydroBasePath = `${basepath}/nws-rfc-hydrological`

	// Check if we're deeper than the main hydro page
	const isOnSubpage = pathname !== hydroBasePath && pathname.startsWith(hydroBasePath)

	// Fetch general text products
	useEffect(() => {
		const fetchGeneralTextProducts = async () => {
			const data = await getHydroGeneralTextProducts()
			if (data) {
				setGeneralTextProducts(data)
			}
		}
		fetchGeneralTextProducts()
	}, [])

	// Build options for a general text product category
	const buildTextProductOptions = (categoryId: string) => {
		if (!generalTextProducts || !generalTextProducts[categoryId]) return []

		const products = generalTextProducts[categoryId]
		return Object.values(products).map((product) => ({
			label: `For: ${product.location} - By: ${product.office}`,
			value: product.productQueryString,
		}))
	}

	// Handle general text product selection
	const handleTextProductChange = (categoryId: string, value: string) => {
		setSelectedTextProducts((prev) => ({ ...prev, [categoryId]: value }))
		router.push(`${hydroBasePath}/text/${value}/latest`)
	}

	// Sync select state from URL params
	useEffect(() => {
		if (typeof hydroTextProdId === 'string') {
			// Find which category contains this product
			if (generalTextProducts) {
				for (const categoryId of Object.keys(HYDRO_TEXT_PRODUCTS)) {
					if (generalTextProducts[categoryId]) {
						const products = generalTextProducts[categoryId]
						const found = Object.values(products).find((p) => p.productQueryString === hydroTextProdId)
						if (found) {
							setSelectedTextProducts((prev) => ({ ...prev, [categoryId]: hydroTextProdId }))
							break
						}
					}
				}
			}
		}
	}, [hydroTextProdId, generalTextProducts])

	// Check if ERO is active
	const isEROActive = pathname.includes('/ero/')

	// Check if a specific graphics product is active
	const isGraphicsProductActive = (productId: string) => {
		return hydroAnalysisProdId === productId
	}

	return (
		<>
			<SidebarSectionHeader name="Hydrological" linkUrl={basepath} />

			{isOnSubpage && (
				<div className={styles.backToMain}>
					<button onClick={() => router.push(hydroBasePath)} className={styles.backButton}>
						&larr; Return to Hydrological Main
					</button>
				</div>
			)}

			<SidebarGroup title="Excessive Rainfall Outlook">
				<SidebarGrid columns={1}>
					<SidebarLink name="ERO Discussion & Graphics" linkUrl={`${hydroBasePath}/ero/latest`} active={isEROActive} />
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="WPC QPF Graphics">
				<SidebarGrid columns={4}>
					{Object.entries(HYDRO_TEXT_QPF_PRODUCTS).map(([id, product]) => (
						<SidebarLink key={id} name={product.label} linkUrl={`${hydroBasePath}/graphics/${id}`} active={isGraphicsProductActive(id)} />
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="MRMS QPE Products">
				<SidebarGrid columns={4}>
					{Object.entries(HYDRO_TEXT_MRMS_QPE_PRODUCTS).map(([id, product]) => (
						<SidebarLink key={id} name={product.label} linkUrl={`${hydroBasePath}/graphics/${id}`} active={isGraphicsProductActive(id)} />
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="Flash Flood Guidance">
				<SidebarGrid columns={3}>
					{Object.entries(HYDRO_FFG_PRODUCTS).map(([id, product]) => (
						<SidebarLink key={id} name={product.label} linkUrl={`${hydroBasePath}/graphics/${id}`} active={isGraphicsProductActive(id)} />
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="General Text Products">
				{Object.entries(HYDRO_TEXT_PRODUCTS).map(([categoryId, product]) => {
					const options = buildTextProductOptions(categoryId)
					const SelectComponent = options.length > 12 ? SelectSearchable : Select

					return (
						<div key={categoryId} className={styles.textProductGroup}>
							<div className={styles.textProductLabel}>{product.label}</div>
							<div className={styles.selectWrapper}>
								<SelectComponent
									value={selectedTextProducts[categoryId] || null}
									options={options}
									onChange={(value) => handleTextProductChange(categoryId, value)}
									placeholder="Select Location"
									optionsEmptyText="No products available"
								/>
							</div>
						</div>
					)
				})}
			</SidebarGroup>
		</>
	)
}

export default HydrologicalPanel
