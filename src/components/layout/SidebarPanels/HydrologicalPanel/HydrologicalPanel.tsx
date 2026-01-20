'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { HYDRO_FFG_PRODUCTS, HYDRO_TEXT_MRMS_QPE_PRODUCTS, HYDRO_TEXT_PRODUCTS, HYDRO_TEXT_QPF_PRODUCTS } from '@/data/text/hydrological/products'
import { getHydroGeneralTextProducts } from '@/util/dataCalls/text/query-hydrological'
import SidebarPanelPad from '../../SidebarPanelPad/SidebarPanelPad'
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

	// State for accordion - only one open at a time
	const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null)

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
			label: product.location,
			value: product.productQueryString,
		}))
	}

	// Check if a text product is active
	const isTextProductActive = (productId: string) => {
		return hydroTextProdId === productId
	}

	// Handle accordion toggle - only one open at a time
	const handleAccordionToggle = (index: number) => {
		setOpenAccordionIndex(openAccordionIndex === index ? null : index)
	}

	// Sync select state from URL params
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
					<SidebarLink name="Excessive Rainfall Outlook" linkUrl={`${hydroBasePath}/ero/latest`} active={isEROActive} />
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
				{Object.entries(HYDRO_TEXT_PRODUCTS).map(([categoryId, product], index) => {
					const options = buildTextProductOptions(categoryId)

					return (
						<Accordian
							key={categoryId}
							title={product.label}
							variant="sidebar"
							isOpen={openAccordionIndex === index}
							onToggle={() => handleAccordionToggle(index)}
						>
							<SidebarPanelPad>
								<SidebarGrid columns={4}>
									{options.map((option) => (
										<SidebarLink
											key={option.value}
											name={option.label}
											linkUrl={`${hydroBasePath}/text/${option.value}/latest`}
											active={isTextProductActive(option.value)}
										/>
									))}
								</SidebarGrid>
							</SidebarPanelPad>
						</Accordian>
					)
				})}
			</SidebarGroup>
		</>
	)
}

export default HydrologicalPanel
