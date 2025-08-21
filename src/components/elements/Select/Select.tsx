import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './Select.module.scss'

export interface Option {
	label: string
	value: any
}

interface SelectProps {
	value: any
	options: Option[]
	onChange: (value: any) => void
	title?: string | null
	placeholder?: string
	optionsEmptyText?: string
}

const Select: React.FC<SelectProps> = ({ value, options, onChange, title = null, placeholder = '', optionsEmptyText = 'No options' }) => {
	const [open, setOpen] = useState(false)
	const wrapperRef = useRef(null)
	// Random number gen for Unique ID for any instance of Select, used to handle open/close events
	const idRef = useRef<string>(Math.random().toString(36).slice(2))

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
		const handleOtherOpen = (e: Event) => {
			try {
				const detail = (e as CustomEvent).detail
				if (detail !== idRef.current) setOpen(false)
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
	}

	return (
		<div className={styles.wrapper}>
			{title && <span className={styles.title}>{title}</span>}
			<div className={`${styles.select} ${title ? styles.withTitle : ''}`} onClick={toggleOpen}>
				{!foundValue && placeholder && <label>{placeholder}</label>}
				{foundValue && foundValue.label && <div className={styles.value}>{foundValue.label}</div>}

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
