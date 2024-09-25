'use client'
import { SEARCH_RESULTS_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SearchIcon.module.scss'

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
