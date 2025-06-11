// this should be baked into the standard fetch call in dataCall.ts
// however for the time being, we will keep this separate
export const getMenu = async (url) => {
	try {
		// Fetch response from endpoint
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
		console.log('endpoint response', data_data)

		return {
			menu: data_data.err === false ? data_data.menu : [],
			status: data_data.err === false ? data_data.status : [],
		}
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error
	}
}
