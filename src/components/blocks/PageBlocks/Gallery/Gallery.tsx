import styles from './Gallery.module.scss'

interface GalleryProps {
	name?: string
}

export const Gallery = ({ name }: GalleryProps) => {
	return (
		<section className={styles.gallery}>
			<div className={styles.placeholder}>Gallery Block{name ? `: ${name}` : ''}</div>
		</section>
	)
}

export default Gallery
