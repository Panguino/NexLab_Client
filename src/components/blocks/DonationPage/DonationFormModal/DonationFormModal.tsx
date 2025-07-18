'use client'

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef } from 'react'
import styles from './DonationFormModal.module.scss'
import '/src/styles/blackbaud-form.css'

interface DonationFormModalProps {
	isOpen: boolean
	onClose: () => void
	tier?: string
	amount?: number
}

export const DonationFormModal = ({ isOpen, onClose, tier, amount }: DonationFormModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const formContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isOpen) {
			// Load the Blackbaud script and initialize the form
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.async = true
			script.src = 'https://bbox.blackbaudhosting.com/webforms/bbox-min.js'

			// Initialize the form when script loads
			script.onload = () => {
				if (window.bbox && formContainerRef.current) {
					// Clear any existing form
					formContainerRef.current.innerHTML = '<div id="bbox-root"></div>'

					// Initialize Blackbaud form
					window.bboxInit = function () {
						window.bbox.showForm('5763743a-812e-405d-99fc-705c1748069d')

						// Apply custom styling after form loads
						setTimeout(() => {
							applyCustomStyling()
						}, 500)
					}

					// Trigger the form initialization
					if (window.bboxInit) {
						window.bboxInit()
					}
				}
			}

			document.head.appendChild(script)

			// Prevent body scroll when modal is open
			document.body.style.overflow = 'hidden'

			return () => {
				// Cleanup
				document.body.style.overflow = 'unset'
				if (script.parentNode) {
					script.parentNode.removeChild(script)
				}
			}
		}
	}, [isOpen])

	const applyCustomStyling = () => {
		// Apply custom CSS to match site styling
		const bboxRoot = document.getElementById('bbox-root')
		if (bboxRoot) {
			bboxRoot.classList.add(styles.customBboxForm)
		}
	}

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === modalRef.current) {
			onClose()
		}
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose()
		}
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
			return () => document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className={styles.modalOverlay} ref={modalRef} onClick={handleBackdropClick}>
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
							Suggested Amount: <strong>${amount}</strong>
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
