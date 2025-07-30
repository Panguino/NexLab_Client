'use client'

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
	const modalRef = useRef<HTMLDivElement>(null)
	const formContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Set up the bboxInit function before script loads
		window.bboxInit = function () {
			console.log('bboxInit called')
			if (window.bbox) {
				console.log('showform called')
				window.bbox.showForm('5763743a-812e-405d-99fc-705c1748069d')
			}
		}
	}, [])

	useEffect(() => {
		if (document.getElementById('bboxdonation_gift_txtAmountGift')) {
			const amountInput = document.getElementById('bboxdonation_gift_txtAmountGift') as HTMLInputElement
			if (amountInput) {
				amountInput.value = amount ? amount.toString() : ''
				// Dispatch input and change events so Blackbaud picks up the new value
				const inputEvent = new Event('input', { bubbles: true })
				const changeEvent = new Event('change', { bubbles: true })
				amountInput.dispatchEvent(inputEvent)
				amountInput.dispatchEvent(changeEvent)
			}
		}
		if (document.getElementById('bboxdonation_recurrence_chkMonthlyGift')) {
			const recurrenceCheckbox = document.getElementById('bboxdonation_recurrence_chkMonthlyGift') as HTMLInputElement
			recurrenceCheckbox.checked = !oneTimeDonation
		}
	}, [oneTimeDonation, amount])

	// Inject Blackbaud script and set bboxInit only after modal is open and ref is present
	useEffect(() => {
		// Inject the Blackbaud script if not already present
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
	}, [])

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
		// --- Blackbaud POST response interceptor ---
		// Only add these once globally
		if (!(window as any).__bbox_interceptor_installed) {
			;(window as any).__bbox_interceptor_installed = true

			// Intercept fetch
			const origFetch = window.fetch
			window.fetch = async function (...args) {
				const response = await origFetch.apply(this, args)
				try {
					// Only check Blackbaud checkout endpoint
					if (typeof args[0] === 'string' && args[0].includes('Checkout')) {
						const clone = response.clone()
						clone
							.json()
							.then((data) => {
								if (data && data.Success === true) {
									console.log('Blackbaud checkout POST success detected (fetch)!')
									// You can trigger your own logic here, e.g. onClose();
								}
							})
							.catch(() => {})
					}
				} catch {
					// Intentionally ignore errors
				}
				return response
			}

			// Intercept XMLHttpRequest
			const origOpen = XMLHttpRequest.prototype.open
			const origSend = XMLHttpRequest.prototype.send
			XMLHttpRequest.prototype.open = function (method, url, ...rest) {
				;(this as any).__bbox_url = url
				return origOpen.call(this, method, url, ...rest)
			}
			XMLHttpRequest.prototype.send = function (body) {
				this.addEventListener('load', function () {
					try {
						if ((this as any).__bbox_url && (this as any).__bbox_url.includes('Checkout')) {
							const contentType = this.getResponseHeader('content-type') || ''
							if (contentType.includes('application/json')) {
								const data = JSON.parse(this.responseText)
								if (data && data.Success === true) {
									console.log('Blackbaud checkout POST success detected (XHR)!')
									// You can trigger your own logic here, e.g. onClose();
								}
							}
						}
					} catch {
						// Intentionally ignore errors
					}
				})
				return origSend.call(this, body)
			}
		}

		// Keep the MutationObserver as a fallback
		const bboxRoot = document.getElementById('bbox-root')
		let observer: MutationObserver | undefined
		if (bboxRoot) {
			observer = new MutationObserver(() => {
				if (bboxRoot.textContent?.includes('Thank you for your generous support!')) {
					console.log('Blackbaud success message detected!')
					// You can trigger your own logic here, e.g. onClose();
				}
			})
			observer.observe(bboxRoot, { childList: true, subtree: true, characterData: true })
		}
		return () => {
			if (observer) observer.disconnect()
		}
	}, [])

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
		}
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, handleKeyDown])

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

// Extend Window interface for TypeScript
declare global {
	interface Window {
		bbox: any
		bboxInit: () => void
	}
}
