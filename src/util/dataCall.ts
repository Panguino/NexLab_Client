export const nexrad_data = async (site, product, frames) => {
	// Construct the URL for the weather API request
	const nexrad_data_call = `https://weather.cod.edu/satrad/nexrad/assets/php/get-files.php?parms=${site}-${product}-0-${frames}-100`

	// Fetch the weather data
	const nexrad_data_res = await fetch(nexrad_data_call, {
		headers: {
			'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
			Accept: 'application/ld+json',
		},
	})

	if (!nexrad_data_res.ok) {
		throw new Error(`HTTP error! status: ${nexrad_data_res.status}`)
	}

	const nexrad_data_data = await nexrad_data_res.json()

	console.log(nexrad_data_data)
}
