'use client'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_ISENTROPIC_PRODUCTS, ISENTROPIC_PRODUCT_DEFAULT } from '@/data/analysis/isentropic/products'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import styles from './IsentropicPanel.module.scss'

interface IsentropicPanelProps {
	basepath: string
	isActive: boolean
}

export const IsentropicPanel = ({ basepath, isActive }: IsentropicPanelProps) => {
	const router = useRouter()
	const { isentropicProductId: paramProductId } = useParams()
	const productId = paramProductId ?? ISENTROPIC_PRODUCT_DEFAULT

	useEffect(() => {
		if (isActive && !ALL_ISENTROPIC_PRODUCTS[paramProductId as string]) {
			router.push(`/weather-data/analysis/isentropic-maps/${ISENTROPIC_PRODUCT_DEFAULT}`)
		}
	}, [paramProductId, router, isActive])

	const productsArray = Object.keys(ALL_ISENTROPIC_PRODUCTS).map((productId) => {
		return { id: productId, label: ALL_ISENTROPIC_PRODUCTS[productId].label }
	})

	return (
		<div className={styles.IsentropicPanel}>
			<SidebarSectionHeader name="Isentropic Analysis" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<SidebarGroup title="Select a Product">
					<SidebarPanelPad>
						{productsArray.map(({ id, label }) => (
							<SidebarLink key={id} name={label} linkUrl={`/weather-data/analysis/isentropic-maps/${id}`} />
						))}
					</SidebarPanelPad>
				</SidebarGroup>
			</SidebarPanelPad>
		</div>
	)
}

export default IsentropicPanel
