'use client'

import { Button } from '@/components/elements/Button/Button'
import { useState } from 'react'
import { DonationFormModal } from '../DonationFormModal/DonationFormModal'
import styles from './DonationHero.module.scss'

export const DonationHero = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedTier, setSelectedTier] = useState<string>('')
	const [selectedAmount, setSelectedAmount] = useState<number>(0)

	const openDonationModal = (amount: number = 25) => {
		setSelectedTier('General Donation')
		setSelectedAmount(amount)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedTier('')
		setSelectedAmount(0)
	}

	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				<div className={styles.heroContent}>
					<h1>Support the Future of Free Weather Data and Analysis</h1>
					<p>
						By contributing today, you keep vital datasets and forecasting tools freely available to millions of learners, educators, and
						storm chasers. Help us empower the next generation of meteorologists with open access to research-grade weather data.
					</p>
					<div className={styles.heroActions}>
						<Button label="Donate Now" onClick={() => openDonationModal(25)} />
						<Button label="Become a Sponsor" link="/sponsors" target="_self" />
					</div>
				</div>
			</div>
			<DonationFormModal isOpen={isModalOpen} onClose={closeModal} tier={selectedTier} amount={selectedAmount} />
		</section>
	)
}
