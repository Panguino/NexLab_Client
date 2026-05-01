const CONVECTIVE_OUTLOOK_ENDPOINT = 'https://www.spc.noaa.gov/products/outlook/day1otlk_cat.lyr.geojson'

export const getConvectiveOutlookData = async (): Promise<object | null> => {
	const response = await fetch(CONVECTIVE_OUTLOOK_ENDPOINT, {
		headers: { Accept: 'application/geo+json, application/json' },
		cache: 'no-store',
	})
	if (!response.ok) throw new Error(`Convective outlook fetch failed: ${response.status}`)
	return response.json()
}
