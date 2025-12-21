'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './ChatInput.module.scss'

interface ChatInputProps {
	onSend: (message: string) => void
	disabled?: boolean
	placeholder?: string
}

export const ChatInput: React.FC<ChatInputProps> = ({
	onSend,
	disabled = false,
	placeholder = 'Ask about weather data...'
}) => {
	const [message, setMessage] = useState('')
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	// Auto-resize textarea
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
		}
	}, [message])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (message.trim() && !disabled) {
			onSend(message.trim())
			setMessage('')
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSubmit(e)
		}
	}

	return (
		<form className={styles.chatInputForm} onSubmit={handleSubmit}>
			<div className={styles.inputWrapper}>
				<textarea
					ref={textareaRef}
					className={styles.textarea}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					disabled={disabled}
					rows={1}
				/>
				<button
					type="submit"
					className={styles.sendButton}
					disabled={disabled || !message.trim()}
					aria-label="Send message"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
			</div>
		</form>
	)
}

export default ChatInput

