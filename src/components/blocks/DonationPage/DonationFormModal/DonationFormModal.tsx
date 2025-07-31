'use client'

import { Button } from '@/components/elements/Button/Button'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useRef } from 'react'
import styles from './DonationFormModal.module.scss'

interface DonationFormModalProps {
	isOpen: boolean
	onClose: () => void
	tier?: string
	amount?: number
	oneTimeDonation?: boolean
}

export const DonationFormModal = ({ isOpen, onClose, oneTimeDonation, tier, amount }: DonationFormModalProps) => {
	const { data: session, status } = useSession()
	const modalRef = useRef<HTMLDivElement>(null)
	const formContainerRef = useRef<HTMLDivElement>(null)

	// All hooks must be called before any conditional returns
	useEffect(() => {
		if (session) {
			window.bboxInit = function () {
				console.log('bboxInit called')
				if (window.bbox) {
					console.log('showform called')
					window.bbox.showForm('5763743a-812e-405d-99fc-705c1748069d')
				}
			}
		}
	}, [session])

	useEffect(() => {
		if (session && document.getElementById('bboxdonation_gift_txtAmountGift')) {
			const amountInput = document.getElementById('bboxdonation_gift_txtAmountGift') as HTMLInputElement
			if (amountInput) {
				amountInput.value = amount ? amount.toString() : ''
				const inputEvent = new Event('input', { bubbles: true })
				const changeEvent = new Event('change', { bubbles: true })
				amountInput.dispatchEvent(inputEvent)
				amountInput.dispatchEvent(changeEvent)
			}
		}
		if (session && document.getElementById('bboxdonation_recurrence_chkMonthlyGift')) {
			const recurrenceCheckbox = document.getElementById('bboxdonation_recurrence_chkMonthlyGift') as HTMLInputElement
			recurrenceCheckbox.checked = !oneTimeDonation
		}
	}, [oneTimeDonation, amount, session])

	useEffect(() => {
		if (session) {
			const scriptId = 'blackbaud-bbox-script'
			let script = document.getElementById(scriptId) as HTMLScriptElement | null
			if (!script) {
				console.log('Injecting Blackbaud script')
				script = document.createElement('script')
				script.id = scriptId
				script.type = 'text/javascript'
				script.async = true
				script.src = 'https://bbox.blackbaudhosting.com/webforms/bbox-min.js'
				document.head.appendChild(script)
			}
		}
	}, [session])

	useEffect(() => {
		if (!isOpen) {
			document.body.style.overflow = 'unset'
			return undefined
		}
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen])

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === modalRef.current) {
			onClose()
		}
	}

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		},
		[onClose],
	)

	useEffect(() => {
		if (!session) return undefined

		const bboxRoot = document.getElementById('bbox-root')
		if (!bboxRoot) return undefined

		const observer = new MutationObserver(async () => {
			if (bboxRoot.textContent?.includes('Thank you for your generous support!')) {
				console.log('Blackbaud success message detected!')

				// Update Strapi with donation information
				try {
					const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${session.user.jwt}`,
						},
						body: JSON.stringify({
							lastDonationDate: new Date().toISOString(),
							donationTier: tier,
							donationAmount: amount,
							isRecurring: !oneTimeDonation,
						}),
					})

					if (response.ok) {
						console.log('Donation info updated in Strapi')
						// Optionally close modal after successful update
						setTimeout(() => {
							onClose()
						}, 3000) // Close after 3 seconds to let user see success message
					} else {
						console.error('Failed to update donation info in Strapi')
					}
				} catch (error) {
					console.error('Error updating donation info:', error)
				}
			}
		})

		observer.observe(bboxRoot, { childList: true, subtree: true, characterData: true })

		return () => {
			observer.disconnect()
		}
	}, [session, tier, amount, oneTimeDonation, onClose])

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
		}
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, handleKeyDown])

	// Now handle conditional rendering after all hooks
	if (status === 'loading') {
		return null
	}

	if (isOpen && !session) {
		// Create callback URL that includes donation parameters
		const callbackUrl = `/donate?open_modal=true&tier=${encodeURIComponent(tier || '')}&amount=${amount || ''}&one_time=${oneTimeDonation || false}`

		return (
			<div className={[styles.modalOverlay, !isOpen ? styles.hidden : ''].filter(Boolean).join(' ')} ref={modalRef} onClick={onClose}>
				<div className={styles.modalContent}>
					<div className={styles.modalHeader}>
						<h2>Login Required</h2>
						<button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>
					<div className={styles.modalBody}>
						<div className={styles.loginPrompt}>
							<p>You must be logged in to make a donation. This helps us track your donation status and provide member benefits.</p>
							<div className={styles.loginActions}>
								<Button label="Log In" link={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} />
								<Button label="Cancel" onClick={onClose} variantClassName={styles.secondaryButton} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={[styles.modalOverlay, !isOpen ? styles.hidden : ''].filter(Boolean).join(' ')} ref={modalRef} onClick={handleBackdropClick}>
			<div className={styles.modalContent}>
				<div className={styles.modalHeader}>
					<h2>Make a Donation</h2>
					{tier && (
						<p className={styles.tierInfo}>
							Selected Tier: <strong>{tier}</strong>
						</p>
					)}
					{amount && (
						<p className={styles.amountInfo}>
							Suggested Amount:{' '}
							<strong>
								${amount} {oneTimeDonation ? 'One Time Payment' : '/ month'}
							</strong>
						</p>
					)}
					<button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
						<FontAwesomeIcon icon={faTimes} />
					</button>
				</div>
				<div className={styles.modalBody}>
					<div ref={formContainerRef} className={styles.formContainer}>
						<div id="bbox-root"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

declare global {
	interface Window {
		bbox: any
		bboxInit: () => void
	}
}
