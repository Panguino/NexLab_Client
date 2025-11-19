'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import SelectSearchable, { Option } from '@/components/elements/SelectSearchable/SelectSearchable'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_NWSWFOS } from '@/data/text/nwswfo/wfos'
import { WFO_TEXT_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { getWFOproductHistory, getWFOproductsById } from '@/util/dataCalls/text/query-wfo'
import styles from './WFOPanel.module.scss'

interface WFOPanelProps {
	basepath: string
}

interface WFOProduct {
	date: string
	link: string
	title: string
	id: string
	validtime: string
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
	const { WFOofficeId: officeId, WFOproductId, WFOvalidtimeId } = useParams()
	const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null)
	const [wfoData, setWfoData] = useState<WFOData | null>(null)
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const setWfoTextContent = useRootStore.use.setWfoTextContent()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const closeSlideoutPanel = useRootStore.use.closeSlideoutPanel()

	// Full path to WFO section
	const wfoBasePath = `${basepath}/nws-wfo-national-weather-service-forecast-offices`

	// Use 'latest' as default validtime if not specified in URL
	const validtimeId = (WFOvalidtimeId as string) || 'latest'

	// Transform ALL_NWSWFOS object into SelectSearchable options array
	const WFOoptions: Option[] = useMemo(() => {
		return Object.entries(ALL_NWSWFOS).map(([key, wfo]) => ({
			label: wfo.name,
			value: key,
		}))
	}, [])

	// Sync selected office with URL parameter
	useEffect(() => {
		// Close slideout panel when switching WFOs
		closeSlideoutPanel()
		if (officeId) {
			setSelectedOfficeId(officeId as string)
		} else {
			// Clear selection when no office in URL
			setSelectedOfficeId(null)
			setWfoData(null)
		}
	}, [officeId, closeSlideoutPanel])

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

			// Close the slideout panel when switching WFOs
			// closeSlideoutPanel()

			// Navigate to WFO page
			router.push(`${wfoBasePath}/${wfoValue}`)
		},
		[wfoBasePath, router],
	)

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	const handleProductClick = useCallback(
		async (product: WFOProduct, officeId: string) => {
			console.log('WFO product clicked: ', product)

			// Just navigate - the useEffect will handle fetching and opening the slideout
			// Always use 'latest' when clicking from sidebar to get most recent product
			router.push(`${wfoBasePath}/${officeId}/${product.id}/latest`)
		},
		[wfoBasePath, router],
	)

	// Watch for WFOproductId changes and fetch/display product data
	useEffect(() => {
		const fetchAndDisplayProduct = async () => {
			if (WFOproductId && typeof WFOproductId === 'string' && selectedOfficeId && wfoData) {
				console.log(`Loading WFO product from URL: ${WFOproductId} for office: ${selectedOfficeId}`)

				// Fetch the product history
				const productHistory = await getWFOproductHistory(selectedOfficeId, WFOproductId)

				if (productHistory && typeof productHistory === 'object') {
					// Send the full product history object with validtimes
					setWfoTextContent({
						productData: productHistory,
						validtimeId,
						productKey: WFOproductId,
						productName: WFOproductId, // Use product ID as name for now
						officeId: wfoData.id,
						officeName: wfoData.title,
					})
					openSlideoutPanel(WFO_TEXT_SLIDEOUT)
				}
			}
		}

		fetchAndDisplayProduct()
	}, [WFOproductId, selectedOfficeId, wfoData, validtimeId, setWfoTextContent, openSlideoutPanel])

	// Build categories array from wfoData
	const productCategories = useMemo(() => {
		if (!wfoData || !wfoData.productCategories) return []
		return Object.entries(wfoData.productCategories).map(([category, products]) => ({
			category,
			products,
		}))
	}, [wfoData])

	// Determine back button URL based on whether an office is selected
	const backButtonUrl = selectedOfficeId ? wfoBasePath : basepath

	return (
		<>
			<SidebarSectionHeader name="NWS WFO" linkUrl={backButtonUrl} />
			<div className={styles.selectTitle}>Available Forecast Offices:</div>
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
						Products issued by:
						<br />
						{wfoData.id} - {wfoData.title}
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
												onClick={() => handleProductClick(product, wfoData.id)}
												active={WFOproductId === product.id}
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
