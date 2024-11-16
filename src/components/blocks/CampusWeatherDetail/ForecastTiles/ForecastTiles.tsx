'use client'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ForecastTile } from './ForecastTile/ForecastTile'
import styles from './ForecastTiles.module.scss'

export const ForecastTiles = ({ tileData }) => {
	const galleryRef = useRef(null)
	//const [isDragging, setIsDragging] = useState(false)
	const controls = useAnimation()
	const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })
	const x = useMotionValue(0)

	useEffect(() => {
		if (galleryRef.current) {
			const galleryWidth = galleryRef.current.offsetWidth
			const totalImagesWidth = tileData.length * (200 + 10)
			const constraints = { left: -(totalImagesWidth - galleryWidth), right: 0 }
			setDragConstraints(constraints)

			// Set initial x value to 0
			x.set(0)
		}
	}, [tileData.length, x])

	//const handleDragStart = () => setIsDragging(true)
	//const handleDragEnd = () => setIsDragging(false)

	return (
		<div className={styles.forecastTilesContainer}>
			<motion.div
				className={styles.forecastTiles}
				drag="x"
				dragConstraints={dragConstraints}
				ref={galleryRef}
				//onDragStart={handleDragStart}
				//onDragEnd={handleDragEnd}
				animate={controls}
				style={{ x }}
			>
				{tileData.map(({ title, dayData, nightData, size }, index) => (
					<ForecastTile key={index} title={title} dayData={dayData} nightData={nightData} size={size} />
				))}
			</motion.div>
		</div>
	)
}
