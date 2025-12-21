'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import type { ChatMessage } from '@/data/ai-agent/types'
import { createAssistantMessage, createUserMessage, sendMessage } from '@/util/ai-agent/aiService'
import { AnimatorDisplayConfig, buildAnimatorConfig } from '@/util/ai-agent/animatorConfigBuilder'
import { faClose, faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'
import styles from './AIAgentPage.module.scss'
import { ChatContainer } from './ChatContainer/ChatContainer'

export const AIAgentPage: React.FC = () => {
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [animatorConfig, setAnimatorConfig] = useState<AnimatorDisplayConfig | null>(null)
	const [isLoadingAnimator, setIsLoadingAnimator] = useState(false)
	const [mobileChatOpen, setMobileChatOpen] = useState(false)

	const handleSendMessage = useCallback(
		async (content: string) => {
			// Add user message
			const userMessage = createUserMessage(content)
			setMessages((prev) => [...prev, userMessage])
			setIsLoading(true)

			try {
				// Send to AI
				const response = await sendMessage(content, messages)

				if (response.error) {
					const errorMessage = createAssistantMessage(`Sorry, I encountered an error: ${response.error}. Please try again.`)
					setMessages((prev) => [...prev, errorMessage])
				} else {
					// Add AI response
					const assistantMessage = createAssistantMessage(response.message, response.functionCall)
					setMessages((prev) => [...prev, assistantMessage])

					console.log('AI Response:', response)
					console.log('Function call:', response.functionCall)

					// If there was a function call to load a product, fetch the data
					if (response.functionCall?.name === 'load_weather_product') {
						console.log('Loading product with args:', response.functionCall.arguments)
						setIsLoadingAnimator(true)
						try {
							const config = await buildAnimatorConfig(response.functionCall.arguments as any)
							setAnimatorConfig(config)
						} catch (err) {
							console.error('Failed to load animator data:', err)
						} finally {
							setIsLoadingAnimator(false)
						}
					}
				}
			} catch (error) {
				console.error('Error sending message:', error)
				const errorMessage = createAssistantMessage('Sorry, something went wrong. Please try again.')
				setMessages((prev) => [...prev, errorMessage])
			} finally {
				setIsLoading(false)
			}
		},
		[messages],
	)

	return (
		<div className={styles.aiAgentPage}>
			<div className={styles.animatorPanel}>
				{isLoadingAnimator && (
					<div className={styles.loadingOverlay}>
						<div className={styles.loadingSpinner}></div>
						<p>Loading weather data...</p>
					</div>
				)}

				{!animatorConfig && !isLoadingAnimator && (
					<div className={styles.emptyState}>
						<div className={styles.emptyIcon}>🛰️</div>
						<h3>Weather Visualization</h3>
						<p>Ask the AI to show you weather data and it will appear here.</p>
					</div>
				)}

				{animatorConfig && !isLoadingAnimator && (
					<div className={styles.animatorWrapper}>
						{animatorConfig.error ? (
							<div className={styles.errorState}>
								<p>⚠️ {animatorConfig.error}</p>
							</div>
						) : (
							<Animator
								frames={animatorConfig.frames}
								mode={animatorConfig.mode}
								imageInfo={animatorConfig.imageInfo}
								autoPlay={animatorConfig.autoPlay}
								interval={animatorConfig.interval}
								mapRegion={animatorConfig.mapRegion}
								mapDataType={animatorConfig.mapDataType}
								layerConfig={animatorConfig.layerConfig}
								tropicalStorms={animatorConfig.tropicalStorms}
							/>
						)}
					</div>
				)}
			</div>

			{/* Desktop chat panel */}
			<div className={styles.chatPanel}>
				<ChatContainer messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />
			</div>

			{/* Mobile chat bubble button */}
			<button className={styles.mobileChatButton} onClick={() => setMobileChatOpen(true)} aria-label="Open chat">
				<FontAwesomeIcon icon={faComments} />
			</button>

			{/* Mobile chat slideout */}
			<motion.div
				className={styles.mobileChatSlideout}
				initial={{ x: '100%' }}
				animate={{ x: mobileChatOpen ? 0 : '100%' }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
			>
				<button className={styles.mobileChatClose} onClick={() => setMobileChatOpen(false)} aria-label="Close chat">
					<FontAwesomeIcon icon={faClose} />
				</button>
				<ChatContainer messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />
			</motion.div>

			{/* Mobile backdrop overlay */}
			{mobileChatOpen && <div className={styles.mobileBackdrop} onClick={() => setMobileChatOpen(false)} />}
		</div>
	)
}

export default AIAgentPage
