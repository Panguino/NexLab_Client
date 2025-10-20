import { useRootStore } from '@/store/useRootStore'
import { useAnimator } from '../Animator'
import AnimatorControls from '../AnimatorControls/AnimatorControls'
import AnimatorImageSizer from '../AnimatorImageSizer/AnimatorImageSizer'
import AnimatorMapSizer from '../AnimatorMapSizer/AnimatorMapSizer'
import styles from './AnimatorLayout.module.scss'

const AnimatorLayout = () => {
	const closeMobileSidebarMenu = useRootStore.use.closeMobileSidebarMenu()
	const { hideControls, mode } = useAnimator() || { hideControls: false, mode: 'image' }

	// Render appropriate sizer based on mode
	const renderSizer = () => {
		if (mode === 'map') {
			return <AnimatorMapSizer />
		}
		return <AnimatorImageSizer />
	}

	return (
		<div
			className={`${styles.animator} ${hideControls ? 'hideControls' : ''}`}
			onClick={() => {
				closeMobileSidebarMenu()
			}}
		>
			<div className={styles.animatorOuterImageContainer}>{renderSizer()}</div>
			<AnimatorControls />
		</div>
	)
}

export default AnimatorLayout
