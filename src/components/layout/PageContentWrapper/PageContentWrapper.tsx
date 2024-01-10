import styles from './PageContentWrapper.module.scss'

const PageContentWrapper = ({ children }) => {
	return <div className={styles.PageContentWrapper}>{children}</div>
}

export default PageContentWrapper
