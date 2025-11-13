import styles from './VideoBlock.module.scss'

interface VideoBlockProps {
	name?: string
}

export const VideoBlock = ({ name }: VideoBlockProps) => {
	return (
		<section className={styles.videoBlock}>
			<div className={styles.placeholder}>Video Block{name ? `: ${name}` : ''}</div>
		</section>
	)
}

export default VideoBlock
