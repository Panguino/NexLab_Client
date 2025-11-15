'use client'

import { useCallback } from 'react'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { CONVECTIVE_CATEGORIES, CONVECTIVE_PRODUCTS } from '@/data/text/convective/products'
import styles from './ConvectivePanel.module.scss'

interface ConvectivePanelProps {
	basepath: string
}

const ConvectivePanel = ({ basepath }: ConvectivePanelProps) => {
	const handleProductClick = useCallback((categoryId: string, productId: string) => {
		const categoryTitle = CONVECTIVE_CATEGORIES[categoryId]?.title || 'Unknown Category'
		const productTitle = CONVECTIVE_PRODUCTS[productId]?.title || 'Unknown Product'

		console.log(
			'Convective Product Clicked:\n' +
				`  Category ID: ${categoryId}\n` +
				`  Category Title: ${categoryTitle}\n` +
				`  Product ID: ${productId}\n` +
				`  Product Title: ${productTitle}`,
		)
	}, [])

	return (
		<>
			<SidebarSectionHeader name="Convective" linkUrl={basepath} />
			<div className={styles.panelContainer}>
				{Object.entries(CONVECTIVE_CATEGORIES).map(([categoryId, category]) => (
					<SidebarGroup key={categoryId} title={category.title}>
						{category.products.map((productId) => {
							const product = CONVECTIVE_PRODUCTS[productId]
							return (
								<SidebarLink
									key={productId}
									name={product.title}
									linkUrl=""
									onClick={() => handleProductClick(categoryId, productId)}
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
