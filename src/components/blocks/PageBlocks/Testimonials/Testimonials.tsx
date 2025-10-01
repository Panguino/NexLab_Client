'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './Testimonials.module.scss'

type Testimonial = {
	avatar?: string | null
	authorTitle?: string
	author?: string
	quote?: string
}

interface TestimonialsProps {
	testimonials: Testimonial[]
	rotateMs?: number
}

export const Testimonials = ({ testimonials, rotateMs = 6000 }: TestimonialsProps) => {
	const items = useMemo(() => testimonials || [], [testimonials])
	const [index, setIndex] = useState(0)
	const [paused, setPaused] = useState(false)
	const measureRefs = useRef<Array<HTMLDivElement | null>>([])
	const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined)

	// Auto-rotate
	useEffect(() => {
		if (paused || items.length <= 1) {
			// Return a no-op cleanup to satisfy noImplicitReturns
			return () => {}
		}
		const id = setInterval(() => setIndex((i) => (i + 1) % items.length), Math.max(2000, rotateMs))
		return () => clearInterval(id)
	}, [paused, items.length, rotateMs])

	// Recalculate tallest slide and lock container height
	useEffect(() => {
		const recalc = () => {
			const heights = measureRefs.current.map((el) => (el ? el.clientHeight : 0))
			const max = heights.length ? Math.max(...heights) : 0
			if (max && max !== containerHeight) setContainerHeight(max)
		}
		// schedule after paint
		const id = window.setTimeout(recalc, 0)
		const onResize = () => recalc()
		window.addEventListener('resize', onResize)
		return () => {
			window.clearTimeout(id)
			window.removeEventListener('resize', onResize)
		}
	}, [items, containerHeight])

	if (!items || items.length === 0) return null

	return (
		<section className={styles.testimonials} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
			<div className={styles.container}>
				{/* Hidden measurement stack to determine tallest height */}
				<div className={styles.measure} aria-hidden="true">
					{items.map((t, i) => (
						<div
							key={`m-${i}`}
							className={styles.measureItem}
							ref={(el) => {
								measureRefs.current[i] = el
							}}
						>
							<blockquote className={styles.quote}>“{t.quote}”</blockquote>
							{t.avatar && <img className={styles.avatar} src={t.avatar} alt="" />}
							{t.author && <div className={styles.author}>{t.author}</div>}
							{t.authorTitle && <div className={styles.title}>{t.authorTitle}</div>}
						</div>
					))}
				</div>

				<div className={styles.slides} aria-live="polite" style={{ minHeight: containerHeight || 280 }}>
					{items.map((t, i) => (
						<div
							key={i}
							className={`${styles.slide} ${i === index ? styles.active : styles.inactive}`}
							aria-hidden={i === index ? 'false' : 'true'}
						>
							<blockquote className={styles.quote}>“{t.quote}”</blockquote>
							{t.avatar && <img className={styles.avatar} src={t.avatar} alt={t.author || ''} />}
							{t.author && <div className={styles.author}>{t.author}</div>}
							{t.authorTitle && <div className={styles.title}>{t.authorTitle}</div>}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Testimonials
