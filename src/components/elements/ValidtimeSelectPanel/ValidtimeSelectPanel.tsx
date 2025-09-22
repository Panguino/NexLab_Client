import { useEffect, useMemo, useRef } from 'react'
import styles from './ValidtimeSelectPanel.module.scss'

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
	rowCount?: number
}

const ValidtimeSelectPanel: React.FC<SelectProps> = ({ value, options, onChange, title = null, rowCount = 4 }) => {
	const wrapperRef = useRef<HTMLDivElement | null>(null)

	// click handler inlined in optionsContent to keep dependencies explicit

	// no normalization effect here; grouping happens below and selection is based on grouped options

	let foundValue: Option | undefined = undefined

	// Panel variant: no dropdown toggle; options are rendered inline

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
		const rowClass = rowCount === 6 ? styles['rows-6'] : styles['rows-4']

		if (groupedOptions && groupedOptions.length) {
			return groupedOptions.map((grp, gi) => (
				<div className={styles.group} key={gi}>
					<div className={styles.groupTitle}>{grp.title}</div>
					<div className={`${styles.grid} ${rowClass}`}>
						{grp.options.map((option, index) => (
							<div
								data-value={String(option.value)}
								className={`${styles.option} ${String(option.value) === String(value) ? styles.selected : ''}`}
								key={index}
								onClick={(event) => {
									event.stopPropagation()
									if (option && option.value !== undefined) onChange(option.value)
								}}
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
				<div className={`${styles.grid} ${rowClass}`}>
					{flatOptions.map((opt, index) => {
						const label = opt.label ?? String(formatValidTimeLabel(opt.value)).split(' ')[0]
						return (
							<div
								data-value={String(opt.value)}
								className={`${styles.option} ${String(opt.value) === String(value) ? styles.selected : ''}`}
								key={index}
								onClick={(event) => {
									event.stopPropagation()
									if (opt && opt.value !== undefined) onChange(opt.value)
								}}
								aria-selected={String(opt.value) === String(value)}
							>
								{label}
							</div>
						)
					})}
				</div>
			)
		}

		return <div className={styles.option}>No options</div>
	}, [groupedOptions, flatOptions, value, onChange, rowCount])

	// on mount / when value changes, try to scroll the selected option into view
	useEffect(() => {
		try {
			const root = wrapperRef.current
			if (!root) return
			const selector = `[data-value='${String(value)}']`
			const el = root.querySelector(selector) as HTMLElement | null
			if (!el) return
			const groupEl = el.closest(`.${styles.group}`) as HTMLElement | null
			if (groupEl && typeof groupEl.scrollIntoView === 'function') {
				groupEl.scrollIntoView({ block: 'start' })
				return
			}
			if (typeof el.scrollIntoView === 'function') {
				el.scrollIntoView({ block: 'start' })
			}
		} catch (e) {
			// ignore
		}
	}, [value])

	return (
		<div ref={wrapperRef} className={styles.wrapper}>
			{title && <span className={styles.title}>{title}</span>}
			<div className={styles.options}>{optionsContent}</div>
		</div>
	)
}

export default ValidtimeSelectPanel
