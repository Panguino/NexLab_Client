import { getProductInfoById } from '@/apollo/strapi/getProductInfoById'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { useEffect, useState } from 'react'
import ProductInfo from './ProductInfo/ProductInfo'
import styles from './ProductInfoPanel.module.scss'

interface ProductInfoPanelProps {
	id: string
}

// TODO: Replace with actual fetch logic for product info by id
const fetchProductInfoById = async (id: string) => {
	const info = await getProductInfoById(id)
	return info
}

export const ProductInfoPanel = ({ id }: ProductInfoPanelProps) => {
	const [info, setInfo] = useState<any>(null)

	useEffect(() => {
		if (id) {
			fetchProductInfoById(id).then(setInfo)
		}
	}, [id])

	if (!info) return null

	return (
		<ScrollArea>
			<div className={styles.productInfoPanel}>
				<ProductInfo {...info} />
			</div>
		</ScrollArea>
	)
}

export default ProductInfoPanel
