import { useRootStore } from '@/store/useRootStore'
import { useAnimator } from '../Animator'
import AnimatorControls from '../AnimatorControls/AnimatorControls'
import AnimatorImageSizer from '../AnimatorImageSizer/AnimatorImageSizer'
import styles from './AnimatorLayout.module.scss'

const AnimatorLayout = () => {
	const closeMobileSidebarMenu = useRootStore.use.closeMobileSidebarMenu()
	const { hideControls } = useAnimator() || { hideControls: false }
	return (
		<div
			className={`${styles.animator} ${hideControls ? 'hideControls' : ''}`}
			onClick={() => {
				closeMobileSidebarMenu()
			}}
		>
			<div className={styles.animatorOuterImageContainer}>
				<AnimatorImageSizer />
			</div>
			<AnimatorControls />
		</div>
	)
}

export default AnimatorLayout
