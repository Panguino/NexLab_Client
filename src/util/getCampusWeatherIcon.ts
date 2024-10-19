// I probably should learn a better way to do this, but for now, this is how I'm doing it.
const weatherIcons = [
	'sunny',
	'clear',
	'non_overcast_day',
	'non_overcast_night',
	'overcast',
	'non_overcast_mist_haze_day',
	'non_overcast_mist_haze_night',
	'overcast_mist_haze',
	'non_overcast_fog_day',
	'non_overcast_fog_night',
	'overcast_fog',
	'extreme_heat',
	'extreme_cold',
	'clear_windy',
	'non_overcast_windy_day',
	'non_overcast_windy_night',
	'overcast_windy',
	'non_overcast_drizzle_day',
	'non_overcast_drizzle_night',
	'overcast_drizzle',
	'non_overcast_rain_day',
	'non_overcast_rain_night',
	'overcast_rain',
	'non_overcast_snow_day',
	'non_overcast_snow_night',
	'overcast_snow',
	'non_overcast_sleet_day',
	'non_overcast_sleet_night',
	'overcast_sleet',
	'non_overcast_freezing_rain_day',
	'non_overcast_freezing_rain_night',
	'overcast_freezing_rain',
	'blizzard',
	'non_overcast_thunderstorm_day',
	'non_overcast_thunderstorm_night',
	'overcast_thunderstorm',
	'tornado',
	'tropical_storm',
	'hurricane',
]

const iconLookupCOD = {
	sunny: weatherIcons[0],
	clear: weatherIcons[1],
	mostly_sunny: weatherIcons[2],
	partly_cloudy_day: weatherIcons[2],
	mostly_cloudy_day: weatherIcons[2],
	mostly_clear: weatherIcons[3],
	partly_cloudy_night: weatherIcons[3],
	mostly_cloudy_night: weatherIcons[3],
	overcast: weatherIcons[4],
	haze_overcast: weatherIcons[7],
	mist_overcast: weatherIcons[7],
	haze_mostlysunny: weatherIcons[5],
	haze_partlycloudy_day: weatherIcons[5],
	haze_mostlycloudy_day: weatherIcons[5],
	mist_mostlysunny: weatherIcons[5],
	mist_partlycloudy_day: weatherIcons[5],
	mist_mostlycloudy_day: weatherIcons[5],
	haze_mostlyclear: weatherIcons[6],
	haze_partlycloudy_night: weatherIcons[6],
	haze_mostlycloudy_night: weatherIcons[6],
	mist_mostlyclear: weatherIcons[6],
	mist_partlycloudy_night: weatherIcons[6],
	mist_mostlycloudy_night: weatherIcons[6],
	fog: {
		day: {
			ovc: weatherIcons[10],
			bkn: weatherIcons[8],
		},
		night: {
			ovc: weatherIcons[10],
			bkn: weatherIcons[9],
		},
	},
	hitemp: weatherIcons[11],
	lowtemp: weatherIcons[12],
	clear_windy: weatherIcons[13],
	cloudy_windy: {
		day: {
			ovc: weatherIcons[16],
			bkn: weatherIcons[14],
		},
		night: {
			ovc: weatherIcons[16],
			bkn: weatherIcons[15],
		},
	},
	drizzle: {
		day: {
			ovc: weatherIcons[19],
			bkn: weatherIcons[17],
		},
		night: {
			ovc: weatherIcons[19],
			bkn: weatherIcons[18],
		},
	},
	rain: {
		day: {
			ovc: weatherIcons[22],
			bkn: weatherIcons[20],
		},
		night: {
			ovc: weatherIcons[22],
			bkn: weatherIcons[21],
		},
	},
	snow: {
		day: {
			ovc: weatherIcons[25],
			bkn: weatherIcons[23],
		},
		night: {
			ovc: weatherIcons[25],
			bkn: weatherIcons[24],
		},
	},
	sleet: {
		day: {
			ovc: weatherIcons[28],
			bkn: weatherIcons[26],
		},
		night: {
			ovc: weatherIcons[28],
			bkn: weatherIcons[27],
		},
	},
	freezing_drizzle: {
		day: {
			ovc: weatherIcons[31],
			bkn: weatherIcons[29],
		},
		night: {
			ovc: weatherIcons[31],
			bkn: weatherIcons[30],
		},
	},
	freezing_rain: {
		day: {
			ovc: weatherIcons[31],
			bkn: weatherIcons[29],
		},
		night: {
			ovc: weatherIcons[31],
			bkn: weatherIcons[30],
		},
	},
	vcts: {
		day: weatherIcons[33],
		night: weatherIcons[34],
	},
	thunderstorm: weatherIcons[35],
}

const iconLookupAPI = {
	skc: {
		day: weatherIcons[0],
		night: weatherIcons[1],
	},
	few: {
		day: weatherIcons[2],
		night: weatherIcons[3],
	},
	sct: {
		day: weatherIcons[2],
		night: weatherIcons[3],
	},
	bkn: {
		day: weatherIcons[2],
		night: weatherIcons[3],
	},
	ovc: {
		day: weatherIcons[4],
		night: weatherIcons[4],
	},
	dust: {},
	smoke: {},
	haze: {
		day: {
			ovc: weatherIcons[7],
			bkn: weatherIcons[5],
		},
		night: {
			ovc: weatherIcons[7],
			bkn: weatherIcons[6],
		},
	},
	fog: {
		day: {
			ovc: weatherIcons[10],
			bkn: weatherIcons[8],
		},
		night: {
			ovc: weatherIcons[10],
			bkn: weatherIcons[9],
		},
	},
	hot: weatherIcons[11],
	cold: weatherIcons[12],
	wind_skc: {
		day: weatherIcons[13],
		night: weatherIcons[13],
	},
	wind_few: {
		day: weatherIcons[14],
		night: weatherIcons[15],
	},
	wind_sct: {
		day: weatherIcons[14],
		night: weatherIcons[15],
	},
	wind_bkn: {
		day: weatherIcons[14],
		night: weatherIcons[15],
	},
	wind_ovc: {
		day: weatherIcons[16],
		night: weatherIcons[16],
	},
	rain: {
		day: {
			ovc: weatherIcons[22],
			bkn: weatherIcons[20],
		},
		night: {
			ovc: weatherIcons[22],
			bkn: weatherIcons[21],
		},
	},
	rain_showers: {
		day: weatherIcons[20],
		night: weatherIcons[21],
	},
	rain_showers_hi: {
		day: weatherIcons[20],
		night: weatherIcons[21],
	},
	rain_snow: {
		day: {
			ovc: weatherIcons[25],
			bkn: weatherIcons[23],
		},
		night: {
			ovc: weatherIcons[25],
			bkn: weatherIcons[24],
		},
	},
	snow: {
		day: {
			ovc: weatherIcons[25],
			bkn: weatherIcons[23],
		},
		night: {
			ovc: weatherIcons[25],
			bkn: weatherIcons[24],
		},
	},
	rain_sleet: {
		day: {
			ovc: weatherIcons[28],
			bkn: weatherIcons[26],
		},
		night: {
			ovc: weatherIcons[28],
			bkn: weatherIcons[27],
		},
	},
	sleet: {
		day: {
			ovc: weatherIcons[28],
			bkn: weatherIcons[26],
		},
		night: {
			ovc: weatherIcons[28],
			bkn: weatherIcons[27],
		},
	},
	snow_sleet: {
		day: {
			ovc: weatherIcons[28],
			bkn: weatherIcons[26],
		},
		night: {
			ovc: weatherIcons[28],
			bkn: weatherIcons[27],
		},
	},
	rain_fzra: {
		day: {
			ovc: weatherIcons[31],
			bkn: weatherIcons[29],
		},
		night: {
			ovc: weatherIcons[31],
			bkn: weatherIcons[30],
		},
	},
	fzra: {
		day: {
			ovc: weatherIcons[31],
			bkn: weatherIcons[29],
		},
		night: {
			ovc: weatherIcons[31],
			bkn: weatherIcons[30],
		},
	},
	snow_fzra: {
		day: {
			ovc: weatherIcons[31],
			bkn: weatherIcons[29],
		},
		night: {
			ovc: weatherIcons[31],
			bkn: weatherIcons[30],
		},
	},
	blizzard: weatherIcons[32],
	tsra: weatherIcons[35],
	tsra_sct: {
		day: weatherIcons[33],
		night: weatherIcons[34],
	},
	tsra_hi: {
		day: weatherIcons[33],
		night: weatherIcons[34],
	},
	tornado: weatherIcons[36],
	tropical_storm: weatherIcons[37],
	hurricane: weatherIcons[38],
}

export const convertAPIiconName = (icon_input, cloud_coverage_input = null) => {
	const icon_parameters = icon_input.replace('https://api.weather.gov/icons/land/', '').replace('?size=medium', '').split('/')
	const time_of_day = icon_parameters[0] // aka dayNight
	let output, cloud_coverage

	if (icon_parameters.length > 2) {
		// dual image - check for probability of precipitation and remove from string
		const first_image = icon_parameters[1].includes(',') ? icon_parameters[1].split(',')[0] : icon_parameters[1]
		const second_image = icon_parameters[2].includes(',') ? icon_parameters[2].split(',')[0] : icon_parameters[2]
		const iconPriority = Object.keys(iconLookupAPI)
		const higher_priority_icon = iconPriority.indexOf(first_image) < iconPriority.indexOf(second_image) ? second_image : first_image
		const lower_priority_icon = iconPriority.indexOf(first_image) < iconPriority.indexOf(second_image) ? first_image : second_image
		if (cloud_coverage_input !== null) {
			cloud_coverage = cloud_coverage_input !== 'ovc' ? 'bkn' : 'ovc'
		} else {
			cloud_coverage = iconPriority.indexOf(lower_priority_icon) < iconPriority.indexOf('ovc') ? 'bkn' : 'ovc'
		}

		if (typeof iconLookupAPI[higher_priority_icon] === 'string') {
			output = iconLookupAPI[higher_priority_icon]
		} else if (typeof iconLookupAPI[higher_priority_icon][time_of_day] === 'string') {
			output = iconLookupAPI[higher_priority_icon][time_of_day]
		} else if (typeof iconLookupAPI[higher_priority_icon][time_of_day][cloud_coverage] === 'string') {
			output = iconLookupAPI[higher_priority_icon][time_of_day][cloud_coverage]
		} else {
			output = 'unknown'
		}
	} else {
		// single image - just use the first image in the string
		const icon = icon_parameters[1].includes(',') ? icon_parameters[1].split(',')[0] : icon_parameters[1]

		// this step may not be necessary anymore, but ensures we select non-overcast variants when possible
		if (cloud_coverage_input !== null) {
			cloud_coverage = cloud_coverage_input !== 'ovc' ? 'bkn' : 'ovc'
		} else {
			cloud_coverage = 'ovc'
		}

		if (typeof iconLookupAPI[icon] === 'string') {
			output = iconLookupAPI[icon]
		} else if (typeof iconLookupAPI[icon][time_of_day] === 'string') {
			output = iconLookupAPI[icon][time_of_day]
		} else if (typeof iconLookupAPI[icon][time_of_day][cloud_coverage] === 'string') {
			output = iconLookupAPI[icon][time_of_day][cloud_coverage]
		} else {
			output = 'unknown'
		}
	}
	const icon_url = `/temp-icons/${output}.svg`
	return icon_url
}

const convertCODiconName = (icon_input, cloud_coverage_input, dayNight) => {
	let output = null
	if (typeof iconLookupCOD[icon_input] === 'string') {
		output = iconLookupCOD[icon_input]
	} else if (typeof iconLookupCOD[icon_input][dayNight] === 'string') {
		output = iconLookupCOD[icon_input][dayNight]
	} else if (typeof iconLookupCOD[icon_input][dayNight][cloud_coverage_input] === 'string') {
		output = iconLookupCOD[icon_input][dayNight][cloud_coverage_input]
	} else {
		output = 'unknown'
	}
	const icon_url = `/temp-icons/${output}.svg`
	return icon_url
}
export const convertIconName = (icon_input, cloud_coverage_input, dayNight, dataSource) => {
	let output = null
	switch (dataSource) {
		case 'cod':
			output = convertCODiconName(icon_input, cloud_coverage_input, dayNight)
			break
		case 'api':
			output = convertAPIiconName(icon_input, cloud_coverage_input) // dayNight derived from icon_input
			break
		default:
			output = null
			break
	}
	return output
}
