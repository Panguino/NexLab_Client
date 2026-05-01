import { NextResponse } from 'next/server'

const SPOTTER_NETWORK_FEED_URL = 'http://www.spotternetwork.org/feeds/rss-positions.xml'

const decodeEntities = (value: string): string => {
	return value
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
}

const stripCData = (value: string): string => {
	return value
		.replace(/^<!\[CDATA\[/, '')
		.replace(/\]\]>$/, '')
		.trim()
}

const extractTagValue = (xml: string, tagName: string): string => {
	const match = xml.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\/${tagName}>`, 'i'))
	if (!match || !match[1]) return ''
	return decodeEntities(stripCData(match[1].trim()))
}

const parseDescription = (description: string): { reportedAt: string; name: string; note?: string } => {
	const fields: Record<string, string> = {}
	const fieldRegex = /\(([^)]+)\)\s*([^()]+)/g
	let match = fieldRegex.exec(description)
	while (match) {
		fields[match[1].trim().toLowerCase()] = match[2].trim()
		match = fieldRegex.exec(description)
	}

	const reportedAt = fields['reported at'] ?? ''
	const name = fields['name'] ?? ''
	const note = fields.note

	return {
		reportedAt,
		name,
		note: note ? note : undefined,
	}
}

export async function GET() {
	try {
		const response = await fetch(SPOTTER_NETWORK_FEED_URL, {
			headers: {
				Accept: 'application/rss+xml, application/xml, text/xml',
			},
			cache: 'no-store',
		})

		if (!response.ok) {
			throw new Error(`Spotter Network fetch failed: ${response.status}`)
		}

		const xml = await response.text()
		const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]

		const reports = itemMatches
			.map((match) => {
				const itemXml = match[1]
				const title = extractTagValue(itemXml, 'title')
				const publicId = extractTagValue(itemXml, 'public_id')
				const latRaw = extractTagValue(itemXml, 'geo:lat')
				const lonRaw = extractTagValue(itemXml, 'geo:long')
				const description = extractTagValue(itemXml, 'description')
				const parsedDescription = parseDescription(description)

				const latitude = Number.parseFloat(latRaw)
				const longitude = Number.parseFloat(lonRaw)
				if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
					return null
				}

				return {
					publicId,
					name: parsedDescription.name || title,
					reportedAt: parsedDescription.reportedAt,
					note: parsedDescription.note,
					latitude,
					longitude,
				}
			})
			.filter((report): report is NonNullable<typeof report> => report !== null)

		return NextResponse.json({ reports })
	} catch (error) {
		console.error('Error parsing Spotter Network RSS feed:', error)
		return NextResponse.json({ reports: [], error: 'Unable to load Spotter Network feed' }, { status: 500 })
	}
}
