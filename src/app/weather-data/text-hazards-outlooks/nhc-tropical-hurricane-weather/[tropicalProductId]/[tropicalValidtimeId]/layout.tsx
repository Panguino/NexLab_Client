'use client'

import { TropicalAnimator } from '@/components/elements/TropicalAnimator/TropicalAnimator'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface LayoutProps {
	children: ReactNode
}

export default function TropicalLayout({ children }: LayoutProps) {
	const router = useRouter()
	const pathname = usePathname()

	const handleStormSelect = (stormId: string) => {
		// Navigate to the overview product for this storm
		router.push(`/weather-data/text-hazards-outlooks/nhc-tropical-hurricane-weather/overview/latest/storm/${stormId}`)
	}

	// Check if we're on a storm detail page by looking at the pathname
	const isStormDetailPage = pathname.includes('/storm/')

	return (
		<>
			{/* Always render the overview animator, but hide it on storm detail pages */}
			{/* This keeps it mounted across productId/validtimeId changes */}
			<div style={{ display: isStormDetailPage ? 'none' : 'block' }}>
				<TropicalAnimator view="overview" onStormSelect={handleStormSelect} />
			</div>

			{/* Render children (storm detail page if navigated there) */}
			{isStormDetailPage && children}
		</>
	)
}
