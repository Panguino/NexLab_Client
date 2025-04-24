import styles from './WidgetWrapper.module.scss'

interface WidgetWrapperProps {
	children: React.ReactNode
}

const WidgetWrapper = ({ children }: WidgetWrapperProps) => (
	<div className={styles.widgetWrapper}>
		<h2>Campus Weather Service</h2>
		<p>
			Campus Weather is a free service provided by the College of DuPage Meteorology Department to serve the local schools within Community
			College District 502.
		</p>
		{children}
	</div>
)
export default WidgetWrapper
