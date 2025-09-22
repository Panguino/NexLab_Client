import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './ValidtimeSelect.module.scss'

export interface Option {
	label?: string
	value: any
}

interface SelectProps {
	value: any
	// options can be either a flat array or grouped by date
	options: Option[] | Array<{ title: string; options: Option[] }>
	onChange: (value: any) => void
	title?: string | null
	placeholder?: string
	optionsEmptyText?: string
}

const ValidtimeSelect: React.FC<SelectProps> = ({ value, options, onChange, title = null, placeholder = '', optionsEmptyText = 'No options' }) => {
	const [open, setOpen] = useState(false)
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	// Random number gen for Unique ID for any instance of Select, used to handle open/close events
	const idRef = useRef<string>(Math.random().toString(36).slice(2))

	const handleClickOutside = (event: any) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setOpen(false)
		}
	}

	const optionSelected = useMemo(() => {
		return (event: any, selectedOption: Option) => {
			event.stopPropagation()
			if (selectedOption && selectedOption.value !== undefined) onChange(selectedOption.value)
			setOpen(false)
		}
	}, [onChange])

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

	// no normalization effect here; grouping happens below and selection is based on grouped options

	let foundValue: Option | undefined = undefined

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

	// formatter for unix timestamps into 'HHZ MM/DD/YY'
	const formatValidTimeLabel = (ts: string | number) => {
		const n = Number(ts)
		if (Number.isNaN(n)) return String(ts)
		const ms = n > 1e12 ? n : n * 1000
		const d = new Date(ms)
		const hh = String(d.getUTCHours()).padStart(2, '0')
		const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
		const dd = String(d.getUTCDate()).padStart(2, '0')
		const yy = String(d.getUTCFullYear() % 100).padStart(2, '0')
		return `${hh}Z ${mm}/${dd}/${yy}`
	}

	const isGrouped = Array.isArray(options) && options.length && (options[0] as any).options
	const flatOptions: Option[] = useMemo(() => (!isGrouped && Array.isArray(options) ? (options as Option[]) : []), [options, isGrouped])

	const groupedOptions = useMemo(() => {
		if (isGrouped) return options as Array<{ title: string; options: Option[] }>
		const groups = new Map<string, Option[]>()
		flatOptions.forEach((opt) => {
			const formatted = opt.label ?? formatValidTimeLabel(opt.value)
			const parts = String(formatted).split(' ')
			const datePart = parts.slice(1).join(' ') || ''
			const hhz = parts[0] || String(formatted)
			const displayOpt: Option = { value: opt.value, label: hhz }
			if (!groups.has(datePart)) groups.set(datePart, [])
			groups.get(datePart)!.push(displayOpt)
		})
		return Array.from(groups.entries()).map(([, opts]) => ({
			title: opts.length ? String(formatValidTimeLabel(opts[0].value)).split(' ').slice(1).join(' ') : '',
			options: opts,
		}))
	}, [options, flatOptions, isGrouped])

	// find the selected value in groupedOptions first, then fall back to flatOptions
	if (groupedOptions && groupedOptions.length) {
		outer: for (const grp of groupedOptions) {
			for (const o of grp.options) {
				if (String(o.value) === String(value)) {
					foundValue = o
					break outer
				}
			}
		}
	}
	if (!foundValue && flatOptions && flatOptions.length) {
		const m = flatOptions.find((o) => String(o.value) === String(value))
		if (m) {
			// ensure label is HHZ for display
			foundValue = { value: m.value, label: m.label ?? String(formatValidTimeLabel(m.value)).split(' ')[0] }
		}
	}

	const optionsContent = useMemo(() => {
		if (groupedOptions && groupedOptions.length) {
			return groupedOptions.map((grp, gi) => (
				<div className={styles.group} key={gi}>
					<div className={styles.groupTitle}>{grp.title}</div>
					<div className={styles.grid}>
						{grp.options.map((option, index) => (
							<div
								data-value={String(option.value)}
								className={`${styles.option} ${String(option.value) === String(value) ? styles.selected : ''}`}
								key={index}
								onClick={(event) => optionSelected(event, option)}
								aria-selected={String(option.value) === String(value)}
							>
								{option.label}
							</div>
						))}
					</div>
				</div>
			))
		}
		if (flatOptions.length) {
			return (
				<div className={styles.grid}>
					{flatOptions.map((opt, index) => {
						const label = opt.label ?? String(formatValidTimeLabel(opt.value)).split(' ')[0]
						return (
							<div
								data-value={String(opt.value)}
								className={`${styles.option} ${String(opt.value) === String(value) ? styles.selected : ''}`}
								key={index}
								onClick={(event) => optionSelected(event, { ...opt, label })}
								aria-selected={String(opt.value) === String(value)}
							>
								{label}
							</div>
						)
					})}
				</div>
			)
		}
		return <div className={styles.option}>{optionsEmptyText}</div>
	}, [groupedOptions, flatOptions, optionsEmptyText, optionSelected, value])

	// flattened ordered values (strings) for prev/next navigation
	const orderedValues = useMemo(() => {
		if (groupedOptions && groupedOptions.length) {
			const vals: string[] = []
			for (const grp of groupedOptions) {
				for (const o of grp.options) vals.push(String(o.value))
			}
			return vals
		}
		return flatOptions.map((o) => String(o.value))
	}, [groupedOptions, flatOptions])

	const handlePrevClick = (e: any) => {
		e.stopPropagation()
		if (!orderedValues || orderedValues.length === 0) return
		const idx = orderedValues.findIndex((v) => String(v) === String(value))
		if (idx > 0) {
			onChange(orderedValues[idx - 1])
		}
	}

	const handleNextClick = (e: any) => {
		e.stopPropagation()
		if (!orderedValues || orderedValues.length === 0) return
		const idx = orderedValues.findIndex((v) => String(v) === String(value))
		if (idx >= 0 && idx < orderedValues.length - 1) {
			onChange(orderedValues[idx + 1])
		}
	}

	// when opened, scroll the selected option's group into view at the top so the group heading is visible
	useEffect(() => {
		if (!open) return
		try {
			const root = wrapperRef.current
			if (!root) return
			const selector = `[data-value='${String(value)}']`
			const el = root.querySelector(selector) as HTMLElement | null
			if (!el) return
			// try to find the nearest group container and scroll it to the top of the scroll area
			const groupEl = el.closest(`.${styles.group}`) as HTMLElement | null
			if (groupEl && typeof groupEl.scrollIntoView === 'function') {
				groupEl.scrollIntoView({ block: 'start' })
				return
			}
			// fallback: scroll the option itself to the start
			if (typeof el.scrollIntoView === 'function') {
				el.scrollIntoView({ block: 'start' })
			}
		} catch (e) {
			// ignore any query/scroll errors
		}
	}, [open, value])

	return (
		<div ref={wrapperRef} className={styles.wrapper}>
			{title && <span className={styles.title}>{title}</span>}
			<div className={styles.selectRow}>
				<button
					type="button"
					className={styles.navButton}
					onClick={handlePrevClick}
					aria-label="Previous valid time"
					disabled={orderedValues.findIndex((v) => String(v) === String(value)) <= 0}
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>

				<div className={`${styles.select} ${title ? styles.withTitle : ''}`} onClick={toggleOpen}>
					{!foundValue && placeholder && <label>{placeholder}</label>}
					{foundValue && <div className={styles.value}>{String(formatValidTimeLabel(foundValue.value))}</div>}

					<motion.div className={styles.arrow} animate={{ transform: `${open ? 'rotate(180deg)' : 'rotate(0deg)'}` }}>
						<FontAwesomeIcon icon={faChevronDown} />
					</motion.div>

					{open && (
						<div className={styles.options}>
							<ScrollArea>{optionsContent}</ScrollArea>
						</div>
					)}
				</div>

				<button
					type="button"
					className={styles.navButton}
					onClick={handleNextClick}
					aria-label="Next valid time"
					disabled={
						orderedValues.findIndex((v) => String(v) === String(value)) < 0 ||
						orderedValues.findIndex((v) => String(v) === String(value)) >= orderedValues.length - 1
					}
				>
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			</div>
		</div>
	)
}

export default ValidtimeSelect
