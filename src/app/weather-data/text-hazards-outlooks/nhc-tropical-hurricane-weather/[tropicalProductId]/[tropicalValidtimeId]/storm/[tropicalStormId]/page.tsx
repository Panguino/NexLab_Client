'use client'

import { TropicalAnimator } from '@/components/elements/TropicalAnimator/TropicalAnimator'
import { useParams } from 'next/navigation'

const Page = () => {
	const { tropicalStormId } = useParams()

	return <TropicalAnimator selectedStormId={tropicalStormId as string} view="detail" />
}

export default Page
