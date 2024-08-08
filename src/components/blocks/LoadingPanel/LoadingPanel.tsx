import styles from './LoadingPanel.module.scss'

const LoadingPanel = () => {
	return (
		<div className={styles.LoadingPanel}>
			<video autoPlay={true} muted playsInline loop>
				<source src="/vid/loading.webm" type="video/webm" />
			</video>
			<p>Loading...</p>
		</div>
	)
}

export default LoadingPanel
