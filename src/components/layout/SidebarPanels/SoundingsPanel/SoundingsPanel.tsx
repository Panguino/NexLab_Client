'use client'

import Select from '@/components/elements/Select/Select'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { ALL_SOUNDING_REGIONS, SOUNDING_REGION_DEFAULT } from '@/data/analysis/soundings/regions'
import { ALL_SOUNDING_SITES, SOUNDING_SITE_DEFAULT } from '@/data/analysis/soundings/sites'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { SectorChangeButton } from '@/components/elements/SectorChangeButton/SectorChangeButton'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SOUNDING_PRODUCT_DEFAULT, SOUNDING_PRODUCT_TEXT } from '@/data/analysis/soundings/products'
import { SOUNDING_TEXT_SLIDEOUT } from '@/data/vars'
import { getSoundingData } from '@/util/dataCalls/analysis/query-soundings'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import styles from './SoundingsPanel.module.scss'

interface soundingsPanelProps {
	basepath: string
	isActive: boolean
}

export const SoundingsPanel = ({ basepath, isActive }: soundingsPanelProps) => {
	const router = useRouter()
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()

	// Slideout panel state for sounding text
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSoundingTextURL = useRootStore.use.setSoundingTextURL()
	const soundingFrameValidTime = useRootStore.use.soundingFrameValidTime()
	const soundingNumberOfFrames = useRootStore.use.soundingNumberOfFrames()

	const { soundingProductId: paramProductId, soundingSiteId: paramSiteId, soundingRegionId: paramRegionId } = useParams()
	const siteId = paramSiteId ?? SOUNDING_SITE_DEFAULT
	const regionId = paramRegionId ?? SOUNDING_REGION_DEFAULT
	const productId = paramProductId ?? SOUNDING_PRODUCT_DEFAULT

	useEffect(() => {
		if (
			isActive &&
			(!ALL_SOUNDING_SITES[paramSiteId as string] ||
				!ALL_SOUNDING_REGIONS[paramRegionId as string] ||
				!ALL_SOUNDING_SITES[paramSiteId as string].products[paramProductId as string])
		) {
			router.push(`/weather-data/analysis/soundings/${SOUNDING_PRODUCT_DEFAULT}/${SOUNDING_REGION_DEFAULT}/${SOUNDING_SITE_DEFAULT}`)
		}
	}, [paramSiteId, paramProductId, paramRegionId, router, isActive])

	useEffect(() => {
		if (isActive) {
			updateOnChangeSectorSelectorSectorHandler((sectorId) => {
				closeSectorSelectorPanel()
				router.push(`/weather-data/analysis/soundings/${productId}/${regionId}/${sectorId}`)
			})
		}
	}, [productId, regionId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler, isActive])

	useEffect(() => {
		if (isActive) {
			const region =
				regionId && ALL_SOUNDING_REGIONS[regionId as string]
					? ALL_SOUNDING_REGIONS[regionId as string]
					: ALL_SOUNDING_REGIONS[SOUNDING_REGION_DEFAULT]
			const newD3config = {
				rotate: region.rotate,
				scale: region.scale,
			}
			setSectorSelectorD3config(newD3config)
			const selectedSectors = region.sites.map((siteId) => ({
				id: siteId,
				...ALL_SOUNDING_SITES[siteId],
			}))
			setSectorSelectorSectors(selectedSectors)
		}
	}, [regionId, setSectorSelectorD3config, setSectorSelectorSectors, isActive])

	const handleRegionChange = (newRegionId) => {
		router.push(`/weather-data/analysis/soundings/${productId}/${newRegionId}/${siteId}`)
		openSectorSelectorPanel()
	}

	const regionOptions = useMemo(() => {
		return Object.keys(ALL_SOUNDING_REGIONS).map((regionId) => {
			return { value: regionId, label: ALL_SOUNDING_REGIONS[regionId].label }
		})
	}, [])

	// Handler for sounding text link
	const handleSoundingText = async () => {
		try {
			// Call getSoundingData just like the SoundingAnimator does
			const data = await getSoundingData(siteId, SOUNDING_PRODUCT_TEXT, soundingNumberOfFrames)

			if (data.textfiles && data.textfiles.length > 0) {
				// Find the current frame index based on soundingFrameValidTime
				let frameIndex = 0
				if (data.validtimes && soundingFrameValidTime) {
					frameIndex = findClosestValidTimeIndex(data.validtimes, soundingFrameValidTime)
				}

				// Select the URL from textfiles that corresponds to the current frame
				const textURL = data.textfiles[frameIndex] || data.textfiles[0]

				// Update the soundingTextURL in the store
				setSoundingTextURL(textURL)

				// Open the slideout panel
				openSlideoutPanel(SOUNDING_TEXT_SLIDEOUT)
			} else {
				console.warn('No textfiles available in sounding data response')
			}
		} catch (error) {
			console.error('Error fetching sounding text data:', error)
		}
	}

	const productsArray = useMemo(() => {
		if (siteId && ALL_SOUNDING_SITES[siteId as string]) {
			return Object.keys(ALL_SOUNDING_SITES[siteId as string].products).map((productId) => {
				return { id: productId, label: ALL_SOUNDING_SITES[siteId as string].products[productId].label }
			})
		}
		return []
	}, [siteId])

	return (
		<div className={styles.soundingsPanel}>
			<SidebarSectionHeader name="Soundings" linkUrl={`${basepath}`} />
			<div className={styles.options}>
				<Select value={regionId} options={regionOptions} onChange={handleRegionChange} />
				<SectorChangeButton onClick={openSectorSelectorPanel} label="Selected Site:" labelValue={ALL_SOUNDING_SITES[siteId as string].name} />
			</div>
			<div className={styles.products}>
				{productsArray.map(({ id, label }) => {
					// Handle text product differently - use custom handler instead of routing
					if (id === SOUNDING_PRODUCT_TEXT) {
						return (
							<SidebarLink
								key={id}
								name={label}
								active={id === productId}
								onClick={handleSoundingText}
							/>
						)
					}

					// All other products use normal routing
					return (
						<SidebarLink
							key={id}
							name={label}
							active={id === productId}
							linkUrl={`/weather-data/analysis/soundings/${id}/${regionId}/${siteId}`}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default SoundingsPanel
