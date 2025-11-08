import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './SelectSearchable.module.scss'

export interface Option {
	label: string
	value: any
}

interface SelectSearchableProps {
	value: any
	options: Option[]
	onChange: (value: any) => void
	title?: string | null
	placeholder?: string
	optionsEmptyText?: string
}

const SelectSearchable: React.FC<SelectSearchableProps> = ({
	value,
	options,
	onChange,
	title = null,
	placeholder = '',
	optionsEmptyText = 'No options',
}) => {
	const [open, setOpen] = useState(false)
	const [searchMode, setSearchMode] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)
	// Random number gen for Unique ID for any instance of Select, used to handle open/close events
	const idRef = useRef<string>(Math.random().toString(36).slice(2))

	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setOpen(false)
			setSearchMode(false)
			setSearchQuery('')
		}
	}

	const optionSelected = (event, selectedOption) => {
		event.stopPropagation()
		const selection = options.find((option) => option.value === selectedOption.value).value
		onChange(selection)
		setOpen(false)
		setSearchMode(false)
		setSearchQuery('')
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		const handleOtherOpen = (e: Event) => {
			try {
				const detail = (e as CustomEvent).detail
				if (detail !== idRef.current) {
					setOpen(false)
					setSearchMode(false)
					setSearchQuery('')
				}
			} catch (e) {
				// ignore
			}
		}
		document.addEventListener('select-open', handleOtherOpen as EventListener)
		return () => {
			document.removeEventListener('click', handleClickOutside)
			document.removeEventListener('select-open', handleOtherOpen as EventListener)
		}
	}, [])

	useEffect(() => {
		if (value && options) {
			const foundValue = options.find((option) => option.value === value)?.value
			if (foundValue !== value) {
				onChange(foundValue)
			}
		}
	}, [value, options, onChange])

	// Focus input when entering search mode
	useEffect(() => {
		if (searchMode && inputRef.current) {
			inputRef.current.focus()
		}
	}, [searchMode])

	const foundValue = options.find((option) => option.value === value)

	const toggleOpen = () => {
		if (!open) {
			// notify other selects that this one is opening
			try {
				document.dispatchEvent(new CustomEvent('select-open', { detail: idRef.current }))
			} catch (e) {
				// ignore in environments that don't support CustomEvent
			}
		}
		setOpen((prevOpen) => !prevOpen)
		setSearchMode(false)
		setSearchQuery('')
	}

	const toggleSearch = (event) => {
		event.stopPropagation()
		if (!searchMode) {
			// notify other selects that this one is opening
			try {
				document.dispatchEvent(new CustomEvent('select-open', { detail: idRef.current }))
			} catch (e) {
				// ignore in environments that don't support CustomEvent
			}
			setSearchMode(true)
			setOpen(true)
		}
	}

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value)
		if (!open) {
			setOpen(true)
		}
	}

	// Filter options based on search query
	const filteredOptions = searchQuery
		? options.filter((option) => {
				const query = searchQuery.toLowerCase()
				const labelMatch = option.label.toLowerCase().includes(query)
				const valueMatch = String(option.value).toLowerCase().includes(query)
				return labelMatch || valueMatch
			})
		: options

	return (
		<div ref={wrapperRef} className={styles.wrapper}>
			{title && <span className={styles.title}>{title}</span>}
			<div className={`${styles.select} ${title ? styles.withTitle : ''}`} onClick={toggleOpen}>
				{searchMode ? (
					<input
						ref={inputRef}
						type="text"
						className={styles.searchInput}
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder={placeholder || 'Search...'}
						onClick={(e) => e.stopPropagation()}
					/>
				) : (
					<>
						{!foundValue && placeholder && <label>{placeholder}</label>}
						{foundValue && foundValue.label && <div className={styles.value}>{foundValue.label}</div>}
					</>
				)}

				<div className={styles.icons}>
					<div className={styles.searchIcon} onClick={toggleSearch}>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</div>
					<motion.div className={styles.arrow} animate={{ transform: `${open ? 'rotate(180deg)' : 'rotate(0deg)'}` }}>
						<FontAwesomeIcon icon={faChevronDown} />
					</motion.div>
				</div>

				{open &&
					(filteredOptions.length ? (
						<div className={styles.options}>
							<ScrollArea>
								{filteredOptions.map((option, index) => (
									<div className={styles.option} key={index} onClick={(event) => optionSelected(event, option)}>
										{option.label}
									</div>
								))}
							</ScrollArea>
						</div>
					) : (
						<div className={styles.options}>
							<div className={styles.option}>{searchQuery ? 'No matching options' : optionsEmptyText}</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default SelectSearchable
