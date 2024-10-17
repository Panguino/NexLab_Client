// I probably should learn a better way to do this, but for now, this is how I'm doing it.
const iconLookup = {
	skc: {
		day: 'sunny',
		night: 'clear',
	},
	few: {
		day: 'non_overcast_day',
		night: 'non_overcast_night',
	},
	sct: {
		day: 'non_overcast_day',
		night: 'non_overcast_night',
	},
	bkn: {
		day: 'non_overcast_day',
		night: 'non_overcast_night',
	},
	ovc: {
		day: 'overcast',
		night: 'overcast',
	},
	dust: {},
	smoke: {},
	haze: {
		day: {
			ovc: 'overcast_mist_haze_day',
			bkn: 'non_overcast_mist_haze_day',
		},
		night: {
			ovc: 'overcast_mist_haze_night',
			bkn: 'non_overcast_mist_haze_night',
		},
	},
	fog: {
		day: {
			ovc: 'overcast_fog_day',
			bkn: 'non_overcast_fog_day',
		},
		night: {
			ovc: 'overcast_fog_night',
			bkn: 'non_overcast_fog_night',
		},
	},
	hot: 'extreme_heat',
	cold: 'extreme_cold',
	wind_skc: {
		day: 'clear_windy',
		night: 'clear_windy',
	},
	wind_few: {
		day: 'non_overcast_windy_day',
		night: 'non_overcast_windy_night',
	},
	wind_sct: {
		day: 'non_overcast_windy_day',
		night: 'non_overcast_windy_night',
	},
	wind_bkn: {
		day: 'non_overcast_windy_day',
		night: 'non_overcast_windy_night',
	},
	wind_ovc: {
		day: 'overcast_windy',
		night: 'overcast_windy',
	},
	rain: {
		day: {
			ovc: 'overcast_rain_day',
			bkn: 'non_overcast_rain_day',
		},
		night: {
			ovc: 'overcast_rain_night',
			bkn: 'non_overcast_rain_night',
		},
	},
	rain_showers: {
		day: 'non_overcast_rain_day',
		night: 'non_overcast_rain_night',
	},
	rain_showers_hi: {
		day: 'non_overcast_rain_day',
		night: 'non_overcast_rain_night',
	},
	rain_snow: {
		day: {
			ovc: 'overcast_snow',
			bkn: 'non_overcast_snow_day',
		},
		night: {
			ovc: 'overcast_snow',
			bkn: 'non_overcast_snow_night',
		},
	},
	rain_sleet: {
		day: {
			ovc: 'overcast_sleet',
			bkn: 'non_overcast_sleet_day',
		},
		night: {
			ovc: 'overcast_sleet',
			bkn: 'non_overcast_sleet_night',
		},
	},
	rain_fzra: {
		day: {
			ovc: 'overcast_freezing_rain',
			bkn: 'non_overcast_freezing_rain_day',
		},
		night: {
			ovc: 'overcast_freezing_rain',
			bkn: 'non_overcast_freezing_rain_night',
		},
	},
	snow: {
		day: {
			ovc: 'overcast_snow',
			bkn: 'non_overcast_snow_day',
		},
		night: {
			ovc: 'overcast_snow',
			bkn: 'non_overcast_snow_night',
		},
	},
	snow_sleet: {
		day: {
			ovc: 'overcast_sleet',
			bkn: 'non_overcast_sleet_day',
		},
		night: {
			ovc: 'overcast_sleet',
			bkn: 'non_overcast_sleet_night',
		},
	},
	sleet: {
		day: {
			ovc: 'overcast_sleet',
			bkn: 'non_overcast_sleet_day',
		},
		night: {
			ovc: 'overcast_sleet',
			bkn: 'non_overcast_sleet_night',
		},
	},
	fzra: {
		day: {
			ovc: 'overcast_freezing_rain',
			bkn: 'non_overcast_freezing_rain_day',
		},
		night: {
			ovc: 'overcast_freezing_rain',
			bkn: 'non_overcast_freezing_rain_night',
		},
	},
	snow_fzra: {
		day: {
			ovc: 'overcast_freezing_rain',
			bkn: 'non_overcast_freezing_rain_day',
		},
		night: {
			ovc: 'overcast_freezing_rain',
			bkn: 'non_overcast_freezing_rain_night',
		},
	},
	blizzard: 'blizzard',
	tsra: 'overcast_thunderstorm',
	tsra_sct: {
		day: 'non_overcast_thunderstorm_day',
		night: 'non_overcast_thunderstorm_night',
	},
	tsra_hi: {
		day: 'non_overcast_thunderstorm_day',
		night: 'non_overcast_thunderstorm_night',
	},
	tornado: 'tornado',
	tropical_storm: 'tropical_storm',
	hurricane: 'hurricane',
}

export const convertAPIiconName = (icon_input, cloud_coverage_input = null) => {
	// /assets/temp-icons/*
	const icon_parameters = icon_input.replace('https://api.weather.gov/icons/land/', '').replace('?size=medium', '').split('/')
	const time_of_day = icon_parameters[0]
	let output, cloud_coverage

	if (icon_parameters.length > 2) {
		// dual image - check for probability of precipitation and remove from string
		const first_image = icon_parameters[1].includes(',') ? icon_parameters[1].split(',')[0] : icon_parameters[1]
		const second_image = icon_parameters[2].includes(',') ? icon_parameters[2].split(',')[0] : icon_parameters[2]
		const iconPriority = Object.keys(iconLookup)
		const higher_priority_icon = iconPriority.indexOf(first_image) < iconPriority.indexOf(second_image) ? second_image : first_image
		const lower_priority_icon = iconPriority.indexOf(first_image) < iconPriority.indexOf(second_image) ? first_image : second_image
		if (cloud_coverage_input !== null) {
			cloud_coverage = cloud_coverage_input !== 'ovc' ? 'bkn' : 'ovc'
		} else {
			cloud_coverage = iconPriority.indexOf(lower_priority_icon) < iconPriority.indexOf('ovc') ? 'bkn' : 'ovc'
		}

		if (typeof iconLookup[higher_priority_icon] === 'string') {
			output = iconLookup[higher_priority_icon]
		} else if (typeof iconLookup[higher_priority_icon][time_of_day] === 'string') {
			output = iconLookup[higher_priority_icon][time_of_day]
		} else if (typeof iconLookup[higher_priority_icon][time_of_day][cloud_coverage] === 'string') {
			output = iconLookup[higher_priority_icon][time_of_day][cloud_coverage]
		} else {
			output = 'unknown'
		}
	} else {
		// single image - just use the first image in the string
		const icon = icon_parameters[1].includes(',') ? icon_parameters[1].split(',')[0] : icon_parameters[1]

		if (cloud_coverage_input !== null) {
			cloud_coverage = cloud_coverage_input !== 'ovc' ? 'bkn' : 'ovc'
		} else {
			cloud_coverage = 'ovc'
		}

		if (typeof iconLookup[icon] === 'string') {
			output = iconLookup[icon]
		} else if (typeof iconLookup[icon][time_of_day] === 'string') {
			output = iconLookup[icon][time_of_day]
		} else if (typeof iconLookup[icon][time_of_day][cloud_coverage] === 'string') {
			output = iconLookup[icon][time_of_day][cloud_coverage]
		} else {
			output = 'unknown'
		}
	}
	const icon_url = `/temp-icons/${output}.svg`
	return icon_url
}
