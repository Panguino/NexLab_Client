'use client'
import styles from './SearchIcon.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { SEARCH_RESULTS_SLIDEOUT } from '@/config/vars'
import { useRootStore } from '@/store/useRootStore'

const SearchIcon = () => {
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()

	return (
		<div
			className={styles.SearchIcon}
			onClick={() => {
				openSlideoutPanel(SEARCH_RESULTS_SLIDEOUT)
			}}
		>
			<FontAwesomeIcon icon={faMagnifyingGlass} />
		</div>
	)
}
export default SearchIcon
