'use client'
import { useState } from 'react'

export default function DonationForm() {
	const [amount, setAmount] = useState('')
	const [constituentId, setConstituentId] = useState('')
	const [response, setResponse] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setResponse('Submitting...')

		const res = await fetch('/api/blackbaud', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				amount,
				donor: {
					constituent_id: constituentId,
				},
			}),
		})

		const data = await res.json()
		setResponse(JSON.stringify(data, null, 2))
	}

	return (
		<div>
			<h2>Test Donation</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Amount (e.g., 50.00)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
				<input type="text" placeholder="Constituent ID" value={constituentId} onChange={(e) => setConstituentId(e.target.value)} required />
				<button type="submit">Donate</button>
			</form>
			{response && <pre style={{ marginTop: '1em', backgroundColor: '#f0f0f0', padding: '1em' }}>{response}</pre>}
		</div>
	)
}
