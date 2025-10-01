'use client'

import { useRootStore } from '@/store/useRootStore'
import { createNavigationOrigin, isDirectSoundingAccess } from '@/util/navigationOriginUtils'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Hook to automatically track navigation origins for sounding pages
 * This should be used in components that can navigate to soundings
 */
export const useNavigationOrigin = () => {
	const pathname = usePathname()
	const previousPathnameRef = useRef<string | null>(null)
	const setSoundingOrigin = useRootStore.use.setSoundingOrigin()
	const clearSoundingOrigin = useRootStore.use.clearSoundingOrigin()
	const store = useRootStore()
	
	useEffect(() => {
		const previousPathname = previousPathnameRef.current
		const currentPathname = pathname
		
		// Update the ref for next time
		previousPathnameRef.current = currentPathname
		
		// If we're navigating TO a sounding page
		if (currentPathname.includes('/sounding/')) {
			// Check if this is direct access (no valid origin)
			if (isDirectSoundingAccess(previousPathname, currentPathname)) {
				clearSoundingOrigin()
				return
			}
			
			// If we have a valid previous route, create an origin
			if (previousPathname) {
				const origin = createNavigationOrigin(previousPathname, store)
				if (origin) {
					setSoundingOrigin(origin)
				} else {
					clearSoundingOrigin()
				}
			}
		}
		// If we're navigating AWAY from a sounding page to a non-sounding page
		else if (previousPathname?.includes('/sounding/') && !currentPathname.includes('/sounding/')) {
			// Clear the origin since we're no longer in sounding context
			clearSoundingOrigin()
		}
	}, [pathname, setSoundingOrigin, clearSoundingOrigin, store])
	
	return {
		currentPath: pathname,
		previousPath: previousPathnameRef.current
	}
}

/**
 * Hook specifically for sounding pages to get current origin info
 */
export const useSoundingOrigin = () => {
	const soundingOrigin = useRootStore.use.soundingOrigin()
	const clearSoundingOrigin = useRootStore.use.clearSoundingOrigin()
	
	return {
		origin: soundingOrigin,
		hasOrigin: Boolean(soundingOrigin),
		clearOrigin: clearSoundingOrigin
	}
}
