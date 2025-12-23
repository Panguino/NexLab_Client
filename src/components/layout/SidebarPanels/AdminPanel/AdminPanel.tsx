'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { ADMIN_TEXT_PRODUCT_IDS, ADMIN_TEXT_PRODUCTS } from '@/data/text/administrative/products'
import { getAdminTextProducts } from '@/util/dataCalls/text/query-administrative'

interface AdminPanelProps {
	basepath: string
}

interface AdminProductEntry {
	location: string
	office: string
	title: string
	url: string
}

interface AdminProductCategory {
	[productKey: string]: AdminProductEntry
}

interface AdminData {
	[productTypeId: string]: AdminProductCategory
}

const AdminPanel = ({ basepath }: AdminPanelProps) => {
	const { adminOfficeId, adminProdId } = useParams()
	const [adminData, setAdminData] = useState<AdminData | null>(null)

	// Full path to Admin section
	const adminBasePath = `${basepath}/admin-products`

	// Fetch admin products on mount
	useEffect(() => {
		const fetchAdminProducts = async () => {
			try {
				const data = await getAdminTextProducts()
				setAdminData(data)
			} catch (error) {
				console.error('Failed to fetch admin products:', error)
				setAdminData(null)
			}
		}

		fetchAdminProducts()
	}, [])

	return (
		<>
			<SidebarSectionHeader name="Administrative" linkUrl={basepath} />
			{ADMIN_TEXT_PRODUCT_IDS.map((productId) => {
				const productCategory = adminData?.[productId]
				return (
					<SidebarGroup key={productId} title={ADMIN_TEXT_PRODUCTS[productId].name}>
						<SidebarGrid columns={2}>
							{productCategory ? (
								Object.entries(productCategory)
									.sort(([, a], [, b]) => a.location.localeCompare(b.location))
									.map(([productKey, entry]) => (
										<SidebarLink
											key={productKey}
											name={`${entry.location} - (${entry.office})`}
											linkUrl={`${adminBasePath}/${entry.office}/${productKey}/latest`}
											active={adminOfficeId === entry.office && adminProdId === productKey}
										/>
									))
							) : (
								<SidebarLink name="Loading..." linkUrl="" />
							)}
						</SidebarGrid>
					</SidebarGroup>
				)
			})}
		</>
	)
}

export default AdminPanel
