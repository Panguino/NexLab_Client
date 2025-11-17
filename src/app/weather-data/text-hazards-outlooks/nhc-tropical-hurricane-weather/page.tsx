'use client'

import { TropicalAnimator } from '@/components/elements/TropicalAnimator/TropicalAnimator'
import { useRouter } from 'next/navigation'

const Page = () => {
	const router = useRouter()

	const handleStormSelect = (stormId: string) => {
		// Navigate to the overview product for this storm
		router.push(`/weather-data/text-hazards-outlooks/nhc-tropical-hurricane-weather/overview/latest/storm/${stormId}`)
	}

	return <TropicalAnimator view="overview" onStormSelect={handleStormSelect} />
}

export default Page

