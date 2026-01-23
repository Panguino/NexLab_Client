import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import { FC, useEffect, useRef, useState } from 'react'

interface AnimatorImageMachineImageProps {
	src: string
	index: number
	isCurrentFrame: boolean
	baseOpacity: number
}

export const AnimatorImageMachineImage: FC<AnimatorImageMachineImageProps> = ({ src, index, isCurrentFrame, baseOpacity }) => {
	console.log(`🖼️ AnimatorImageMachineImage[${index}] render - isCurrentFrame: ${isCurrentFrame}, src: ${src.substring(0, 50)}...`)

	const [loadState, setLoadState] = useState<'pending' | 'loading' | 'loaded' | 'error'>('pending')
	const [imageSrc, setImageSrc] = useState<string | null>(null)
	const disableLocalStorageRef = useRef(false)
	const mountedRef = useRef(false)

	useEffect(() => {
		console.log(
			`🔵 AnimatorImageMachineImage[${index}] useEffect triggered - isCurrentFrame: ${isCurrentFrame}, loadState: ${loadState}, mounted: ${mountedRef.current}`,
		)

		// Only load once on mount, use isCurrentFrame captured at mount time
		if (loadState !== 'pending') {
			console.log(`⏭️ AnimatorImageMachineImage[${index}] skipping load - already ${loadState}`)
			return
		}

		if (mountedRef.current) {
			console.warn(`⚠️ AnimatorImageMachineImage[${index}] useEffect running again after mount! This should not happen!`)
		}
		mountedRef.current = true

		// Current frame loads immediately, others load with stagger
		const loadDelay = isCurrentFrame ? 0 : index * 50
		console.log(`⏰ AnimatorImageMachineImage[${index}] scheduling load with delay: ${loadDelay}ms`)

		const timer = setTimeout(() => {
			console.log(`🚀 AnimatorImageMachineImage[${index}] starting image load`)
			loadImage(src)
		}, loadDelay)

		return () => {
			console.log(`🧹 AnimatorImageMachineImage[${index}] cleanup - clearing timer`)
			clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // Only load once on mount, never re-run

	const loadImage = async (url: string) => {
		console.log(`📥 AnimatorImageMachineImage[${index}] loadImage called for: ${url.substring(0, 50)}...`)

		// Check cache first
		const cached = localStorage.getItem(url)
		if (cached) {
			console.log(`✅ AnimatorImageMachineImage[${index}] found in cache`)
			setImageSrc(cached)
			setLoadState('loaded')
			return
		}

		// Load image
		console.log(`🌐 AnimatorImageMachineImage[${index}] loading from network`)
		setLoadState('loading')
		const img = new Image()
		img.onload = () => {
			console.log(`✅ AnimatorImageMachineImage[${index}] loaded successfully`)
			setImageSrc(url)
			setLoadState('loaded')
			// Try to cache
			if (!disableLocalStorageRef.current) {
				try {
					if (typeof img.src === 'string' && !img.src.startsWith('data:')) {
						localStorage.setItem(url, img.src)
						console.log(`💾 AnimatorImageMachineImage[${index}] cached to localStorage`)
					}
				} catch (err) {
					console.warn(`❌ AnimatorImageMachineImage[${index}] localStorage caching failed, disabling for this frame`, err)
					disableLocalStorageRef.current = true
				}
			}
		}
		img.onerror = () => {
			console.warn(`❌ AnimatorImageMachineImage[${index}] failed to load image: ${url}`)
			setLoadState('error')
		}
		img.src = url
	}

	// Only render if loaded
	if (loadState !== 'loaded' || !imageSrc) {
		// Show loading panel ONLY for current frame when loading
		if (isCurrentFrame && loadState === 'loading') {
			console.log(`⏳ AnimatorImageMachineImage[${index}] showing loading panel`)
			return <LoadingPanel size={0.35} hideText />
		}
		console.log(`🚫 AnimatorImageMachineImage[${index}] not rendering - loadState: ${loadState}`)
		return null
	}

	console.log(`✨ AnimatorImageMachineImage[${index}] rendering img - opacity: ${isCurrentFrame ? baseOpacity : 0}`)
	return (
		<img
			src={imageSrc}
			alt={`Frame ${index}`}
			style={{
				opacity: isCurrentFrame ? baseOpacity : 0,
			}}
		/>
	)
}
