const getAlertIdByEvent = (alertName) => {
	const alertclass = {
		/* CONVECTIVE */
		'Tornado Warning': 'tor warning',
		'Severe Thunderstorm Warning': 'svr warning',
		'Severe Weather Statement': 'svr warning',
		'Tornado Watch': 'tor watch',
		'Severe Thunderstorm Watch': 'svr watch',

		/* MARINE */
		'Tsunami Warning': 'marine warning',
		'Special Marine Warning': 'marine warning',
		'Storm Warning': 'marine warning',
		'Tsunami Advisory': 'marine advisory',
		'Tsunami Watch': 'marine watch',
		'High Surf Warning': 'marine warning',
		'Gale Warning': 'marine warning',
		'Storm Watch': 'marine watch',
		'Lakeshore Flood Advisory': 'marine advisory',
		'Coastal Flood Advisory': 'marine advisory',
		'High Surf Advisory': 'marine advisory',
		'Heavy Freezing Spray Warning': 'marine warning',
		'Small Craft Advisory for Hazardous Seas': 'marine advisory',
		'Small Craft Advisory for Rough Bar': 'marine advisory',
		'Small Craft Advisory for Winds': 'marine advisory',
		'Small Craft Advisory': 'marine advisory',
		'Brisk Wind Advisory': 'marine advisory',
		'Hazardous Seas Warning': 'marine warning',
		'Lake Wind Advisory': 'marine advisory',
		'Freezing Spray Advisory': 'marine advisory',
		'Low Water Advisory': 'marine advisory',
		'Rip Current Statement': 'marine statement',
		'Beach Hazards Statement': 'marine statement',
		'Gale Watch': 'marine watch',
		'Hazardous Seas Watch': 'marine watch',
		'Heavy Freezing Spray Watch': 'marine watch',
		'Coastal Flood Watch': 'marine watch',
		'Lakeshore Flood Watch': 'marine watch',
		'Coastal Flood Statement': 'marine statement',
		'Lakeshore Flood Statement': 'marine statement',
		'Marine Weather Statement': 'marine statement',

		/* FIRE */
		'Fire Warning': 'fire warning',
		'Red Flag Warning': 'fire warning',
		'Fire Weather Watch': 'fire watch',
		'Extreme Fire Danger': 'fire watch',

		/* WINTER */
		'Blizzard Warning': 'winter warning',
		'Snow Squall Warning': 'winter warning',
		'Ice Storm Warning': 'winter warning',
		'Winter Storm Warning': 'winter warning',
		'Lake Effect Snow Warning': 'winter warning',
		'Wind Chill Warning': 'winter warning',
		'Extreme Cold Warning': 'winter warning',
		'Hard Freeze Warning': 'winter warning',
		'Freeze Warning': 'winter warning',
		'Freezing Rain Advisory': 'winter advisory',
		'Winter Weather Advisory': 'winter advisory',
		'Lake Effect Snow Advisory': 'winter advisory',
		'Wind Chill Advisory': 'winter advisory',
		'Frost Advisory': 'winter advisory',
		'Freezing Fog Advisory': 'winter advisory',
		'Blizzard Watch': 'winter watch',
		'Winter Storm Watch': 'winter watch',
		'Extreme Cold Watch': 'winter watch',
		'Wind Chill Watch': 'winter watch',
		'Lake Effect Snow Watch': 'winter watch',
		'Hard Freeze Watch': 'winter watch',
		'Freeze Watch': 'winter watch',

		/* TROPCIAL */
		'Storm Surge Warning': 'tropical warning',
		'Hurricane Force Wind Warning': 'tropical warning',
		'Hurricane Warning': 'tropical warning',
		'Typhoon Warning': 'tropical warning',
		'Tropical Storm Warning': 'tropical warning',
		'Storm Surge Watch': 'tropical watch',
		'Hurricane Watch': 'tropical watch',
		'Hurricane Force Wind Watch': 'tropical watch',
		'Typhoon Watch': 'tropical watch',
		'Tropical Storm Watch': 'tropical watch',
		'Hurricane Local Statement': 'tropical statement',
		'Typhoon Local Statement': 'tropical statement',
		'Tropical Storm Local Statement': 'tropical statement',
		'Tropical Depression Local Statement': 'tropical statement',
		'Tropical Cyclone Statement': 'tropical statement',

		/* HYDROLOGICAL */
		'Flash Flood Warning': 'hydrological warning',
		'Flash Flood Statement': 'hydrological statement',
		'Coastal Flood Warning': 'hydrological warning',
		'Lakeshore Flood Warning': 'hydrological warning',
		'Flood Warning': 'hydrological warning',
		'Flash Flood Watch': 'hydrological watch',
		'Flood Statement': 'hydrological statement',
		'Urban And Small Stream Flood Advisory': 'hydrological advisory',
		'Small Stream Flood Advisory': 'hydrological advisory',
		'Arroyo And Small Stream Flood Advisory': 'hydrological advisory',
		'Flood Advisory': 'hydrological advisory',
		'Hydrologic Advisory': 'hydrological advisory',
		'Flood Watch': 'hydrological watch',
		'Hydrologic Outlook': 'hydrological statement',

		/* NON-PRECIP */
		'Extreme Wind Warning': 'nonprecip warning',
		'High Wind Warning': 'nonprecip warning',
		'Dust Storm Warning': 'nonprecip warning',
		'Blowing Dust Warning': 'nonprecip warning',
		'Excessive Heat Warning': 'nonprecip warning',
		'Heat Advisory': 'nonprecip advisory',
		'Dense Fog Advisory': 'nonprecip advisory',
		'Dense Smoke Advisory': 'nonprecip advisory',
		'Dust Advisory': 'nonprecip advisory',
		'Blowing Dust Advisory': 'nonprecip advisory',
		'Wind Advisory': 'nonprecip advisory',
		'High Wind Watch': 'nonprecip watch',
		'Excessive Heat Watch': 'nonprecip watch',

		/* NON-METEOROLOGICAL */
		'Civil Danger Warning': 'nonmet warning',
		'Nuclear Power Plant Warning': 'nonmet warning',
		'Radiological Hazard Warning': 'nonmet warning',
		'Hazardous Materials Warning': 'nonmet warning',
		'Civil Emergency Message': 'nonmet advisory',
		'Law Enforcement Warning': 'nonmet warning',
		'Avalanche Warning': 'nonmet warning',
		'Earthquake Warning': 'nonmet warning',
		'Volcano Warning': 'nonmet warning',
		'Ashfall Warning': 'nonmet warning',
		'Avalanche Advisory': 'nonmet advisory',
		'Ashfall Advisory': 'nonmet advisory',
		'Local Area Emergency': 'nonmet warning',
		'Child Abduction Emergency': 'nonmet warning',
		'Avalanche Watch': 'nonmet watch',
		'911 Telephone Outage': 'nonmet statement',
		'Air Quality Alert': 'nonmet advisory',
		'Air Stagnation Advisory': 'nonmet advisory',

		/* SPECIAL CASES */
		'Special Weather Statement': 'specialwx statement',

		/* DEFAULT */
		default: 'alert uncategorized'
		// known occurances
		// Hydrologic Outlook - fcst - likely to be filtered out
	}

	return alertclass[alertName] || alertclass['default']
}

export default getAlertIdByEvent
