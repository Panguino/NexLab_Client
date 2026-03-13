'use client'

import React, { useRef, useEffect } from 'react'
import styles from './ChatContainer.module.scss'
import { ChatMessage } from '../ChatMessage/ChatMessage'
import { ChatInput } from '../ChatInput/ChatInput'
import { SuggestedQueries } from '../SuggestedQueries/SuggestedQueries'
import type { ChatMessage as ChatMessageType } from '@/data/ai-agent/types'

interface ChatContainerProps {
	messages: ChatMessageType[]
	onSendMessage: (message: string) => void
	isLoading?: boolean
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
	messages,
	onSendMessage,
	isLoading = false
}) => {
	const messagesEndRef = useRef<HTMLDivElement>(null)

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const handleSuggestedQuery = (query: string) => {
		onSendMessage(query)
	}

	const showWelcome = messages.length === 0

	return (
		<div className={styles.chatContainer}>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<span className={styles.headerIcon}>🌩️</span>
					<div className={styles.headerText}>
						<h2>NexLab Weather AI</h2>
						<span className={styles.status}>
							{isLoading ? 'Thinking...' : 'Online'}
						</span>
					</div>
				</div>
			</div>

			<div className={styles.messagesArea}>
				{showWelcome && (
					<div className={styles.welcomeSection}>
						<div className={styles.welcomeIcon}>🛰️</div>
						<h3>Welcome to NexLab Weather AI</h3>
						<p>
							I can help you explore weather data from radar, satellite, 
							tropical systems, alerts, and more. Just ask me what you&apos;d like to see!
						</p>
						<SuggestedQueries 
							onSelect={handleSuggestedQuery} 
							disabled={isLoading}
						/>
					</div>
				)}

				{messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))}

				{isLoading && (
					<div className={styles.typingIndicator}>
						<div className={styles.typingDots}>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<span className={styles.typingText}>AI is thinking...</span>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			<ChatInput 
				onSend={onSendMessage} 
				disabled={isLoading}
				placeholder={isLoading ? 'Please wait...' : 'Ask about weather data...'}
			/>
		</div>
	)
}

export default ChatContainer

