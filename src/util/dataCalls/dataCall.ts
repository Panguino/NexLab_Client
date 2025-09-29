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
		//console.log('data_data', data_data)

		return {
			// Beginning to feel that there's too much variety in the data returned from different endpoints
			// perhaps we should have this do less transformation and just return the raw data
			// then let the query utilities handle the transformation
			frames: data_data.err === false ? data_data.files : [],
			validtimes: data_data.validtimes || [],
			imageInfo: data_data?.img || { width: 0, height: 0 },
			overlays: { static: data_data.overlays?.static ?? {}, dynamic: data_data.overlays?.dynamic ?? {} },
			runs: data_data.runs || {},
			dataTypes: data_data.dataTypes || [],
			readoutData: data_data.readoutData || [],
			textfiles: data_data.textfiles || [],
		}
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error
	}
}
