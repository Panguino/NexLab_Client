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
	const tallestRef = useRef<HTMLDivElement | null>(null)

	// Auto-rotate
	useEffect(() => {
		if (paused || items.length <= 1) return
		const id = setInterval(() => setIndex((i) => (i + 1) % items.length), Math.max(2000, rotateMs))
		return () => clearInterval(id)
	}, [paused, items.length, rotateMs])

	if (!items || items.length === 0) return null

	return (
		<section className={styles.testimonials} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
			<div className={styles.container}>
				{/* Hidden measurement stack to establish min height based on tallest slide */}
				<div className={styles.measure} aria-hidden="true" ref={tallestRef}>
					{items.map((t, i) => (
						<div key={`m-${i}`} className={styles.measureItem}>
							<blockquote className={styles.quote}>“{t.quote}”</blockquote>
							{t.avatar && <img className={styles.avatar} src={t.avatar} alt="" />}
							{t.author && <div className={styles.author}>{t.author}</div>}
							{t.authorTitle && <div className={styles.title}>{t.authorTitle}</div>}
						</div>
					))}
				</div>

				<div className={styles.slides} aria-live="polite">
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
