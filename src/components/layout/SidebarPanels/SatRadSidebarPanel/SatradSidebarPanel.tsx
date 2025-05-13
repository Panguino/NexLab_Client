'use client'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { ALL_SATRAD_GROUPS, SATRAD_GROUPS, SATRAD_PRODUCTS } from '@/data/satrad/products'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './SatradSidebarPanel.module.scss'

const SatradSidebarPanel = () => {
	// const router = useRouter()
	// const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	// const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	// const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	// const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	// const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	// const { nexradProductId: productId, nexradSiteId: siteId, nexradRegionId: regionId } = useParams()

	const productsArray = Object.entries(SATRAD_PRODUCTS).map(([key, value]) => {
		return {
			id: key,
			label: value.label,
		}
	})

	const transformData = (productsArray, allSatradGroups, satradGroups, satradProducts) => {
		if (!productsArray) return []
		const transformedData = allSatradGroups.map((groupId) => {
			const group = satradGroups[groupId]
			const products = productsArray
				.filter((productId) => group.products.includes(productId))
				.map((productId) => ({
					id: productId,
					label: satradProducts[productId].label,
				}))

			return {
				groupId,
				label: group.label,
				columns: group.columns,
				products,
			}
		})

		return transformedData
	}
	const panelGroupedProducts = transformData(productsArray, ALL_SATRAD_GROUPS, SATRAD_GROUPS, SATRAD_PRODUCTS)

	return (
		<ScrollArea>
			<div className={styles.SatradSidebarPanel}>
				{panelGroupedProducts.map(({ groupId, label, columns, products }) => (
					<SidebarGroup key={groupId} title={label}>
						<SidebarGrid columns={columns}>
							{products.map(({ id, label }) => (
								<SidebarLink key={id} name={label} linkUrl="" />
							))}
						</SidebarGrid>
					</SidebarGroup>
				))}
			</div>
		</ScrollArea>
	)
}

export default SatradSidebarPanel
