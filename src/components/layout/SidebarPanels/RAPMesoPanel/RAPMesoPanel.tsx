'use client'

import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_RAPMESO_PRODUCTS } from '@/data/analysis/rap-mesoanalysis/products'
import { useParams, useRouter } from 'next/navigation'

import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import styles from './RAPMesoPanel.module.scss'

interface RAPMesoPanelProps {
	basepath: string
}

export const RAPMesoPanel = ({ basepath }: RAPMesoPanelProps) => {
	const router = useRouter()
	const { productId, siteId, regionId } = useParams()

	const productsArray = Object.keys(ALL_RAPMESO_PRODUCTS).map((productId) => {
		return { id: productId, label: ALL_RAPMESO_PRODUCTS[productId].label }
	})

	return (
		<div className={styles.RAPMesoPanel}>
			<SidebarSectionHeader name="RAPMeso" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				{productsArray.map(({ id, label }) => (
					<SidebarLink key={id} name={label} linkUrl={`/weather-data/analysis/rap-mesoanalysis/${id}`} />
				))}
			</SidebarPanelPad>
		</div>
	)
}

export default RAPMesoPanel
