export const getData = async (url) => {
	try {
		// TODO add guardrails for sites, products and frames that we don't support

		// Fetch the weather data
		const data_res = await fetch(url, {
			method: 'GET',
			headers: {
				// Origin: window.location.origin, // helpful for avoiding CORS errors
				// user agent not allowed - investigate later
				// 'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
				Accept: 'application/ld+json',
			},
		})

		if (!data_res.ok) {
			throw new Error(`HTTP error! status: ${data_res.status}`)
		}

		const data_data = await data_res.json()
		const data_files = data_data.err === false ? data_data.files : []

		return data_files
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error
	}
}
