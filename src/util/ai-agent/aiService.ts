/**
 * AI Agent Service
 *
 * Client-side service for interacting with the AI Agent API.
 * Handles message sending, response parsing, and function call handling.
 */

import type { AnimatorConfig, ChatMessage } from '@/data/ai-agent/types'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'

export interface AIResponse {
	message: string
	functionCall?: {
		name: string
		arguments: Record<string, unknown>
	}
	animatorConfig?: AnimatorConfig
	error?: string
}

/**
 * Send a message to the AI Agent and get a response
 */
export async function sendMessage(userMessage: string, conversationHistory: ChatMessage[]): Promise<AIResponse> {
	try {
		// Convert chat history to OpenAI format, including function call context
		const messages: ChatCompletionMessageParam[] = conversationHistory.map((msg) => {
			let content = msg.content
			// If this message had a function call, include it in the context for the AI to remember
			if (msg.functionCall) {
				const args = msg.functionCall.arguments
				const contextInfo = `[Context: Loaded ${msg.functionCall.name} with ${JSON.stringify(args)}]`
				content = `${content}\n\n${contextInfo}`
			}
			return {
				role: msg.role as 'user' | 'assistant',
				content,
			}
		})

		// Add the new user message
		messages.push({
			role: 'user',
			content: userMessage,
		})

		const response = await fetch('/api/ai-agent/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ messages }),
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.error || 'Failed to get AI response')
		}

		const data = await response.json()

		// If there was a function call, build the animator config
		let animatorConfig: AnimatorConfig | undefined
		if (data.functionCall?.name === 'load_weather_product') {
			animatorConfig = buildAnimatorConfig(data.functionCall.arguments)
		}

		return {
			message: data.message,
			functionCall: data.functionCall,
			animatorConfig,
		}
	} catch (error) {
		console.error('AI Service error:', error)
		return {
			message: '',
			error: error instanceof Error ? error.message : 'An error occurred',
		}
	}
}

/**
 * Build animator configuration from function call arguments
 */
function buildAnimatorConfig(args: Record<string, unknown>): AnimatorConfig {
	const productId = args.productId as string
	const region = (args.region as string) || 'CONUS'
	const site = args.site as string | undefined

	// Determine animator mode based on product
	const mapProducts = ['tropical-overview', 'alerts-national']
	const mode = mapProducts.includes(productId) ? 'map' : 'image'

	// Build base config
	const config: AnimatorConfig = {
		mode,
		frames: [], // Will be populated by the animator integration layer
		autoPlay: true,
		interval: 150,
	}

	// Add map-specific config
	if (mode === 'map') {
		config.mapRegion = region
		if (productId === 'tropical-overview') {
			config.layerConfig = {
				tropicalStorms: { active: true, initialValue: true },
				forecastCones: { active: true, initialValue: true },
				stormTracks: { active: true, initialValue: true },
			}
		} else if (productId === 'alerts-national') {
			config.layerConfig = {
				countyAlerts: { active: true, initialValue: true },
				countyBorders: { active: true, initialValue: true },
			}
		}
	}

	return config
}

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
	return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Create a user message object
 */
export function createUserMessage(content: string): ChatMessage {
	return {
		id: generateMessageId(),
		role: 'user',
		content,
		timestamp: new Date(),
	}
}

/**
 * Create an assistant message object
 */
export function createAssistantMessage(
	content: string,
	functionCall?: { name: string; arguments: Record<string, unknown> },
	animatorConfig?: AnimatorConfig,
): ChatMessage {
	return {
		id: generateMessageId(),
		role: 'assistant',
		content,
		timestamp: new Date(),
		functionCall,
		animatorConfig,
	}
}

/**
 * Suggested queries for users to try
 */
export const SUGGESTED_QUERIES = [
	'Show me radar for Chicago',
	'Are there any active hurricanes?',
	'What weather alerts are active?',
	'Show me the national radar',
	'Where is the jet stream?',
	'Show me satellite imagery',
]
