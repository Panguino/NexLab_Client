import styles from './LoadingPanel.module.scss'

const LoadingPanel = ({ size = 0.5, hideText = false }) => {
	return (
		<div
			className={styles.LoadingPanel}
			style={{
				transform: `scale(${size.toFixed(2)})`,
			}}
		>
			<video autoPlay={true} muted playsInline loop>
				<source src="/vid/loading.webm" type="video/webm" />
			</video>
			{!hideText && <p>Loading...</p>}
		</div>
	)
}

export default LoadingPanel
