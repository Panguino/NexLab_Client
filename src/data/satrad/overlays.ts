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

export const SATRAD_STATIC_OVERLAYS = {
	[SATRAD_OVERLAY_STATIC_MAP_ID]: {
		name: 'Political & State Borders',
	},
	[SATRAD_OVERLAY_STATIC_LATLON_ID]: {
		name: 'Latitude and Longitude',
	},
	[SATRAD_OVERLAY_STATIC_RIVERS_ID]: {
		name: 'Rivers',
	},
	[SATRAD_OVERLAY_STATIC_COUNTIES_ID]: {
		name: 'Counties',
	},
	[SATRAD_OVERLAY_STATIC_US_HIGHWAYS_ID]: {
		name: 'U.S. Highways',
	},
	[SATRAD_OVERLAY_STATIC_US_INTERSTATES_ID]: {
		name: 'U.S. Interstates',
	},
	[SATRAD_OVERLAY_STATIC_US_STATE_ROAD_ID]: {
		name: 'U.S. State Routes',
	},
	[SATRAD_OVERLAY_STATIC_STATION_IDS_ID]: {
		name: 'Station I.D.s',
	},
	[SATRAD_OVERLAY_STATIC_COUNTY_WARNING_AREA_ID]: {
		name: 'CWA Outlines',
	},
	[SATRAD_OVERLAY_STATIC_RANGES_ID]: {
		name: 'Ranges',
	},
	[SATRAD_OVERLAY_STATIC_ARTCC_ID]: {
		name: 'ARTCC Zones',
	},
}

export const ALL_SATRAD_STATIC_OVERLAYS = Object.keys(SATRAD_STATIC_OVERLAYS).map((key) => key)

const SATRAD_OVERLAY_DYNAMIC_CAPE_ID = 'cape'
const SATRAD_OVERLAY_DYNAMIC_CIN_ID = 'cin'
const SATRAD_OVERLAY_DYNAMIC_DEW_ID = 'dew'
const SATRAD_OVERLAY_DYNAMIC_DVG_ID = 'dvg'
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
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_PROB_ID = 'spc_day2_prob'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_TOR_ID = 'spc_day2_tor'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_HAIL_ID = 'spc_day2_hail'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_WIND_ID = 'spc_day2_wind'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY3_CAT_ID = 'spc_day3_cat'
const SATRAD_OVERLAY_DYNAMIC_SPC_DAY3_PROB_ID = 'spc_day3_prob'

export const SATRAD_DYNAMIC_OVERLAYS = {
	[SATRAD_OVERLAY_DYNAMIC_CAPE_ID]: {
		name: 'CAPE',
	},
	[SATRAD_OVERLAY_DYNAMIC_CIN_ID]: {
		name: 'CINH',
	},
	[SATRAD_OVERLAY_DYNAMIC_DEW_ID]: {
		name: 'Dewpoint',
	},
	[SATRAD_OVERLAY_DYNAMIC_DVG_ID]: {
		name: 'Mass Divergence',
	},
	[SATRAD_OVERLAY_DYNAMIC_GUSTS_ID]: {
		name: 'Wind Gusts',
	},
	[SATRAD_OVERLAY_DYNAMIC_MSLP_ID]: {
		name: 'Mean Sea Level Pressure',
	},
	[SATRAD_OVERLAY_DYNAMIC_PFALLS_ID]: {
		name: 'Pressure Falls',
	},
	[SATRAD_OVERLAY_DYNAMIC_PLOT_ID]: {
		name: 'Station Plots',
	},
	[SATRAD_OVERLAY_DYNAMIC_WSYM_ID]: {
		name: 'Present Weather',
	},
	[SATRAD_OVERLAY_DYNAMIC_RADAR_ID]: {
		name: 'Composite Radar',
	},
	[SATRAD_OVERLAY_DYNAMIC_SCP_ID]: {
		name: 'Supercell Composite',
	},
	[SATRAD_OVERLAY_DYNAMIC_STREAMLINES_ID]: {
		name: 'Streamlines',
	},
	[SATRAD_OVERLAY_DYNAMIC_TEMP_ID]: {
		name: 'Temperature',
	},
	[SATRAD_OVERLAY_DYNAMIC_THETAE_ID]: {
		name: 'Theta-E',
	},
	[SATRAD_OVERLAY_DYNAMIC_THETA_ID]: {
		name: 'Theta',
	},
	[SATRAD_OVERLAY_DYNAMIC_VORT_ID]: {
		name: 'Vorticity',
	},
	[SATRAD_OVERLAY_DYNAMIC_WINDV_ID]: {
		name: 'Wind Vectors',
	},
	[SATRAD_OVERLAY_DYNAMIC_WW_ID]: {
		name: 'Watches & Warnings',
	},
	[SATRAD_OVERLAY_DYNAMIC_H5ANA_ID]: {
		name: '500mb RAP Analysis',
	},
	[SATRAD_OVERLAY_DYNAMIC_GLM_FLASH_ID]: {
		name: 'GLM Flashes',
	},
	[SATRAD_OVERLAY_DYNAMIC_GLM_FED_ID]: {
		name: 'GLM Flash Extent Density',
	},
	[SATRAD_OVERLAY_DYNAMIC_GLM_TOE_ID]: {
		name: 'GLM Total Optical Energy',
	},
	[SATRAD_OVERLAY_DYNAMIC_GLM_MFA_ID]: {
		name: 'GLM Minimum Flash Area',
	},
	[SATRAD_OVERLAY_DYNAMIC_ACHA_ID]: {
		name: 'Cloud Top Height',
	},
	[SATRAD_OVERLAY_DYNAMIC_ACHT_ID]: {
		name: 'Cloud Top Temperature',
	},
	[SATRAD_OVERLAY_DYNAMIC_ACTP_ID]: {
		name: 'Cloud Top Phase',
	},
	[SATRAD_OVERLAY_DYNAMIC_ADP_DUST_ID]: {
		name: 'Aerosol - Dust',
	},
	[SATRAD_OVERLAY_DYNAMIC_ADP_SMOKE_ID]: {
		name: 'Aerosol - Smoke',
	},
	[SATRAD_OVERLAY_DYNAMIC_DSI_CAPE_ID]: {
		name: 'CAPE',
	},
	[SATRAD_OVERLAY_DYNAMIC_LST_ID]: {
		name: 'Land Surface Temperature',
	},
	[SATRAD_OVERLAY_DYNAMIC_RRQPE_ID]: {
		name: 'Rainfall Rate',
	},
	[SATRAD_OVERLAY_DYNAMIC_SST_ID]: {
		name: 'Sea Surface Temperature',
	},
	[SATRAD_OVERLAY_DYNAMIC_TPW_ID]: {
		name: 'Total Precipitable Water',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_CAT_ID]: {
		name: 'SPC Day 1 Outlook',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_TOR_ID]: {
		name: 'SPC Day 1 Tor Probs',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_HAIL_ID]: {
		name: 'SPC Day 1 Hail Probs',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY1_WIND_ID]: {
		name: 'SPC Day 1 Wind Probs',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_CAT_ID]: {
		name: 'SPC Day 2 Outlook',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_PROB_ID]: {
		name: 'SPC Day 2 Severe Probs',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_TOR_ID]: {
		name: 'SPC Day 2 Tor Probs',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_HAIL_ID]: {
		name: 'SPC Day 2 Hail Probs',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY2_WIND_ID]: {
		name: 'SPC Day 2 Wind Probs',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY3_CAT_ID]: {
		name: 'SPC Day 3 Outlook',
	},
	[SATRAD_OVERLAY_DYNAMIC_SPC_DAY3_PROB_ID]: {
		name: 'SPC Day 3 Severe Probs',
	},
}

export const ALL_SATRAD_DYNAMIC_OVERLAYS = Object.keys(SATRAD_DYNAMIC_OVERLAYS).map((key) => key)
