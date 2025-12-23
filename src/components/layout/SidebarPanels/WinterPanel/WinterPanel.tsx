'use client'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import {
	WINTER_TEXT_OUTLOOKS,
	WINTER_TEXT_PRODUCT_HAZARDS_ID,
	WINTER_TEXT_PRODUCT_HEAVY_SNOW_ICING_DISCUSSION_ID,
	WINTER_TEXT_PRODUCTS,
	WINTER_TEXT_REPORTS,
} from '@/data/text/winter/products'
import { WINTER_TEXT_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { getHeavySnowIceDiscussion } from '@/util/dataCalls/text/query-winter'
import styles from './WinterPanel.module.scss'

interface WinterPanelProps {
	basepath: string
}

const WinterPanel = ({ basepath }: WinterPanelProps) => {
	const setWinterTextContent = useRootStore.use.setWinterTextContent()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()

	const handleDiscussionClick = async () => {
		const productData = await getHeavySnowIceDiscussion()

		if (productData && typeof productData === 'object') {
			setWinterTextContent({
				productData,
				productName: WINTER_TEXT_PRODUCTS[WINTER_TEXT_PRODUCT_HEAVY_SNOW_ICING_DISCUSSION_ID].label,
			})
			openSlideoutPanel(WINTER_TEXT_SLIDEOUT)
		}
	}

	return (
		<>
			<SidebarSectionHeader name="Winter" linkUrl={basepath} />
			<div className={styles.panelContainer}>
				<SidebarGroup title="Active Hazards">
					<SidebarLink name={WINTER_TEXT_PRODUCTS[WINTER_TEXT_PRODUCT_HAZARDS_ID].label} linkUrl={`${basepath}/wpc-winter-weather`} />
				</SidebarGroup>

				<SidebarGroup title="Reported Values">
					{WINTER_TEXT_REPORTS.map((productId) => (
						<SidebarLink
							key={productId}
							name={WINTER_TEXT_PRODUCTS[productId].label}
							linkUrl={`${basepath}/wpc-winter-weather/reports-and-outlooks/${productId}`}
						/>
					))}
				</SidebarGroup>

				<SidebarGroup title="Outlooks">
					<SidebarLink
						name={WINTER_TEXT_PRODUCTS[WINTER_TEXT_PRODUCT_HEAVY_SNOW_ICING_DISCUSSION_ID].label}
						onClick={handleDiscussionClick}
					/>
					{WINTER_TEXT_OUTLOOKS.map((day) => (
						<div key={day.id} className={styles.daySection}>
							<span className={styles.dayTitle}>{`${day.label}:`}</span>
							<SidebarGrid columns={2}>
								{day.products.map((productId) => (
									<SidebarLink
										key={productId}
										name={WINTER_TEXT_PRODUCTS[productId].label}
										linkUrl={`${basepath}/wpc-winter-weather/reports-and-outlooks/${productId}`}
									/>
								))}
							</SidebarGrid>
						</div>
					))}
				</SidebarGroup>
			</div>
		</>
	)
}

export default WinterPanel
