'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import SelectSearchable, { Option } from '@/components/elements/SelectSearchable/SelectSearchable'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_NWSWFOS } from '@/data/text/nwswfo/wfos'
import { getWFOproductsById } from '@/util/dataCalls/text/query-wfo'
import styles from './WFOPanel.module.scss'

interface WFOPanelProps {
	basepath: string
}

interface WFOProduct {
	date: string
	link: string
	title: string
}

interface WFOProductCategories {
	[category: string]: WFOProduct[]
}

interface WFOData {
	productCategories: WFOProductCategories
	id: string
	title: string
}

const WFOPanel = ({ basepath }: WFOPanelProps) => {
	const router = useRouter()
	const { WFOofficeId: officeId } = useParams()
	const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null)
	const [wfoData, setWfoData] = useState<WFOData | null>(null)
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	// Full path to WFO section
	const wfoBasePath = `${basepath}/nws-wfo-national-weather-service-forecast-offices`

	// Transform ALL_NWSWFOS object into SelectSearchable options array
	const WFOoptions: Option[] = useMemo(() => {
		return Object.entries(ALL_NWSWFOS).map(([key, wfo]) => ({
			label: wfo.name,
			value: key,
		}))
	}, [])

	// Sync selected office with URL parameter
	useEffect(() => {
		if (officeId) {
			setSelectedOfficeId(officeId as string)
		} else {
			// Clear selection when no office in URL
			setSelectedOfficeId(null)
			setWfoData(null)
		}
	}, [officeId])

	// Fetch WFO products when office is selected
	useEffect(() => {
		const fetchWFOProducts = async () => {
			if (selectedOfficeId) {
				try {
					const data = await getWFOproductsById(selectedOfficeId)
					setWfoData(data)
				} catch (error) {
					console.error(`Failed to fetch WFO products for ${selectedOfficeId}:`, error)
					setWfoData(null)
				}
			}
		}

		fetchWFOProducts()
	}, [selectedOfficeId])

	const handleWFOChange = useCallback(
		(wfoValue: string) => {
			console.log(`WFO selected: ${wfoValue}`)
			setSelectedOfficeId(wfoValue)

			// Navigate to WFO page
			router.push(`${wfoBasePath}/${wfoValue}`)
		},
		[wfoBasePath, router],
	)

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	const handleProductClick = useCallback((product: WFOProduct) => {
		console.log('Product clicked:', product)
	}, [])

	// Build categories array from wfoData
	const productCategories = useMemo(() => {
		if (!wfoData || !wfoData.productCategories) return []
		return Object.entries(wfoData.productCategories).map(([category, products]) => ({
			category,
			products,
		}))
	}, [wfoData])

	return (
		<>
			<SidebarSectionHeader name="NWS WFO" linkUrl={basepath} />
			<div className={styles.wfoSelector}>
				<SelectSearchable
					value={selectedOfficeId}
					options={WFOoptions}
					onChange={handleWFOChange}
					placeholder="Select a WFO"
					optionsEmptyText="No WFOs available"
				/>
			</div>

			{wfoData && productCategories.length > 0 && (
				<>
					<div className={styles.sectionTitle}>
						Products issued by: {wfoData.id} - {wfoData.title}
					</div>
					<div className={styles.productsGroup}>
						{productCategories.map(({ category, products }, index) => (
							<Accordian
								key={category}
								title={category}
								variant="sidebar"
								isOpen={openIndex === index}
								onToggle={() => handleToggle(index)}
							>
								<SidebarPanelPad>
									<div className={styles.wfoProducts}>
										{products.map((product, productIndex) => (
											<SidebarLink
												key={`${category}-${productIndex}`}
												name={product.title}
												linkUrl=""
												onClick={() => handleProductClick(product)}
												active={false}
											/>
										))}
									</div>
								</SidebarPanelPad>
							</Accordian>
						))}
					</div>
				</>
			)}
		</>
	)
}

export default WFOPanel
