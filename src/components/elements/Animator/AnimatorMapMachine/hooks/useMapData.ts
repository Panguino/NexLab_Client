import countiesData from '@/data/d3Map/counties.json'
import countriesData from '@/data/d3Map/countries.json'
import cwaZonesData from '@/data/d3Map/cwaZones.json'
import fireZonesData from '@/data/d3Map/fireZones.json'
import forecastZonesData from '@/data/d3Map/forecastZones.json'
import lakesData from '@/data/d3Map/lakes.json'
import statesData from '@/data/d3Map/states.json'
import worldData from '@/data/d3Map/world.json'
import { useMemo } from 'react'

/**
 * useMapData - Hook to load and provide all static GeoJSON map data
 *
 * Returns all the static map data needed for rendering:
 * - World countries
 * - US states
 * - Great Lakes
 * - Counties
 * - CWA zones
 * - Fire zones
 * - Forecast zones
 */
export const useMapData = () => {
	return useMemo(
		() => ({
			worldData,
			statesData,
			lakesData,
			countiesData,
			cwaZonesData,
			fireZonesData,
			forecastZonesData,
			countriesData,
		}),
		[],
	)
}
