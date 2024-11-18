import styles from './WidgetWrapper.module.scss'

interface WidgetWrapperProps {
	children: React.ReactNode
}

const WidgetWrapper = ({ children }: WidgetWrapperProps) => (
	<div className={styles.widgetWrapper}>
		<h2 className={styles.widgetWrapperTitle}>Current Users</h2>
		{children}
	</div>
)
export default WidgetWrapper
