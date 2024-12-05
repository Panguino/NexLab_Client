// src/components/ProductInfo/ProductInfo.tsx
import { RichText } from '@/components/elements/RichText/RichText'
import { RichTextContent } from '@/types/RichTextTypes'
import React from 'react'
import styles from './ProductInfo.module.scss'

interface ProductInfoProps {
	info?: RichTextContent
	image?: string
	description?: string
}

const ProductInfo: React.FC<ProductInfoProps> = ({ info, image, description }) => {
	return (
		<div className={styles.productInfo}>
			<div className={styles.productInfoColumnLeft}>{info && <RichText text={info} />}</div>
			<div className={styles.productInfoColumnCenter}>{image && <img src={image} alt="Product" />}</div>
			<div className={styles.productInfoColumnRight}>{description}</div>
		</div>
	)
}

export default ProductInfo
