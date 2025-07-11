const FORECAST_READOUT_TEMPERATURE_ID = 'Temp'
const FORECAST_READOUT_MSLP_ID = 'MSLP'
const FORECAST_READOUT_WIND_SPEED_ID = 'Wind_Speed'
const FORECAST_READOUT_WIND_DIRECTION_ID = 'Wind_Direction'
const FORECAST_READOUT_WIND_GUST_ID = 'Wind_Gust'
const FORECAST_READOUT_HEIGHT_ID = 'Height'
const FORECAST_READOUT_PRESSURE_ID = 'Pressure'
const FORECAST_READOUT_2PVU_ID = 'Presure' // yes, this is a typo in the data
const FORECAST_READOUT_CAPE_ID = 'CAPE'
const FORECAST_READOUT_CIN_ID = 'CIN'
const FORECAST_READOUT_QPF_ID = 'QPF'
const FORECAST_READOUT_CLOUD_COVER_ID = 'Cloud_Cover'
const FORECAST_READOUT_RH_ID = 'RH'
const FORECAST_READOUT_DEWPOINT_ID = 'Dewpoint'
const FORECAST_READOUT_LIFTED_INDEX_ID = 'Lifted_Index'
const FORECAST_READOUT_EHI_ID = 'EHI'
const FORECAST_READOUT_FRONTOGENESIS_ID = 'Frontogenesis'
const FORECAST_READOUT_FREEZING_RAIN_ID = 'Freezing_Rain_Accumulation'
const FORECAST_READOUT_HELICITY_ID = 'Helicity'
const FORECAST_READOUT_BRIGHTNESS_TEMPERATURE_ID = 'Brightness_Temperature'
const FORECAST_READOUT_KUCHERA_RATIO_ID = 'Kuchera_Ratio'
const FORECAST_READOUT_LAPSE_RATE_ID = 'Lapse_Rate'
const FORECAST_READOUT_MOISTURE_CONVERGENCE_ID = 'Moisture_Convergence'
const FORECAST_READOUT_TOTAL_PRECIPITATION_ID = 'Total_Precipitation_Accumulation'
const FORECAST_READOUT_PRECIPITATION_RATE_ID = 'Precipitation_Rate'
const FORECAST_READOUT_REFLECTIVITY_ID = 'Reflectivity'
const FORECAST_READOUT_HAIL_ID = 'Hail'
const FORECAST_READOUT_THICKNESS_ID = 'Thickness' // this may be deprecated and succeeded by Depth
const FORECAST_READOUT_THICCNESS_ID = 'THICKNESS' // im clueless why this is different, also likely deprecated and succeeded by Depth
const FORECAST_READOUT_PRECPITABLE_WATER_ID = 'Precipitable_Water'
const FORECAST_READOUT_PROBABILITY_ID = 'Probability'
const FORECAST_READOUT_SCP_ID = 'SCP'
const FORECAST_READOUT_STP_ID = 'STP'
const FORECAST_READOUT_SNOWFALL_ID = 'Snowfall_Accumulation'
const FORECAST_READOUT_THETA_E_ID = 'Theta_e'
const FORECAST_READOUT_UPDRAFT_HELICITY_ID = 'Updraft_Helicity'
const FORECAST_READOUT_VISIBILITY_ID = 'Visibility'
const FORECAST_READOUT_VERTICAL_VELOCITY_ID = 'Vertical_Velocity'
const FORECAST_READOUT_VORTICITY_ID = 'Vorticity'
const FORECAST_READOUT_WETBULB_ID = 'Wetbulb'
const FORECAST_READOUT_WIND_SPEED_500MB_ID = 'Wind_Speed_500mb'
const FORECAST_READOUT_WIND_DIRECTION_500MB_ID = 'Wind_Direction_500mb'
const FORECAST_READOUT_WIND_SPEED_850MB_ID = 'Wind_Speed_850mb'
const FORECAST_READOUT_WIND_DIRECTION_850MB_ID = 'Wind_Direction_850mb'
const FORECAST_READOUT_ECHO_TOPS_ID = 'Echo_Tops'
const FORECAST_READOUT_LIGHTNING_ID = 'Lightning'
const FORECAST_READOUT_VIL_ID = 'VIL'
const FORECAST_READOUT_DEPTH_ID = 'Depth'
const FORECAST_READOUT_STD_ANOM_ID = 'Std_Anom'
const FORECAST_READOUT_ANOMALY_M_ID = 'Anomaly_m'
const FORECAST_READOUT_MEAN_M_ID = 'Mean_m'
const FORECAST_READOUT_ANOMALY_KTS_ID = 'Anomaly_kts'
const FORECAST_READOUT_MEAN_KTS_ID = 'Mean_kts'
const FORECAST_READOUT_ANOMALY_C_ID = 'Anomaly_c'
const FORECAST_READOUT_MEAN_C_ID = 'Mean_c'
const FORECAST_READOUT_ANOMALY_F_ID = 'Anomaly_f'
const FORECAST_READOUT_MEAN_F_ID = 'Mean_f'
const FORECAST_READOUT_ANOMALY_MB_ID = 'Anomaly_mb'
const FORECAST_READOUT_MEAN_MB_ID = 'Mean_mb'
const FORECAST_READOUT_ANOMALY_IN_ID = 'Anomaly_in'
const FORECAST_READOUT_MEAN_IN_ID = 'Mean_in'
const FORECAST_READOUT_WATER_EQUIVALENT_ID = 'Water_Equivalent'
const FORECAST_READOUT_SL_RATIO_ID = 'SL_Ratio'
const FORECAST_READOUT_LID_STRENGTH_INDEX_ID = 'Lid_Strength_Index'
const FORECAST_READOUT_SHEAR_ID = 'Shear'
const FORECAST_READOUT_U_WIND_SPEED_ID = 'U-Wind_Speed'
const FORECAST_READOUT_TEMPERATURE_SFC_ID = 'Temp_SFC'
const FORECAST_READOUT_DEWPOINT_SFC_ID = 'Dewpoint_SFC'
const FORECAST_READOUT_WETBULB_SFC_ID = 'Wetbulb_SFC'

export const createReadout = (readoutProd) => {
	const getUnit = (type) => {
		switch (type) {
			case FORECAST_READOUT_TEMPERATURE_ID:
			case FORECAST_READOUT_DEWPOINT_ID:
			case FORECAST_READOUT_WETBULB_ID:
			case FORECAST_READOUT_LIFTED_INDEX_ID:
			case FORECAST_READOUT_BRIGHTNESS_TEMPERATURE_ID:
			case FORECAST_READOUT_ANOMALY_C_ID:
			case FORECAST_READOUT_MEAN_C_ID:
			case FORECAST_READOUT_LID_STRENGTH_INDEX_ID:
				return '&deg;C'

			case FORECAST_READOUT_TEMPERATURE_SFC_ID:
			case FORECAST_READOUT_DEWPOINT_SFC_ID:
			case FORECAST_READOUT_WETBULB_SFC_ID:
				return '&deg;F'

			case FORECAST_READOUT_MSLP_ID:
			case FORECAST_READOUT_PRESSURE_ID:
			case FORECAST_READOUT_2PVU_ID:
			case FORECAST_READOUT_ANOMALY_MB_ID:
			case FORECAST_READOUT_MEAN_MB_ID:
				return 'mb'

			case FORECAST_READOUT_WIND_SPEED_ID:
			case FORECAST_READOUT_SHEAR_ID:
			case FORECAST_READOUT_WIND_GUST_ID:
			case FORECAST_READOUT_WIND_SPEED_500MB_ID:
			case FORECAST_READOUT_WIND_SPEED_850MB_ID:
			case FORECAST_READOUT_U_WIND_SPEED_ID:
			case FORECAST_READOUT_ANOMALY_KTS_ID:
			case FORECAST_READOUT_MEAN_KTS_ID:
				return 'kts'

			case FORECAST_READOUT_WIND_DIRECTION_ID:
			case FORECAST_READOUT_WIND_DIRECTION_500MB_ID:
			case FORECAST_READOUT_WIND_DIRECTION_850MB_ID:
				return '&deg;'

			case FORECAST_READOUT_HEIGHT_ID:
			case FORECAST_READOUT_THICKNESS_ID:
			case FORECAST_READOUT_ANOMALY_M_ID:
			case FORECAST_READOUT_MEAN_M_ID:
				return 'm'

			case FORECAST_READOUT_CAPE_ID:
			case FORECAST_READOUT_CIN_ID:
				return 'J/kg'

			case FORECAST_READOUT_QPF_ID:
			case FORECAST_READOUT_TOTAL_PRECIPITATION_ID:
			case FORECAST_READOUT_SNOWFALL_ID:
			case FORECAST_READOUT_FREEZING_RAIN_ID:
			case FORECAST_READOUT_WATER_EQUIVALENT_ID:
			case FORECAST_READOUT_ANOMALY_IN_ID:
			case FORECAST_READOUT_MEAN_IN_ID:
			case FORECAST_READOUT_HAIL_ID:
			case FORECAST_READOUT_PRECPITABLE_WATER_ID:
				return 'in'

			case FORECAST_READOUT_CLOUD_COVER_ID:
			case FORECAST_READOUT_RH_ID:
			case FORECAST_READOUT_PROBABILITY_ID:
				return '%'

			case FORECAST_READOUT_EHI_ID:
			case FORECAST_READOUT_SCP_ID:
			case FORECAST_READOUT_STP_ID:
			case FORECAST_READOUT_KUCHERA_RATIO_ID:
			case FORECAST_READOUT_SL_RATIO_ID:
				return ''

			case FORECAST_READOUT_FRONTOGENESIS_ID:
				return '&deg;C / 100km &middot; 3hr'

			case FORECAST_READOUT_HELICITY_ID:
			case FORECAST_READOUT_UPDRAFT_HELICITY_ID:
				return 'm<sup>2</sup>/s<sup>2</sup>'

			case FORECAST_READOUT_LAPSE_RATE_ID:
				return '&deg;C/km'

			case FORECAST_READOUT_MOISTURE_CONVERGENCE_ID:
				return 'g&middot;kg<sup>-1</sup>&middot;s<sup>-1</sup>'

			case FORECAST_READOUT_PRECIPITATION_RATE_ID:
				return 'in/hr'

			case FORECAST_READOUT_REFLECTIVITY_ID:
				return 'dBZ'

			case FORECAST_READOUT_THETA_E_ID:
				return '&deg;K'

			case FORECAST_READOUT_VISIBILITY_ID:
				return 'SM'

			case FORECAST_READOUT_VERTICAL_VELOCITY_ID:
				return '&mu;b&middot;s<sup>-1</sup>'

			case FORECAST_READOUT_VORTICITY_ID:
				return 's<sup>-1</sup>'

			case FORECAST_READOUT_ECHO_TOPS_ID:
			case FORECAST_READOUT_THICCNESS_ID:
			case FORECAST_READOUT_DEPTH_ID:
				return 'Kft'

			case FORECAST_READOUT_LIGHTNING_ID:
				return 'flashes/km<sup>2</sup>/5min'

			case FORECAST_READOUT_VIL_ID:
				return 'kg&middot;m<sup>-2</sup>'

			case FORECAST_READOUT_STD_ANOM_ID:
				return 'sigma'

			case FORECAST_READOUT_ANOMALY_F_ID:
			case FORECAST_READOUT_MEAN_F_ID:
				return '&deg;F'

			default:
				return ''
		}
	}

	const readoutLabel = {
		[FORECAST_READOUT_TEMPERATURE_ID]: { label: 'Temperature' },
		[FORECAST_READOUT_MSLP_ID]: { label: 'Sea Level Pres.' },
		[FORECAST_READOUT_WIND_SPEED_ID]: { label: 'Speed' },
		[FORECAST_READOUT_SHEAR_ID]: { label: 'Bulk Wind Diff.' },
		[FORECAST_READOUT_WIND_DIRECTION_ID]: { label: 'Direction' },
		[FORECAST_READOUT_WIND_GUST_ID]: { label: 'Gust' },
		[FORECAST_READOUT_HEIGHT_ID]: { label: 'Height' },
		[FORECAST_READOUT_PRESSURE_ID]: { label: 'Pressure' },
		[FORECAST_READOUT_CAPE_ID]: { label: 'CAPE' },
		[FORECAST_READOUT_CIN_ID]: { label: 'CIN' },
		[FORECAST_READOUT_QPF_ID]: { label: 'QPF' },
		[FORECAST_READOUT_CLOUD_COVER_ID]: { label: 'Cloud Cover' },
		[FORECAST_READOUT_RH_ID]: { label: 'Rel. Humidity' },
		[FORECAST_READOUT_DEWPOINT_ID]: { label: 'Dewpoint' },
		[FORECAST_READOUT_LIFTED_INDEX_ID]: { label: 'LI' },
		[FORECAST_READOUT_EHI_ID]: { label: 'EHI' },
		[FORECAST_READOUT_FRONTOGENESIS_ID]: { label: 'Advection Rate' },
		[FORECAST_READOUT_FREEZING_RAIN_ID]: { label: 'FZRA' },
		[FORECAST_READOUT_HELICITY_ID]: { label: 'Helicity' },
		[FORECAST_READOUT_BRIGHTNESS_TEMPERATURE_ID]: { label: 'Temperature' },
		[FORECAST_READOUT_KUCHERA_RATIO_ID]: { label: 'Ratio' },
		[FORECAST_READOUT_LAPSE_RATE_ID]: { label: 'Rate' },
		[FORECAST_READOUT_MOISTURE_CONVERGENCE_ID]: { label: 'MDIV' },
		[FORECAST_READOUT_TOTAL_PRECIPITATION_ID]: { label: 'Precip.' },
		[FORECAST_READOUT_PRECIPITATION_RATE_ID]: { label: 'Rate' },
		[FORECAST_READOUT_REFLECTIVITY_ID]: { label: 'Reflectivity' },
		[FORECAST_READOUT_HAIL_ID]: { label: 'Hail Size' },
		[FORECAST_READOUT_THICKNESS_ID]: { label: 'Thick' },
		[FORECAST_READOUT_PRECPITABLE_WATER_ID]: { label: 'PWAT' },
		[FORECAST_READOUT_PROBABILITY_ID]: { label: 'Probability' },
		[FORECAST_READOUT_SCP_ID]: { label: 'SCP' },
		[FORECAST_READOUT_STP_ID]: { label: 'STP' },
		[FORECAST_READOUT_SNOWFALL_ID]: { label: 'SN' },
		[FORECAST_READOUT_THETA_E_ID]: { label: 'Theta-E' },
		[FORECAST_READOUT_UPDRAFT_HELICITY_ID]: { label: 'UD Helicity' },
		[FORECAST_READOUT_VISIBILITY_ID]: { label: 'Visibility' },
		[FORECAST_READOUT_VERTICAL_VELOCITY_ID]: { label: 'Vertical Velocity' },
		[FORECAST_READOUT_VORTICITY_ID]: { label: 'Vorticity' },
		[FORECAST_READOUT_WETBULB_ID]: { label: 'Wet Bulb' },
		[FORECAST_READOUT_WIND_SPEED_500MB_ID]: { label: 'Speed' },
		[FORECAST_READOUT_WIND_DIRECTION_500MB_ID]: { label: 'Direction' },
		[FORECAST_READOUT_WIND_SPEED_850MB_ID]: { label: 'Speed' },
		[FORECAST_READOUT_WIND_DIRECTION_850MB_ID]: { label: 'Direction' },
		[FORECAST_READOUT_ECHO_TOPS_ID]: { label: 'Height' },
		[FORECAST_READOUT_LIGHTNING_ID]: { label: 'Density' },
		[FORECAST_READOUT_VIL_ID]: { label: 'VIL' },
		[FORECAST_READOUT_THICCNESS_ID]: { label: 'THICK' },
		[FORECAST_READOUT_DEPTH_ID]: { label: 'DGZ Depth' },
		[FORECAST_READOUT_STD_ANOM_ID]: { label: 'Std. Anom.' },
		[FORECAST_READOUT_U_WIND_SPEED_ID]: { label: 'U-Wind Speed' },
		[FORECAST_READOUT_ANOMALY_M_ID]: { label: 'Anomaly' },
		[FORECAST_READOUT_MEAN_M_ID]: { label: 'Mean' },
		[FORECAST_READOUT_ANOMALY_KTS_ID]: { label: 'Anomaly' },
		[FORECAST_READOUT_MEAN_KTS_ID]: { label: 'Mean' },
		[FORECAST_READOUT_ANOMALY_C_ID]: { label: 'Anomaly' },
		[FORECAST_READOUT_MEAN_C_ID]: { label: 'Mean' },
		[FORECAST_READOUT_ANOMALY_F_ID]: { label: 'Anomaly' },
		[FORECAST_READOUT_MEAN_F_ID]: { label: 'Mean' },
		[FORECAST_READOUT_ANOMALY_MB_ID]: { label: 'Anomaly' },
		[FORECAST_READOUT_MEAN_MB_ID]: { label: 'Mean' },
		[FORECAST_READOUT_ANOMALY_IN_ID]: { label: 'Anomaly' },
		[FORECAST_READOUT_MEAN_IN_ID]: { label: 'Mean' },
		[FORECAST_READOUT_WATER_EQUIVALENT_ID]: { label: 'Liquid Equivalent' },
		[FORECAST_READOUT_SL_RATIO_ID]: { label: 'SN Ratio' },
		[FORECAST_READOUT_LID_STRENGTH_INDEX_ID]: { label: 'Lid Strength' },
		[FORECAST_READOUT_2PVU_ID]: { label: 'Pressure' },
		[FORECAST_READOUT_TEMPERATURE_SFC_ID]: { label: 'Temperature' },
		[FORECAST_READOUT_DEWPOINT_SFC_ID]: { label: 'Dewpoint' },
		[FORECAST_READOUT_WETBULB_SFC_ID]: { label: 'Wet Bulb' },
	}

	const label = readoutLabel[readoutProd]?.label || readoutProd
	const output = {
		label: label,
		unit: getUnit(readoutProd),
	}

	return output // if the readoutProd is not found, readoutProd will be returned as label without unit
}
