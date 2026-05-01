import { SpotterNetworkReport } from '@/types/tracker'

const SPOTTER_NETWORK_ENDPOINT = '/api/storm-chasing/spotter-network'

export const getSpotterNetworkData = async (): Promise<SpotterNetworkReport[]> => {
	const response = await fetch(SPOTTER_NETWORK_ENDPOINT, {
		headers: {
			Accept: 'application/json',
		},
		cache: 'no-store',
	})

	if (!response.ok) {
		throw new Error(`Spotter Network fetch failed: ${response.status}`)
	}

	const payload = (await response.json()) as { reports?: SpotterNetworkReport[] }
	return payload.reports ?? []
}
