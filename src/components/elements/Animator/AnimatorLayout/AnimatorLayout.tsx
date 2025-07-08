import { useRootStore } from '@/store/useRootStore'
import { useAnimator } from '../Animator'
import AnimatorControls from '../AnimatorControls/AnimatorControls'
import AnimatorImageSizer from '../AnimatorImageSizer/AnimatorImageSizer'
import styles from './AnimatorLayout.module.scss'

const AnimatorLayout = () => {
	const closeMobileSidebarMenu = useRootStore.use.closeMobileSidebarMenu()
	const { hideControls } = useAnimator()
	return (
		<div
			className={styles.animator}
			onClick={() => {
				closeMobileSidebarMenu()
			}}
		>
			<div className={styles.animatorOuterImageContainer}>
				<AnimatorImageSizer />
			</div>
			{!hideControls && <AnimatorControls />}
		</div>
	)
}

export default AnimatorLayout
