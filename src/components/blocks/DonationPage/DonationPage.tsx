'use client'

import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { useCallback, useEffect, useState } from 'react'
import { Footer } from '../PageBlocks/Footer/Footer'
import { DonationFormModal } from './DonationFormModal/DonationFormModal'
import { DonationHero } from './DonationHero/DonationHero'
import styles from './DonationPage.module.scss'
import { DonationPerks } from './DonationPerks/DonationPerks'
import { DonationTiers } from './DonationTiers/DonationTiers'
import { DonationUse } from './DonationUse/DonationUse'
import { SponsorshipInfo } from './SponsorshipInfo/SponsorshipInfo'
import { TestimonialsSection } from './TestimonialsSection/TestimonialsSection'

export const DonationPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedAmount, setSelectedAmount] = useState<number>(0)
	const [selectedTier, setSelectedTier] = useState<string>('')
	const [oneTimeDonation, setOneTimeDonation] = useState(false)

	const openModal = useCallback((amount: number, oneTime: boolean, tier: string) => {
		setOneTimeDonation(oneTime)
		setSelectedTier(tier)
		setSelectedAmount(amount)
		setIsModalOpen(true)
	}, [])

	const closeModal = useCallback(() => {
		setIsModalOpen(false)
		setSelectedAmount(0)
		setSelectedTier('')
		setOneTimeDonation(false)
	}, [])

	// Check for modal parameters on page load - run only once
	useEffect(() => {
		console.log('DonationPage useEffect running')
		const urlParams = new URLSearchParams(window.location.search)
		const shouldOpenModal = urlParams.get('open_modal') === 'true'

		console.log('shouldOpenModal:', shouldOpenModal)

		if (shouldOpenModal) {
			const tier = urlParams.get('tier') || ''
			const amount = parseInt(urlParams.get('amount') || '0')
			const oneTime = urlParams.get('one_time') === 'true'

			console.log('Opening modal with:', { tier, amount, oneTime })

			setSelectedTier(tier)
			setSelectedAmount(amount)
			setOneTimeDonation(oneTime)
			setIsModalOpen(true)

			// Clean up URL parameters
			const url = new URL(window.location.href)
			url.searchParams.delete('open_modal')
			url.searchParams.delete('tier')
			url.searchParams.delete('amount')
			url.searchParams.delete('one_time')
			window.history.replaceState({}, '', url.toString())
			console.log('URL cleaned up')
		}
	}, []) // Empty dependency array - run only once on mount

	return (
		<ScrollArea>
			<div className={styles.donationPage}>
				<DonationHero />
				<DonationPerks />
				<DonationUse />
				<DonationTiers onOpenModal={openModal} />
				<SponsorshipInfo />
				<TestimonialsSection />
			</div>
			<Footer />
			<DonationFormModal
				isOpen={isModalOpen}
				onClose={closeModal}
				tier={selectedTier}
				amount={selectedAmount}
				oneTimeDonation={oneTimeDonation}
			/>
		</ScrollArea>
	)
}
