'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import SelectSearchable from '@/components/elements/SelectSearchable/SelectSearchable'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import {
	ANALYSIS_TEXT_MRMS_QPE_PRODUCTS,
	ANALYSIS_TEXT_REGIONAL_ROUNDUP_PRODUCTS,
	ANALYSIS_TEXT_SEL_CITY_PRODUCTS,
	ANALYSIS_TEXT_TEMP_WEATHER_TABLE_PRODUCTS,
} from '@/data/text/analysis/products'
import { getAdditionalRWRProducts } from '@/util/dataCalls/text/query-analysis'
import styles from './AnalysisPanel.module.scss'

interface RWRProduct {
	date: string
	location: string
	office: string
	title: string
	url: string
}

interface RWRData {
	states: Record<string, RWRProduct>
	stations: Record<string, RWRProduct>
}

interface AnalysisPanelProps {
	basepath: string
}

const AnalysisPanel = ({ basepath }: AnalysisPanelProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const { analysisProdId, mrmsProdId } = useParams()

	const [rwrData, setRwrData] = useState<RWRData | null>(null)
	const [selectedState, setSelectedState] = useState<string | null>(null)
	const [selectedStation, setSelectedStation] = useState<string | null>(null)

	// Full path to Analysis section
	const analysisBasePath = `${basepath}/analysis`

	// Check if we're deeper than the main analysis page
	const isOnSubpage = pathname !== analysisBasePath && pathname.startsWith(analysisBasePath)

	// Fetch additional RWR products on mount
	useEffect(() => {
		const fetchRWRProducts = async () => {
			const data = await getAdditionalRWRProducts()
			if (data) {
				setRwrData(data)
			}
		}
		fetchRWRProducts()
	}, [])

	// Build options for states SelectSearchable
	const stateOptions = rwrData?.states
		? Object.entries(rwrData.states)
				.map(([key, product]) => ({
					label: product.location,
					value: key,
				}))
				.sort((a, b) => a.label.localeCompare(b.label))
		: []

	// Build options for stations SelectSearchable
	const stationOptions = rwrData?.stations
		? Object.entries(rwrData.stations)
				.map(([key, product]) => ({
					label: product.location,
					value: key,
				}))
				.sort((a, b) => a.label.localeCompare(b.label))
		: []

	// Handle state selection change
	const handleStateChange = (value: string) => {
		setSelectedState(value)
		if (value) {
			router.push(`${analysisBasePath}/text/state-${value}/latest`)
		}
	}

	// Handle station selection change
	const handleStationChange = (value: string) => {
		setSelectedStation(value)
		if (value) {
			router.push(`${analysisBasePath}/text/station-${value}/latest`)
		}
	}

	// Update selected state/station based on current URL
	useEffect(() => {
		if (typeof analysisProdId === 'string') {
			if (analysisProdId.startsWith('state-')) {
				const stateKey = analysisProdId.replace('state-', '')
				setSelectedState(stateKey)
				setSelectedStation(null)
			} else if (analysisProdId.startsWith('station-')) {
				const stationKey = analysisProdId.replace('station-', '')
				setSelectedStation(stationKey)
				setSelectedState(null)
			} else {
				setSelectedState(null)
				setSelectedStation(null)
			}
		}
	}, [analysisProdId])

	return (
		<>
			<SidebarSectionHeader name="Analysis" linkUrl={basepath} />

			{isOnSubpage && (
				<div className={styles.backToMain}>
					<button onClick={() => router.push(analysisBasePath)} className={styles.backButton}>
						&larr; Return to Analysis Main
					</button>
				</div>
			)}

			<SidebarGroup title="Selected City Summaries">
				<SidebarGrid columns={2}>
					{Object.entries(ANALYSIS_TEXT_SEL_CITY_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={`${analysisBasePath}/text/${productId}/latest`}
							active={analysisProdId === productId}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="Temp & Weather Tables">
				<SidebarGrid columns={2}>
					{Object.entries(ANALYSIS_TEXT_TEMP_WEATHER_TABLE_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={`${analysisBasePath}/text/${productId}/latest`}
							active={analysisProdId === productId}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="Regional Weather Roundups">
				<SidebarGrid columns={2}>
					{Object.entries(ANALYSIS_TEXT_REGIONAL_ROUNDUP_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={`${analysisBasePath}/text/${productId}/latest`}
							active={analysisProdId === productId}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="RWR by State">
				<div className={styles.selectWrapper}>
					<SelectSearchable
						value={selectedState}
						options={stateOptions}
						onChange={handleStateChange}
						placeholder="Select a state..."
						optionsEmptyText="Loading states..."
					/>
				</div>
			</SidebarGroup>

			<SidebarGroup title="RWR by Station">
				<div className={styles.selectWrapper}>
					<SelectSearchable
						value={selectedStation}
						options={stationOptions}
						onChange={handleStationChange}
						placeholder="Select a station..."
						optionsEmptyText="Loading stations..."
					/>
				</div>
			</SidebarGroup>

			<SidebarGroup title="MRMS QPE Analysis">
				<SidebarGrid columns={4}>
					{Object.entries(ANALYSIS_TEXT_MRMS_QPE_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={`${analysisBasePath}/MRMS/${productId}`}
							active={mrmsProdId === productId}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>
		</>
	)
}

export default AnalysisPanel
