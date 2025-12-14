'use client'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { FIRE_DROUGHT_DISCUSSION_PRODUCTS, FIRE_DROUGHT_GRAPHICAL_ANALYSIS, FIRE_DROUGHT_GRAPHICAL_PRODUCTS } from '@/data/text/fire/products'
import styles from './FirePanel.module.scss'

interface FirePanelProps {
	basepath: string
}

const FirePanel = ({ basepath }: FirePanelProps) => {
	const fireBasePath = `${basepath}/fire-drought`

	return (
		<>
			<SidebarSectionHeader name="Fire & Drought" linkUrl={basepath} />
			<div className={styles.panelContainer}>
				<SidebarGroup title="Discussions and Outlooks">
					{Object.entries(FIRE_DROUGHT_DISCUSSION_PRODUCTS).map(([productId, product]) => (
						<SidebarLink key={productId} name={product.name} linkUrl={`${fireBasePath}/${product.linkUrl}`} />
					))}
				</SidebarGroup>

				<SidebarGroup title="Active Fire & Drought Hazards">
					<SidebarLink name="View Hazards Map/Table" linkUrl={`${fireBasePath}/hazards`} />
				</SidebarGroup>

				<SidebarGroup title="Graphical Analysis Products">
					{FIRE_DROUGHT_GRAPHICAL_PRODUCTS.map((group) => (
						<div key={group.id} className={styles.productSection}>
							<span className={styles.productTitle}>{`${group.name}:`}</span>
							<SidebarGrid columns={2}>
								{group.products.map((productId) => {
									const product = FIRE_DROUGHT_GRAPHICAL_ANALYSIS[productId]
									return <SidebarLink key={productId} name={product.name} linkUrl={`${fireBasePath}/${product.linkUrl}`} />
								})}
							</SidebarGrid>
						</div>
					))}
				</SidebarGroup>
			</div>
		</>
	)
}

export default FirePanel
