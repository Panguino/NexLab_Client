'use client'

import { TropicalAnimator } from '@/components/elements/TropicalAnimator/TropicalAnimator'
import { useParams, useRouter } from 'next/navigation'

const Page = () => {
	const router = useRouter()
	const { tropicalStormId, tropicalProductId, tropicalValidtimeId } = useParams()

	const handleStormSelect = (stormId: string) => {
		// Navigate to the same product/validtime for the newly selected storm
		router.push(`/weather-data/text-hazards-outlooks/nhc-tropical-hurricane-weather/${tropicalProductId}/${tropicalValidtimeId}/storm/${stormId}`)
	}

	return <TropicalAnimator selectedStormId={tropicalStormId as string} view="detail" onStormSelect={handleStormSelect} />
}

export default Page
