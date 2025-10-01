'use client'

import { useRootStore } from '@/store/useRootStore'
import { buildBackRoute, isOriginValid, restoreUIState } from '@/util/navigationOriginUtils'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import styles from './ContextualBackButton.module.scss'

interface ContextualBackButtonProps {
	fallbackUrl?: string
	fallbackLabel?: string
	className?: string
	disabled?: boolean
}

export const ContextualBackButton = ({ 
	fallbackUrl = '/weather-data/forecast-models', 
	fallbackLabel = 'Forecast Models',
	className = '',
	disabled = false
}: ContextualBackButtonProps) => {
	const router = useRouter()
	const [isNavigating, setIsNavigating] = useState(false)
	
	// Get navigation state from store
	const soundingOrigin = useRootStore.use.soundingOrigin()
	const clearSoundingOrigin = useRootStore.use.clearSoundingOrigin()
	const trackBackNavigation = useRootStore.use.trackBackNavigation()
	const store = useRootStore()
	
	// Determine if we have a valid origin
	const hasValidOrigin = isOriginValid(soundingOrigin)
	
	// Determine button label and destination
	const buttonLabel = hasValidOrigin 
		? `Back to ${soundingOrigin!.label}`
		: `Return to ${fallbackLabel}`
	
	const handleBackClick = useCallback(async () => {
		if (disabled || isNavigating) {
			return
		}
		
		setIsNavigating(true)
		const startTime = Date.now()
		
		try {
			if (hasValidOrigin && soundingOrigin) {
				// Navigate back to origin
				const backRoute = buildBackRoute(soundingOrigin)
				const originType = soundingOrigin.label.toLowerCase().replace(' ', '-')
				
				// Track telemetry
				trackBackNavigation(originType, backRoute, true, Date.now() - startTime)
				
				// Navigate
				router.push(backRoute)
				
				// Restore UI state after a brief delay to allow route to load
				setTimeout(() => {
					restoreUIState(soundingOrigin, store)
					clearSoundingOrigin()
				}, 100)
			} else {
				// Fallback navigation
				trackBackNavigation('fallback', fallbackUrl, true, Date.now() - startTime)
				router.push(fallbackUrl)
			}
		} catch (error) {
			console.error('Back navigation failed:', error)
			const originType = hasValidOrigin ? soundingOrigin!.label.toLowerCase().replace(' ', '-') : 'fallback'
			const destination = hasValidOrigin ? buildBackRoute(soundingOrigin!) : fallbackUrl
			trackBackNavigation(originType, destination, false, Date.now() - startTime)
		} finally {
			setIsNavigating(false)
		}
	}, [
		disabled, 
		isNavigating, 
		hasValidOrigin, 
		soundingOrigin, 
		trackBackNavigation, 
		router, 
		store, 
		clearSoundingOrigin, 
		fallbackUrl
	])
	
	// Determine if button should be disabled
	const isDisabled = disabled || isNavigating || (!hasValidOrigin && !fallbackUrl)
	
	// Accessibility label
	const ariaLabel = hasValidOrigin 
		? `Navigate back to ${soundingOrigin!.label}`
		: `Return to ${fallbackLabel}`
	
	// Tooltip for disabled state
	const tooltipText = !hasValidOrigin && !fallbackUrl 
		? 'No navigation origin available'
		: undefined
	
	return (
		<div className={`${styles.ContextualBackButton} ${className}`}>
			<button
				onClick={handleBackClick}
				disabled={isDisabled}
				aria-label={ariaLabel}
				title={tooltipText}
				className={styles.backButton}
			>
				<svg 
					width="8" 
					height="12" 
					viewBox="0 0 8 12" 
					fill="none" 
					xmlns="http://www.w3.org/2000/svg"
					className={styles.backIcon}
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M0.963555 11.6863C0.612083 11.3349 0.612083 10.765 0.963555 10.4136L5.12716 6.24995L0.963555 2.08635C0.612083 1.73488 0.612083 1.16503 0.963555 0.813555C1.31503 0.462084 1.88487 0.462084 2.23635 0.813555L7.03635 5.61356C7.38782 5.96503 7.38782 6.53488 7.03635 6.88635L2.23635 11.6863C1.88488 12.0378 1.31503 12.0378 0.963555 11.6863Z"
					/>
				</svg>
				<span className={styles.buttonText}>
					{isNavigating ? 'Navigating...' : buttonLabel}
				</span>
			</button>
		</div>
	)
}
