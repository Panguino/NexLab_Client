import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './Select.module.scss'

const Select = ({ value, options, onChange, placeholder, optionsEmptyText = 'No options' }) => {
	const [open, setOpen] = useState(false)
	const wrapperRef = useRef(null)

	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setOpen(false)
		}
	}

	const optionSelected = (event, selectedOption) => {
		event.stopPropagation()
		const selection = options.find((option) => option.value === selectedOption.value).value
		onChange(selection)
		setOpen(false)
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	useEffect(() => {
		if (value && options) {
			const foundValue = options.find((option) => option.value === value).value
			if (foundValue) {
				onChange(foundValue)
			}
		}
	}, [value, options, onChange])

	const foundValue = options.find((option) => option.value === value)

	return (
		<div className={styles.wrapper}>
			<div className={styles.select} ref={wrapperRef} onClick={() => setOpen((prevOpen) => !prevOpen)}>
				{!foundValue && placeholder && <label>{placeholder}</label>}
				{foundValue.label && <div className={styles.value}>{foundValue.label}</div>}

				<motion.div className={styles.arrow} animate={{ transform: `${open ? 'rotate(180deg)' : 'rotate(0deg)'}` }}>
					<FontAwesomeIcon icon={faChevronDown} />
				</motion.div>
				{open &&
					(options.length ? (
						<div className={styles.options}>
							<ScrollArea>
								{options.map((option, index) => (
									<div className={styles.option} key={index} onClick={(event) => optionSelected(event, option)}>
										{option.label}
									</div>
								))}
							</ScrollArea>
						</div>
					) : (
						<div className={styles.options}>
							<div className={styles.option}>{optionsEmptyText}</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default Select
