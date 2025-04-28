'use client'

import { Button } from '@/components/elements/Button/Button'
import Select from '@/components/elements/Select/Select'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { ALL_NEXRAD_GROUPS, NEXRAD_GROUPS, NEXRAD_PRODUCTS } from '@/data/nexrad/products'
import { NEXRAD_REGIONS } from '@/data/nexrad/regions'
import { NEXRAD_SITES } from '@/data/nexrad/sites'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './NexradSidebarPanel.module.scss'

const NexradSidebarPanel = () => {
	const router = useRouter()
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	const { productId, siteId, regionId } = useParams()

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((sectorId) => {
			closeSectorSelectorPanel()
			router.push(`/weather-data/nexrad-dual-pol-radar/${productId}/${regionId}/${sectorId}`)
		})
	}, [productId, regionId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler])

	useEffect(() => {
		const region = NEXRAD_REGIONS[regionId as string]
		const newD3config = {
			rotate: region.rotate,
			scale: region.scale,
		}
		setSectorSelectorD3config(newD3config)
		const selectedSectors = region.sites.map((siteId) => ({
			id: siteId,
			name: NEXRAD_SITES[siteId].name,
			type: NEXRAD_SITES[siteId].type,
			coordinates: NEXRAD_SITES[siteId].coordinates,
		}))
		setSectorSelectorSectors(selectedSectors)
	}, [regionId, setSectorSelectorD3config, setSectorSelectorSectors])

	const handleRegionChange = (newRegionId) => {
		router.push(`/weather-data/nexrad-dual-pol-radar/${productId}/${newRegionId}/${siteId}`)
		openSectorSelectorPanel()

		/*

		 .replace(
        {
          pathname: router.pathname,
          query: {
            ...newQuery,
            stats: newStatsParam,
            view: e.target.value as string
          }
        },
        undefined,
        { shallow: true }
      )
      .then(() => {
        mpEventFilterChange('view', e.target.value as string);
      });

	  */
	}

	const regionOptions = Object.keys(NEXRAD_REGIONS).map((regionId) => {
		return { value: regionId, label: NEXRAD_REGIONS[regionId].label }
	})
	const productsArray = NEXRAD_SITES[siteId as string].products

	const transformData = (productsArray, allNexradGroups, nexradGroups, nexradProducts, NEXRAD_SITES, nexradSite) => {
		const transformedData = allNexradGroups.map((groupId) => {
			const group = nexradGroups[groupId]
			const products = productsArray
				.filter((productId) => group.products.includes(productId))
				.map((productId) => ({
					id: productId,
					label: nexradProducts[productId].label,
					limited: NEXRAD_SITES[nexradSite].limited === true ? nexradProducts[productId].limited : false,
				}))

			return {
				groupId,
				label: group.label,
				sublabel: group.sublabel,
				columns: group.columns,
				products,
			}
		})

		return transformedData
	}
	const panelGroupedProducts = transformData(productsArray, ALL_NEXRAD_GROUPS, NEXRAD_GROUPS, NEXRAD_PRODUCTS, NEXRAD_SITES, siteId)

	return (
		<ScrollArea>
			<div className={styles.NexradSidebarPanel}>
				<div className={styles.options}>
					<Select value={regionId} options={regionOptions} onChange={handleRegionChange} />
					<Button onClick={openSectorSelectorPanel} label={`Site:  ${siteId} - ${NEXRAD_SITES[siteId as string].name}`} />
				</div>
				{panelGroupedProducts.map(({ groupId, label, sublabel, columns, products }) => (
					<SidebarGroup key={groupId} title={label} extraInfo={sublabel && `(${sublabel})`}>
						<SidebarGrid columns={columns}>
							{products.map(({ id, label, limited }) => (
								<SidebarLink
									key={id}
									name={label}
									linkUrl={`/weather-data/nexrad-dual-pol-radar/${id}/${regionId}/${siteId}`}
									active={id === productId}
									limited={limited}
								/>
							))}
						</SidebarGrid>
					</SidebarGroup>
				))}
			</div>
		</ScrollArea>
	)
}

export default NexradSidebarPanel
