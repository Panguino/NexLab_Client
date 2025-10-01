import { RichText } from '@/components/elements/RichText/RichText'
import { RichTextContent } from '@/types/RichTextTypes'
import React from 'react'
import styles from './ProductInfo.module.scss'

export interface ProductInfoProps {
	name: string
	image?: string
	description?: RichTextContent | string
}

const ProductInfo: React.FC<ProductInfoProps> = ({ name, image, description }) => {
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
			<h2>{name}</h2>
			{image && <img src={image} alt="Product" />}
			<div>{description && renderContent(description)}</div>
		</div>
	)
}

export default ProductInfo
