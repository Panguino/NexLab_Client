'use client'

import type { ChatMessage as ChatMessageType } from '@/data/ai-agent/types'
import { faCloudBolt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './ChatMessage.module.scss'

interface ChatMessageProps {
	message: ChatMessageType
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
	const isUser = message.role === 'user'

	// Format timestamp
	const formatTime = (date: Date) => {
		return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	}

	return (
		<div className={`${styles.messageWrapper} ${isUser ? styles.user : styles.assistant}`}>
			<div className={styles.avatar}>
				{isUser ? (
					<FontAwesomeIcon icon={faUser} className={styles.userIcon} />
				) : (
					<FontAwesomeIcon icon={faCloudBolt} className={styles.aiIcon} />
				)}
			</div>
			<div className={styles.messageContent}>
				<div className={styles.messageBubble}>
					<p className={styles.messageText}>{message.content}</p>
				</div>
				<span className={styles.timestamp}>{formatTime(message.timestamp)}</span>
				{message.functionCall && (
					<div className={styles.functionCallIndicator}>
						<span className={styles.functionIcon}>📡</span>
						<span className={styles.functionName}>
							{message.functionCall.name === 'load_weather_product'
								? `Loading: ${message.functionCall.arguments.productId}`
								: message.functionCall.name}
						</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default ChatMessage
