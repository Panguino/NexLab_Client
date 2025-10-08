// standard static mapping overlays
const SATRAD_OVERLAY_STATIC_MAP_ID = 'map'
const SATRAD_OVERLAY_STATIC_LATLON_ID = 'latlon'
const SATRAD_OVERLAY_STATIC_RIVERS_ID = 'rivers'
const SATRAD_OVERLAY_STATIC_COUNTIES_ID = 'counties'
const SATRAD_OVERLAY_STATIC_US_HIGHWAYS_ID = 'ushw'
const SATRAD_OVERLAY_STATIC_US_INTERSTATES_ID = 'usint'
const SATRAD_OVERLAY_STATIC_US_STATE_ROAD_ID = 'usstrd'
const SATRAD_OVERLAY_STATIC_STATION_IDS_ID = 'id'
const SATRAD_OVERLAY_STATIC_COUNTY_WARNING_AREA_ID = 'cwa'
const SATRAD_OVERLAY_STATIC_RANGES_ID = 'ranges'
const SATRAD_OVERLAY_STATIC_ARTCC_ID = 'artcc'

// special dynamic mapping overlays for mesoanalysis sectors
const SATRAD_OVERLAY_DYNAMIC_MAP_ID = 'meso-map'
const SATRAD_OVERLAY_DYNAMIC_LATLON_ID = 'meso-latlon'
const SATRAD_OVERLAY_DYNAMIC_RIVERS_ID = 'meso-rivers'
const SATRAD_OVERLAY_DYNAMIC_COUNTIES_ID = 'meso-counties'
const SATRAD_OVERLAY_DYNAMIC_US_HIGHWAYS_ID = 'meso-ushw'
const SATRAD_OVERLAY_DYNAMIC_US_INTERSTATES_ID = 'meso-usint'
const SATRAD_OVERLAY_DYNAMIC_US_STATE_ROAD_ID = 'meso-usstrd'
const SATRAD_OVERLAY_DYNAMIC_STATION_IDS_ID = 'meso-id'
const SATRAD_OVERLAY_DYNAMIC_COUNTY_WARNING_AREA_ID = 'meso-cwa'
const SATRAD_OVERLAY_DYNAMIC_RANGES_ID = 'meso-ranges'
const SATRAD_OVERLAY_DYNAMIC_ARTCC_ID = 'meso-artcc'

// standard dynamic overlays
const SATRAD_OVERLAY_DYNAMIC_CAPE_ID = 'cape'
const SATRAD_OVERLAY_DYNAMIC_CIN_ID = 'cin'
const SATRAD_OVERLAY_DYNAMIC_DEW_ID = 'dew'
const SATRAD_OVERLAY_DYNAMIC_DVG_ID = 'dvg'
const SATRAD_OVERLAY_DYNAMIC_MDVG_ID = 'mdvg'
const SATRAD_OVERLAY_DYNAMIC_GUSTS_ID = 'gusts'
const SATRAD_OVERLAY_DYNAMIC_MSLP_ID = 'mslp'
const SATRAD_OVERLAY_DYNAMIC_PFALLS_ID = 'pfalls'
const SATRAD_OVERLAY_DYNAMIC_PLOT_ID = 'plot'
const SATRAD_OVERLAY_DYNAMIC_WSYM_ID = 'wsym'
const SATRAD_OVERLAY_DYNAMIC_RADAR_ID = 'radar'
const SATRAD_OVERLAY_DYNAMIC_SCP_ID = 'scp'
const SATRAD_OVERLAY_DYNAMIC_STREAMLINES_ID = 'streamlines'
const SATRAD_OVERLAY_DYNAMIC_TEMP_ID = 'temp'
const SATRAD_OVERLAY_DYNAMIC_THETAE_ID = 'thetae'
const SATRAD_OVERLAY_DYNAMIC_THETA_ID = 'theta'
const SATRAD_OVERLAY_DYNAMIC_VORT_ID = 'vort'
const SATRAD_OVERLAY_DYNAMIC_WINDV_ID = 'windv'
const SATRAD_OVERLAY_DYNAMIC_WW_ID = 'ww'
const SATRAD_OVERLAY_DYNAMIC_H5ANA_ID = 'h5ana'
const SATRAD_OVERLAY_DYNAMIC_GLM_FLASH_ID = 'glm_flash'
const SATRAD_OVERLAY_DYNAMIC_GLM_FED_ID = 'glm_fed'
const SATRAD_OVERLAY_DYNAMIC_GLM_TOE_ID = 'glm_toe'
const SATRAD_OVERLAY_DYNAMIC_GLM_MFA_ID = 'glm_mfa'
const SATRAD_OVERLAY_DYNAMIC_ACHA_ID = 'acha'
const SATRAD_OVERLAY_DYNAMIC_ACHT_ID = 'acht'
const SATRAD_OVERLAY_DYNAMIC_ACTP_ID = 'actp'
const SATRAD_OVERLAY_DYNAMIC_ADP_DUST_ID = 'adp_dust'
const SATRAD_OVERLAY_DYNAMIC_ADP_SMOKE_ID = 'adp_smoke'
const SATRAD_OVERLAY_DYNAMIC_DSI_CAPE_ID = 'dsi_cape'
const SATRAD_OVERLAY_DYNAMIC_LST_ID = 'lst'
const SATRAD_OVERLAY_DYNAMIC_RRQPE_ID = 'rrqpe'
const SATRAD_OVERLAY_DYNAMIC_SST_ID = 'sst'
const SATRAD_OVERLAY_DYNAMIC_TPW_ID = 'tpw'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_CAT_ID = 'spc_day1_cat'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_TOR_ID = 'spc_day1_tor'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_HAIL_ID = 'spc_day1_hail'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_WIND_ID = 'spc_day1_wind'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_CAT_ID = 'spc_day2_cat'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_TOR_ID = 'spc_day2_tor'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_HAIL_ID = 'spc_day2_hail'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_WIND_ID = 'spc_day2_wind'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY3_CAT_ID = 'spc_day3_cat'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY3_PROB_ID = 'spc_day3_prob'

export const SATRAD_OVERLAY_MAPPING_GROUP = [
	SATRAD_OVERLAY_STATIC_MAP_ID,
	SATRAD_OVERLAY_STATIC_LATLON_ID,
	SATRAD_OVERLAY_STATIC_RIVERS_ID,
	SATRAD_OVERLAY_STATIC_COUNTIES_ID,
	SATRAD_OVERLAY_STATIC_US_HIGHWAYS_ID,
	SATRAD_OVERLAY_STATIC_US_INTERSTATES_ID,
	SATRAD_OVERLAY_STATIC_US_STATE_ROAD_ID,
	SATRAD_OVERLAY_STATIC_STATION_IDS_ID,
	SATRAD_OVERLAY_STATIC_COUNTY_WARNING_AREA_ID,
	SATRAD_OVERLAY_STATIC_RANGES_ID,
	SATRAD_OVERLAY_STATIC_ARTCC_ID,
	SATRAD_OVERLAY_DYNAMIC_MAP_ID,
	SATRAD_OVERLAY_DYNAMIC_LATLON_ID,
	SATRAD_OVERLAY_DYNAMIC_RIVERS_ID,
	SATRAD_OVERLAY_DYNAMIC_COUNTIES_ID,
	SATRAD_OVERLAY_DYNAMIC_US_HIGHWAYS_ID,
	SATRAD_OVERLAY_DYNAMIC_US_INTERSTATES_ID,
	SATRAD_OVERLAY_DYNAMIC_US_STATE_ROAD_ID,
	SATRAD_OVERLAY_DYNAMIC_STATION_IDS_ID,
	SATRAD_OVERLAY_DYNAMIC_COUNTY_WARNING_AREA_ID,
	SATRAD_OVERLAY_DYNAMIC_RANGES_ID,
	SATRAD_OVERLAY_DYNAMIC_ARTCC_ID,
]
export const SATRAD_OVERLAY_MESO_GROUP = [
	SATRAD_OVERLAY_DYNAMIC_CAPE_ID,
	SATRAD_OVERLAY_DYNAMIC_CIN_ID,
	SATRAD_OVERLAY_DYNAMIC_DEW_ID,
	SATRAD_OVERLAY_DYNAMIC_DVG_ID,
	SATRAD_OVERLAY_DYNAMIC_MDVG_ID,
	SATRAD_OVERLAY_DYNAMIC_GUSTS_ID,
	SATRAD_OVERLAY_DYNAMIC_MSLP_ID,
	SATRAD_OVERLAY_DYNAMIC_PFALLS_ID,
	SATRAD_OVERLAY_DYNAMIC_PLOT_ID,
	SATRAD_OVERLAY_DYNAMIC_WSYM_ID,
	SATRAD_OVERLAY_DYNAMIC_RADAR_ID,
	SATRAD_OVERLAY_DYNAMIC_SCP_ID,
	SATRAD_OVERLAY_DYNAMIC_STREAMLINES_ID,
	SATRAD_OVERLAY_DYNAMIC_TEMP_ID,
	SATRAD_OVERLAY_DYNAMIC_THETAE_ID,
	SATRAD_OVERLAY_DYNAMIC_THETA_ID,
	SATRAD_OVERLAY_DYNAMIC_VORT_ID,
	SATRAD_OVERLAY_DYNAMIC_WINDV_ID,
	SATRAD_OVERLAY_DYNAMIC_WW_ID,
	SATRAD_OVERLAY_DYNAMIC_H5ANA_ID,
]
export const SATRAD_OVERLAY_GOES_DERIVED_GROUP = [
	SATRAD_OVERLAY_DYNAMIC_GLM_FLASH_ID,
	SATRAD_OVERLAY_DYNAMIC_GLM_FED_ID,
	SATRAD_OVERLAY_DYNAMIC_GLM_TOE_ID,
	SATRAD_OVERLAY_DYNAMIC_GLM_MFA_ID,
	SATRAD_OVERLAY_DYNAMIC_ACHA_ID,
	SATRAD_OVERLAY_DYNAMIC_ACHT_ID,
	SATRAD_OVERLAY_DYNAMIC_ACTP_ID,
	SATRAD_OVERLAY_DYNAMIC_ADP_DUST_ID,
	SATRAD_OVERLAY_DYNAMIC_ADP_SMOKE_ID,
	SATRAD_OVERLAY_DYNAMIC_DSI_CAPE_ID,
	SATRAD_OVERLAY_DYNAMIC_LST_ID,
	SATRAD_OVERLAY_DYNAMIC_RRQPE_ID,
	SATRAD_OVERLAY_DYNAMIC_SST_ID,
	SATRAD_OVERLAY_DYNAMIC_TPW_ID,
]
export const SATRAD_OVERLAY_SPC_GROUP = [
	SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_CAT_ID,
	SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_TOR_ID,
	SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_HAIL_ID,
	SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_WIND_ID,
	SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_CAT_ID,
	SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_TOR_ID,
	SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_HAIL_ID,
	SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_WIND_ID,
	SATRAD_OVERLAY_DYNAMIC_SPC_DAY3_CAT_ID,
	SATRAD_OVERLAY_DYNAMIC_SPC_DAY3_PROB_ID,
]

export const ALL_SATRAD_OVERLAY_GROUPS = {
	maps: {
		name: 'Maps',
		overlays: SATRAD_OVERLAY_MAPPING_GROUP,
	},
	meso: {
		name: 'Mesoanalysis',
		overlays: SATRAD_OVERLAY_MESO_GROUP,
	},
	goes: {
		name: 'GOES Derived',
		overlays: SATRAD_OVERLAY_GOES_DERIVED_GROUP,
	},
	spc: {
		name: 'SPC Outlooks',
		overlays: SATRAD_OVERLAY_SPC_GROUP,
	},
}

export const SATRAD_OVERLAYS = {
	// standard static mapping overlays
	[SATRAD_OVERLAY_STATIC_MAP_ID]: {
		name: 'Political & State Borders',
		opacity: 1,
		zIndex: 100,
	},
	[SATRAD_OVERLAY_STATIC_LATLON_ID]: {
		name: 'Latitude and Longitude',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_STATIC_RIVERS_ID]: {
		name: 'Rivers',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_STATIC_COUNTIES_ID]: {
		name: 'Counties',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_STATIC_US_HIGHWAYS_ID]: {
		name: 'U.S. Highways',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_STATIC_US_INTERSTATES_ID]: {
		name: 'U.S. Interstates',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_STATIC_US_STATE_ROAD_ID]: {
		name: 'U.S. State Routes',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_STATIC_STATION_IDS_ID]: {
		name: 'Station I.D.s',
		opacity: 1,
		zIndex: 110,
	},
	[SATRAD_OVERLAY_STATIC_COUNTY_WARNING_AREA_ID]: {
		name: 'CWA Outlines',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_STATIC_RANGES_ID]: {
		name: 'Ranges',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_STATIC_ARTCC_ID]: {
		name: 'ARTCC Zones',
		opacity: 1,
		zIndex: 90,
	},
	// special dynamic mapping overlays for mesoanalysis sectors
	[SATRAD_OVERLAY_DYNAMIC_MAP_ID]: {
		name: 'Political & State Borders',
		opacity: 1,
		zIndex: 100,
	},
	[SATRAD_OVERLAY_DYNAMIC_LATLON_ID]: {
		name: 'Latitude and Longitude',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_RIVERS_ID]: {
		name: 'Rivers',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_COUNTIES_ID]: {
		name: 'Counties',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_US_HIGHWAYS_ID]: {
		name: 'U.S. Highways',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_US_INTERSTATES_ID]: {
		name: 'U.S. Interstates',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_US_STATE_ROAD_ID]: {
		name: 'U.S. State Routes',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_STATION_IDS_ID]: {
		name: 'Station I.D.s',
		opacity: 1,
		zIndex: 110,
	},
	[SATRAD_OVERLAY_DYNAMIC_COUNTY_WARNING_AREA_ID]: {
		name: 'CWA Outlines',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_RANGES_ID]: {
		name: 'Ranges',
		opacity: 1,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_ARTCC_ID]: {
		name: 'ARTCC Zones',
		opacity: 1,
		zIndex: 90,
	},
	// standard dynamic overlays
	[SATRAD_OVERLAY_DYNAMIC_CAPE_ID]: {
		name: 'CAPE',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_CIN_ID]: {
		name: 'CINH',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_DEW_ID]: {
		name: 'Dewpoint',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_MDVG_ID]: {
		name: 'Moisture Divergence',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_DVG_ID]: {
		name: 'Mass Divergence',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_GUSTS_ID]: {
		name: 'Wind Gusts',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_MSLP_ID]: {
		name: 'Mean Sea Level Pressure',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_PFALLS_ID]: {
		name: 'Pressure Falls',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_PLOT_ID]: {
		name: 'Station Plots',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_WSYM_ID]: {
		name: 'Present Weather',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_RADAR_ID]: {
		name: 'Composite Radar',
		opacity: 0.66,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_SCP_ID]: {
		name: 'Supercell Composite',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_STREAMLINES_ID]: {
		name: 'Streamlines',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_TEMP_ID]: {
		name: 'Temperature',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_THETAE_ID]: {
		name: 'Theta-E',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_THETA_ID]: {
		name: 'Theta',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_VORT_ID]: {
		name: 'Vorticity',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_WINDV_ID]: {
		name: 'Wind Vectors',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_WW_ID]: {
		name: 'Watches & Warnings',
		opacity: 0.75,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_H5ANA_ID]: {
		name: '500mb RAP Analysis',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_GLM_FLASH_ID]: {
		name: 'GLM Flashes',
		opacity: 1,
		zIndex: 150,
	},
	[SATRAD_OVERLAY_DYNAMIC_GLM_FED_ID]: {
		name: 'GLM Flash Extent Density',
		opacity: 1,
		zIndex: 100,
	},
	[SATRAD_OVERLAY_DYNAMIC_GLM_TOE_ID]: {
		name: 'GLM Total Optical Energy',
		opacity: 1,
		zIndex: 100,
	},
	[SATRAD_OVERLAY_DYNAMIC_GLM_MFA_ID]: {
		name: 'GLM Minimum Flash Area',
		opacity: 1,
		zIndex: 100,
	},
	[SATRAD_OVERLAY_DYNAMIC_ACHA_ID]: {
		name: 'Cloud Top Height',
		opacity: 0.66,
		zIndex: 80,
	},
	[SATRAD_OVERLAY_DYNAMIC_ACHT_ID]: {
		name: 'Cloud Top Temperature',
		opacity: 0.33,
		zIndex: 80,
	},
	[SATRAD_OVERLAY_DYNAMIC_ACTP_ID]: {
		name: 'Cloud Top Phase',
		opacity: 0.66,
		zIndex: 80,
	},
	[SATRAD_OVERLAY_DYNAMIC_ADP_DUST_ID]: {
		name: 'Aerosol - Dust',
		opacity: 1,
		zIndex: 80,
	},
	[SATRAD_OVERLAY_DYNAMIC_ADP_SMOKE_ID]: {
		name: 'Aerosol - Smoke',
		opacity: 1,
		zIndex: 50,
	},
	[SATRAD_OVERLAY_DYNAMIC_DSI_CAPE_ID]: {
		name: 'CAPE',
		opacity: 0.5,
		zIndex: 80,
	},
	[SATRAD_OVERLAY_DYNAMIC_LST_ID]: {
		name: 'Land Surface Temperature',
		opacity: 1,
		zIndex: 50,
	},
	[SATRAD_OVERLAY_DYNAMIC_RRQPE_ID]: {
		name: 'Rainfall Rate',
		opacity: 0.66,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_SST_ID]: {
		name: 'Sea Surface Temperature',
		opacity: 1,
		zIndex: 50,
	},
	[SATRAD_OVERLAY_DYNAMIC_TPW_ID]: {
		name: 'Total Precipitable Water',
		opacity: 0.5,
		zIndex: 90,
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_CAT_ID]: {
		name: 'SPC Day 1 Outlook',
		opacity: 1,
		zIndex: 200,
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_TOR_ID]: {
		name: 'SPC Day 1 Tor Probs',
		opacity: 1,
		zIndex: 200,
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_HAIL_ID]: {
		name: 'SPC Day 1 Hail Probs',
		opacity: 1,
		zIndex: 200,
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_WIND_ID]: {
		name: 'SPC Day 1 Wind Probs',
		opacity: 1,
		zIndex: 200,
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_CAT_ID]: {
		name: 'SPC Day 2 Outlook',
		opacity: 1,
		zIndex: 190,
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_TOR_ID]: {
		name: 'SPC Day 2 Tor Probs',
		opacity: 1,
		zIndex: 190,
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_HAIL_ID]: {
		name: 'SPC Day 2 Hail Probs',
		opacity: 1,
		zIndex: 190,
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_WIND_ID]: {
		name: 'SPC Day 2 Wind Probs',
		opacity: 1,
		zIndex: 190,
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY3_CAT_ID]: {
		name: 'SPC Day 3 Outlook',
		opacity: 1,
		zIndex: 180,
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY3_PROB_ID]: {
		name: 'SPC Day 3 Severe Probs',
		opacity: 1,
		zIndex: 180,
	},
}

export const ALL_SATRAD_OVERLAYS = Object.keys(SATRAD_OVERLAYS).map((key) => key)
