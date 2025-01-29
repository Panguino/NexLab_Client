import { RichText } from '@/components/elements/RichText/RichText'
import { RichTextContent } from '@/types/RichTextTypes'
import React from 'react'
import styles from './ProductInfo.module.scss'

export interface ProductInfoProps {
	info?: RichTextContent | string
	image?: string
	description?: RichTextContent | string
}

const ProductInfo: React.FC<ProductInfoProps> = ({ info, image, description }) => {
	const renderContent = (content?: RichTextContent | string) => {
		if (typeof content === 'string') {
			return <p>{content}</p>
		} else if (content) {
			return <RichText text={content} />
		}
		return null
	}

	return (
		<div className={styles.productInfo}>
			<div className={styles.productInfoColumnLeft}>{info && renderContent(info)}</div>
			<div className={styles.productInfoColumnCenter}>{image && <img src={image} alt="Product" />}</div>
			<div className={styles.productInfoColumnRight}>{description && renderContent(description)}</div>
		</div>
	)
}

export default ProductInfo
