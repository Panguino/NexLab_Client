import styles from './ImageBlock.module.scss'

interface ImageData {
	url: string | null
	size?: string | null
}

interface ImageBlockProps {
	image: ImageData
}

export const ImageBlock = ({ image }: ImageBlockProps) => {
	if (!image?.url) return null
	const sizeClass = image.size ? styles[image.size] || '' : ''
	return (
		<section className={`${styles.imageBlock} ${sizeClass}`.trim()}>
			<div className={styles.inner}>
				<img src={image.url} alt="" />
			</div>
		</section>
	)
}

export default ImageBlock
