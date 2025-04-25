import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Option } from '../Select/Select'
import styles from './SelectGrouped.module.scss'

interface GroupOption {
	label: string
	options: Option[]
}

interface SelectGroupedProps {
	value: string | number | null
	options: GroupOption[]
	onChange: (value: string | number | null) => void
	placeholder?: string
	optionsEmptyText?: string
}

const SelectGrouped: React.FC<SelectGroupedProps> = ({
	value,
	options,
	onChange,
	placeholder = 'Select Option',
	optionsEmptyText = 'No options',
}) => {
	const [open, setOpen] = useState(false)
	const [simplifiedOptions, setSimplifiedOptions] = useState<Option[]>([])
	const wrapperRef = useRef(null)

	useEffect(() => {
		const newOptions = []
		options.forEach((group) => {
			group.options.map((option) => {
				newOptions.push(option)
			})
		})
		setSimplifiedOptions(newOptions)
	}, [options])

	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setOpen(false)
		}
	}

	const optionSelected = (event, selectedOption) => {
		event.stopPropagation()
		const selection = simplifiedOptions.find((option) => option.value === selectedOption.value).value
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
		if (value && simplifiedOptions) {
			const foundValue = simplifiedOptions.find((option) => option.value === value)?.value
			if (foundValue !== value) {
				onChange(foundValue)
			}
		}
	}, [value, simplifiedOptions, onChange])

	const foundValue: any = options.reduce((result, group) => {
		if (result) return result // If already found, skip further iterations
		const option = group.options.find((opt) => opt.value === value)
		if (option) {
			return { group: group.label, option: option.label }
		}
		return null
	}, null)

	console.log('foundValue', foundValue)

	return (
		<div className={styles.SelectGrouped}>
			<div className={styles.select} ref={wrapperRef} onClick={() => setOpen((prevOpen) => !prevOpen)}>
				{foundValue && foundValue.group && foundValue.option ? (
					<div className={styles.selectedValue}>
						<b>{foundValue.group}</b>
						<div>{foundValue.option}</div>
					</div>
				) : (
					placeholder && <label>{placeholder}</label>
				)}

				<motion.div className={styles.arrow} animate={{ transform: `${open ? 'rotate(180deg)' : 'rotate(0deg)'}` }}>
					<FontAwesomeIcon icon={faChevronDown} />
				</motion.div>
				{open &&
					(options.length ? (
						<div className={styles.options}>
							<ScrollArea>
								{options.map(({ options: group, label }, index) => (
									<div className={styles.group} key={index}>
										<div className={styles.groupLabel}>{label}</div>
										{group.map((option, index) => (
											<div className={styles.option} key={index} onClick={(event) => optionSelected(event, option)}>
												{option.label}
											</div>
										))}
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

export default SelectGrouped
