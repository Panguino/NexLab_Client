import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { amount, donor } = await req.json()

	// Replace these with your actual Blackbaud credentials
	const CLIENT_ID = process.env.BLACKBAUD_APP_ID
	const CLIENT_SECRET = process.env.BLACKBAUD_APP_SECRET

	try {
		// 1. Get access token
		const tokenRes = await fetch('https://oauth2.sky.blackbaud.com/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'client_credentials',
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				scope: 'donf.r',
			}),
		})

		const tokenData = await tokenRes.json()
		const accessToken = tokenData.access_token
		console.log('Access Token:', tokenData)

		if (!accessToken) {
			return NextResponse.json({ error: 'Failed to get access token', details: tokenData }, { status: 401 })
		}

		// 2. Submit donation (example – replace with actual endpoint and fields)
		const donationRes = await fetch('https://api.sky.blackbaud.com/gift/v1/gifts', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'bb-api-subscription-key': CLIENT_ID,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				amount: parseFloat(amount),
				constituent_id: donor.constituent_id,
				gift_date: new Date().toISOString(),
				payment: {
					payment_method: 'Cash',
				},
			}),
		})

		const donationData = await donationRes.json()
		return NextResponse.json(donationData, { status: 200 })
	} catch (error: any) {
		console.error(error)
		return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 })
	}
}
