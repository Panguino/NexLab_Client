import { getProductInfoById } from '@/apollo/strapi/getProductInfoById'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { useRootStore } from '@/store/useRootStore'
import { useEffect, useState } from 'react'
import ProductInfo from './ProductInfo/ProductInfo'
import styles from './ProductInfoPanel.module.scss'

// TODO: Replace with actual fetch logic for product info by id
const fetchProductInfoById = async (id: string) => {
	const info = await getProductInfoById(id)
	return info
}

export const ProductInfoPanel = () => {
	const [info, setInfo] = useState<any>(null)
	const productInfoId = useRootStore.use.productInfoId()

	useEffect(() => {
		if (productInfoId) {
			fetchProductInfoById(productInfoId).then(setInfo)
		}
	}, [productInfoId])

	if (!productInfoId || productInfoId === '') return null
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
