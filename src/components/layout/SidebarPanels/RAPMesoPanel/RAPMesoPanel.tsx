'use client'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_RAPMESO_PRODUCTS, RAPMESO_PRODUCT_DEFAULT } from '@/data/analysis/rap-mesoanalysis/products'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import styles from './RAPMesoPanel.module.scss'

interface RAPMesoPanelProps {
	basepath: string
	isActive: boolean
}

export const RAPMesoPanel = ({ basepath, isActive }: RAPMesoPanelProps) => {
	const router = useRouter()
	const { rapmesoProductId: paramProductId } = useParams()
	const productId = paramProductId ?? RAPMESO_PRODUCT_DEFAULT

	useEffect(() => {
		if (isActive && !ALL_RAPMESO_PRODUCTS[paramProductId as string]) {
			router.push(`/weather-data/analysis/RAP-mesoanalysis/${RAPMESO_PRODUCT_DEFAULT}`)
		}
	}, [paramProductId, router, isActive])

	const productsArray = Object.keys(ALL_RAPMESO_PRODUCTS).map((productId) => {
		return { id: productId, label: ALL_RAPMESO_PRODUCTS[productId].label }
	})

	return (
		<div className={styles.RAPMesoPanel}>
			<SidebarSectionHeader name="RAP Mesoanalysis" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<SidebarGroup title="Select a Product">
					<SidebarPanelPad>
						{productsArray.map(({ id, label }) => (
							<SidebarLink key={id} name={label} active={id === productId} linkUrl={`/weather-data/analysis/RAP-mesoanalysis/${id}`} />
						))}
					</SidebarPanelPad>
				</SidebarGroup>
			</SidebarPanelPad>
		</div>
	)
}

export default RAPMesoPanel
