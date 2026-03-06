'use client'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { CONVECTIVE_CATEGORIES, CONVECTIVE_PRODUCTS } from '@/data/text/convective/products'
import { usePathname, useRouter } from 'next/navigation'
import styles from './ConvectivePanel.module.scss'

interface ConvectivePanelProps {
	basepath: string
}

const ConvectivePanel = ({ basepath }: ConvectivePanelProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const convectiveBasePath = `${basepath}/spc-convective-weather`

	// Check if we're deeper than the main convective page
	const isOnSubpage = pathname !== convectiveBasePath && pathname.startsWith(convectiveBasePath)

	return (
		<>
			<SidebarSectionHeader name="Convective" linkUrl={basepath} />

			{isOnSubpage && (
				<div className={styles.backToMain}>
					<button onClick={() => router.push(convectiveBasePath)} className={styles.backButton}>
						&larr; Return to Convective Main
					</button>
				</div>
			)}

			<div className={styles.panelContainer}>
				{Object.entries(CONVECTIVE_CATEGORIES).map(([categoryId, category]) => (
					<SidebarGroup key={categoryId} title={category.title}>
						{category.products.map((productId) => {
							const product = CONVECTIVE_PRODUCTS[productId]
							const hasDirectLink = product.linkUrl !== null
							return (
								<SidebarLink
									key={productId}
									name={product.title}
									linkUrl={hasDirectLink ? `${convectiveBasePath}${product.linkUrl}` : ''}
								/>
							)
						})}
					</SidebarGroup>
				))}
			</div>
		</>
	)
}

export default ConvectivePanel
