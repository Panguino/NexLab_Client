'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import SelectSearchable, { Option } from '@/components/elements/SelectSearchable/SelectSearchable'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_NWSWFOS } from '@/data/text/nwswfo/wfos'
import styles from './WFOPanel.module.scss'

interface WFOPanelProps {
	basepath: string
}

const WFOPanel = ({ basepath }: WFOPanelProps) => {
	const router = useRouter()
	const { WFOofficeId } = useParams()
	const [selectedWFO, setSelectedWFO] = useState<string | null>(null)

	// Full path to WFO section
	const wfoBasePath = `${basepath}/nws-wfo-national-weather-service-forecast-offices`

	// Transform ALL_NWSWFOS object into SelectSearchable options array
	const WFOoptions: Option[] = useMemo(() => {
		return Object.entries(ALL_NWSWFOS).map(([key, wfo]) => ({
			label: wfo.name,
			value: key,
		}))
	}, [])

	// Sync selected WFO with URL parameter
	useEffect(() => {
		if (WFOofficeId) {
			setSelectedWFO(WFOofficeId as string)
		} else {
			// Clear selection when no WFO in URL
			setSelectedWFO(null)
		}
	}, [WFOofficeId])

	const handleWFOChange = useCallback(
		(wfoValue: string) => {
			console.log(`WFO selected: ${wfoValue}`)
			setSelectedWFO(wfoValue)

			// Navigate to WFO page
			router.push(`${wfoBasePath}/${wfoValue}`)
		},
		[wfoBasePath, router],
	)

	return (
		<>
			<SidebarSectionHeader name="NWS WFO" linkUrl={basepath} />
			<SidebarPanelPad>
				<div className={styles.wfoSelector}>
					<SelectSearchable
						value={selectedWFO}
						options={WFOoptions}
						onChange={handleWFOChange}
						placeholder="Select a WFO"
						optionsEmptyText="No WFOs available"
					/>
				</div>
			</SidebarPanelPad>
		</>
	)
}

export default WFOPanel
