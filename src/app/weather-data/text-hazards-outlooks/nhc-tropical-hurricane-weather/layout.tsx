'use client'

import { TropicalAnimator } from '@/components/elements/TropicalAnimator/TropicalAnimator'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface LayoutProps {
	children: ReactNode
}

export default function TropicalWeatherLayout({ children }: LayoutProps) {
	const router = useRouter()
	const pathname = usePathname()

	const handleStormSelect = (stormId: string) => {
		router.push(`/weather-data/text-hazards-outlooks/nhc-tropical-hurricane-weather/overview/latest/storm/${stormId}`)
	}

	// Check if we're on a storm detail page
	const isStormDetailPage = pathname.includes('/storm/')

	// For storm detail pages, render the children (which will include the detail animator)
	if (isStormDetailPage) {
		return <>{children}</>
	}

	// For overview pages, always render the overview animator
	// This component stays mounted as long as we're not on a storm detail page
	return <TropicalAnimator view="overview" onStormSelect={handleStormSelect} />
}
