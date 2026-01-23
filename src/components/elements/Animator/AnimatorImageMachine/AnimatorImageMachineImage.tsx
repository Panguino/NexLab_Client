import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import { FC, useEffect, useRef, useState } from 'react'

interface AnimatorImageMachineImageProps {
	src: string
	index: number
	isCurrentFrame: boolean
	baseOpacity: number
}

export const AnimatorImageMachineImage: FC<AnimatorImageMachineImageProps> = ({ src, index, isCurrentFrame, baseOpacity }) => {
	const [loadState, setLoadState] = useState<'pending' | 'loading' | 'loaded' | 'error'>('pending')
	const [imageSrc, setImageSrc] = useState<string | null>(null)
	const disableLocalStorageRef = useRef(false)

	useEffect(() => {
		// Only load once on mount, use isCurrentFrame captured at mount time
		if (loadState !== 'pending') return

		// Current frame loads immediately, others load with stagger
		const loadDelay = isCurrentFrame ? 0 : index * 50

		const timer = setTimeout(() => {
			loadImage(src)
		}, loadDelay)

		return () => clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // Only load once on mount, never re-run

	const loadImage = async (url: string) => {
		// Check cache first
		const cached = localStorage.getItem(url)
		if (cached) {
			setImageSrc(cached)
			setLoadState('loaded')
			return
		}

		// Load image
		setLoadState('loading')
		const img = new Image()
		img.onload = () => {
			setImageSrc(url)
			setLoadState('loaded')
			// Try to cache
			if (!disableLocalStorageRef.current) {
				try {
					if (typeof img.src === 'string' && !img.src.startsWith('data:')) {
						localStorage.setItem(url, img.src)
					}
				} catch (err) {
					console.warn('localStorage caching failed, disabling for this frame', err)
					disableLocalStorageRef.current = true
				}
			}
		}
		img.onerror = () => {
			console.warn(`Failed to load image: ${url}`)
			setLoadState('error')
		}
		img.src = url
	}

	// Only render if loaded
	if (loadState !== 'loaded' || !imageSrc) {
		// Show loading panel ONLY for current frame when loading
		if (isCurrentFrame && loadState === 'loading') {
			return <LoadingPanel size={0.35} hideText />
		}
		return null
	}

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
