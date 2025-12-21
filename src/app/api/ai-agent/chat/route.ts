/**
 * AI Agent Chat API Route
 *
 * Handles chat completions with OpenAI, including function calling
 * for weather product loading and streaming responses.
 */

import { searchProducts, WEATHER_PRODUCT_CATALOG } from '@/data/ai-agent/weatherProductCatalog'
import { AI_AGENT_FUNCTIONS, findRadarSiteForLocation } from '@/util/ai-agent/functionDefinitions'
import { getSystemPrompt } from '@/util/ai-agent/systemPrompt'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'

// Initialize OpenAI client
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'

export interface ChatRequest {
	messages: ChatCompletionMessageParam[]
	stream?: boolean
}

export interface ChatResponse {
	message: string
	functionCall?: {
		name: string
		arguments: Record<string, unknown>
	}
	error?: string
}

// Handle function calls from the AI
function handleFunctionCall(name: string, args: Record<string, unknown>): string {
	switch (name) {
		case 'load_weather_product': {
			const productId = args.productId as string
			const product = WEATHER_PRODUCT_CATALOG.products.find((p) => p.id === productId)
			if (product) {
				return JSON.stringify({
					success: true,
					product: {
						id: product.id,
						name: product.name,
						category: product.category,
						animatorType: product.animatorType,
					},
					region: args.region || 'CONUS',
					site: args.site,
					message: `Loading ${product.name}...`,
				})
			}
			return JSON.stringify({ success: false, message: `Product ${productId} not found` })
		}

		case 'search_products': {
			const query = args.query as string
			const results = searchProducts(query)
			return JSON.stringify({
				success: true,
				results: results.map((p) => ({
					id: p.id,
					name: p.name,
					description: p.description,
					category: p.category,
				})),
			})
		}

		case 'get_product_info': {
			const productId = args.productId as string
			const product = WEATHER_PRODUCT_CATALOG.products.find((p) => p.id === productId)
			if (product) {
				return JSON.stringify({
					success: true,
					product: {
						id: product.id,
						name: product.name,
						description: product.description,
						category: product.category,
						keywords: product.keywords,
						useCases: product.useCases,
						exampleQueries: product.exampleQueries,
					},
				})
			}
			return JSON.stringify({ success: false, message: `Product ${productId} not found` })
		}

		case 'find_radar_site': {
			const location = args.location as string
			const site = findRadarSiteForLocation(location)
			if (site) {
				const siteInfo = WEATHER_PRODUCT_CATALOG.sites.find((s) => s.id === site)
				return JSON.stringify({
					success: true,
					site: site,
					name: siteInfo?.name || site,
					message: `Found radar site ${site} for ${location}`,
				})
			}
			return JSON.stringify({
				success: false,
				message: `Could not find a radar site for ${location}. Try a major city name.`,
			})
		}

		default:
			return JSON.stringify({ success: false, message: `Unknown function: ${name}` })
	}
}

export async function POST(request: NextRequest) {
	try {
		const body: ChatRequest = await request.json()
		const { messages, stream = false } = body

		if (!process.env.OPENAI_API_KEY) {
			return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
		}

		// Build messages with system prompt
		const fullMessages: ChatCompletionMessageParam[] = [{ role: 'system', content: getSystemPrompt() }, ...messages]

		// Make the API call
		const completion = await openai.chat.completions.create({
			model: MODEL,
			messages: fullMessages,
			tools: AI_AGENT_FUNCTIONS,
			tool_choice: 'auto',
			stream: false, // We'll handle streaming separately
		})

		let responseMessage = completion.choices[0].message
		let currentMessages = [...fullMessages]
		let finalFunctionCall: { name: string; arguments: Record<string, unknown> } | undefined

		// Handle multiple tool calls in a loop (AI might need to find_radar_site then load_weather_product)
		const MAX_TOOL_ITERATIONS = 3
		let iteration = 0

		while (responseMessage.tool_calls && responseMessage.tool_calls.length > 0 && iteration < MAX_TOOL_ITERATIONS) {
			iteration++

			// Process all tool calls
			const toolResults: { tool_call_id: string; content: string }[] = []

			for (const toolCall of responseMessage.tool_calls) {
				const functionName = toolCall.function.name
				const functionArgs = JSON.parse(toolCall.function.arguments)

				// Execute the function
				const functionResult = handleFunctionCall(functionName, functionArgs)
				toolResults.push({
					tool_call_id: toolCall.id,
					content: functionResult,
				})

				// Track the last load_weather_product call for the frontend
				if (functionName === 'load_weather_product') {
					finalFunctionCall = {
						name: functionName,
						arguments: functionArgs,
					}
				}
			}

			// Build messages with tool results
			currentMessages = [
				...currentMessages,
				responseMessage,
				...toolResults.map((result) => ({
					role: 'tool' as const,
					tool_call_id: result.tool_call_id,
					content: result.content,
				})),
			]

			// Get follow-up from AI (it may want to call more tools)
			const followUpCompletion = await openai.chat.completions.create({
				model: MODEL,
				messages: currentMessages,
				tools: AI_AGENT_FUNCTIONS,
				tool_choice: 'auto',
				stream: false,
			})

			responseMessage = followUpCompletion.choices[0].message
		}

		// Return the final message with function call info
		const finalMessage = responseMessage.content || ''

		return NextResponse.json({
			message: finalMessage,
			functionCall: finalFunctionCall,
		})
	} catch (error) {
		console.error('AI Agent chat error:', error)
		return NextResponse.json({ error: error instanceof Error ? error.message : 'An error occurred' }, { status: 500 })
	}
}
