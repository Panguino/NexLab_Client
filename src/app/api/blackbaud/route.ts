export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end()

	const { amount, donor } = req.body

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
			}),
		})

		const tokenData = await tokenRes.json()
		const accessToken = tokenData.access_token

		if (!accessToken) {
			return res.status(401).json({ error: 'Failed to get access token', details: tokenData })
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
		res.status(200).json(donationData)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Server error', details: error.message })
	}
}
