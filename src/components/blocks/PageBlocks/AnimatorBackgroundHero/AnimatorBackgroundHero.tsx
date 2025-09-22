'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Button, ButtonType } from '@/components/elements/Button/Button'
import { getSatradData } from '@/util/dataCalls/satrad/query-satrad'
import { useEffect, useState } from 'react'
import styles from './AnimatorBackgroundHero.module.scss'

interface IAnimatorBackgroundHeroProps {
	text?: string
	buttons?: ButtonType[]
}

export const AnimatorBackgroundHero = ({ text, buttons = [] }: IAnimatorBackgroundHeroProps) => {
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })
	const [satradData, setSatradData] = useState([])
	const [satradOverlays, setSatradOverlays] = useState<{ static: object; dynamic: object }>({ static: {}, dynamic: {} })

	useEffect(() => {
		let cancelled = false
		const load = async () => {
			try {
				const data = await getSatradData('regional', 'midwest', 'truecolor', 100, 1)
				if (cancelled) return
				setImageInfo(data.imageInfo)
				setSatradData(data.frames)
				setSatradOverlays(data.overlays)
			} catch (err) {
				console.error('Failed to load satrad data', err)
			}
		}
		load()
		return () => {
			cancelled = true
		}
	}, [])

	console.log('satradData', satradData, 'imageInfo', imageInfo)

	return (
		<section className={styles.hero}>
			<div className={styles.inner}>
				{text && <div className={styles.text} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: text || '' }} />}
				{buttons && buttons.length > 0 && (
					<div className={styles.buttons}>
						{buttons.map((b, i) => (
							<Button key={i} {...b} />
						))}
					</div>
				)}
			</div>
			<div className={styles.animator}>
				<Animator
					overlays={satradOverlays}
					interval={70}
					lastFrameDwell={false}
					imageInfo={imageInfo}
					frames={satradData}
					activeOverlays={['data']}
					disableZoom={true}
					hideControls={true}
					autoPlay={true}
					startFrame={0}
				/>
			</div>
			<div className={styles.bgOverlay} />
		</section>
	)
}
