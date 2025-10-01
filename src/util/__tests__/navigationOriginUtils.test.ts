import {
	buildBackRoute,
	createNavigationOrigin,
	extractStateFromRoute,
	getOriginFromRoute,
	isDirectSoundingAccess,
	isOriginValid,
	restoreUIState
} from '../navigationOriginUtils'
import { NavigationOrigin } from '@/store/navigationSlice'

describe('navigationOriginUtils', () => {
	describe('getOriginFromRoute', () => {
		it('should identify main model viewer route', () => {
			const route = '/weather-data/forecast-models/123/gfs/conus/500/vort'
			const result = getOriginFromRoute(route)
			
			expect(result).toEqual({
				type: 'main',
				label: 'Main Model Viewer'
			})
		})

		it('should identify height comparison route', () => {
			const route = '/weather-data/forecast-models/123/gfs/conus/500/vort/compare-height/123456789'
			const result = getOriginFromRoute(route)
			
			expect(result).toEqual({
				type: 'height-comparison',
				label: 'Height Comparison'
			})
		})

		it('should identify run comparison route', () => {
			const route = '/weather-data/forecast-models/123/gfs/conus/500/vort/compare-runs/123456789'
			const result = getOriginFromRoute(route)
			
			expect(result).toEqual({
				type: 'run-comparison',
				label: 'Run Comparison'
			})
		})

		it('should identify models comparison route', () => {
			const route = '/weather-data/forecast-models/123/gfs/conus/500/vort/compare-models/123456789'
			const result = getOriginFromRoute(route)
			
			expect(result).toEqual({
				type: 'models-comparison',
				label: 'Models Comparison'
			})
		})

		it('should return null for non-forecast routes', () => {
			const route = '/weather-data/nexrad/conus/n0b'
			const result = getOriginFromRoute(route)
			
			expect(result).toBeNull()
		})

		it('should return null for invalid routes', () => {
			const route = '/invalid/route'
			const result = getOriginFromRoute(route)
			
			expect(result).toBeNull()
		})
	})

	describe('extractStateFromRoute', () => {
		const mockStore = {
			forecastZoomState: { positionX: 10, positionY: 20, scale: 1.5 },
			forecastFrameValidTime: 123456789,
			runFlag: 'recent'
		}

		it('should extract valid time from comparison routes', () => {
			const route = '/weather-data/forecast-models/123/gfs/conus/500/vort/compare-height/987654321'
			const state = extractStateFromRoute(route, mockStore)
			
			expect(state.validTime).toBe('987654321')
		})

		it('should extract zoom state from store', () => {
			const route = '/weather-data/forecast-models/123/gfs/conus/500/vort'
			const state = extractStateFromRoute(route, mockStore)
			
			expect(state.zoomState).toEqual({ positionX: 10, positionY: 20, scale: 1.5 })
		})

		it('should extract frame valid time from store', () => {
			const route = '/weather-data/forecast-models/123/gfs/conus/500/vort'
			const state = extractStateFromRoute(route, mockStore)
			
			expect(state.frameValidTime).toBe(123456789)
		})

		it('should extract run flag from store', () => {
			const route = '/weather-data/forecast-models/123/gfs/conus/500/vort'
			const state = extractStateFromRoute(route, mockStore)
			
			expect(state.runFlag).toBe('recent')
		})
	})

	describe('isDirectSoundingAccess', () => {
		it('should return true when no previous route', () => {
			const result = isDirectSoundingAccess(null, '/weather-data/forecast-models/123/gfs/conus/500/vort/sounding/123/40.0,-95.0/ml/severe')
			expect(result).toBe(true)
		})

		it('should return true when previous route is not forecast models', () => {
			const result = isDirectSoundingAccess('/weather-data/nexrad/conus/n0b', '/weather-data/forecast-models/123/gfs/conus/500/vort/sounding/123/40.0,-95.0/ml/severe')
			expect(result).toBe(true)
		})

		it('should return true when previous route is already a sounding', () => {
			const result = isDirectSoundingAccess(
				'/weather-data/forecast-models/123/gfs/conus/500/vort/sounding/123/40.0,-95.0/ml/severe',
				'/weather-data/forecast-models/123/gfs/conus/500/vort/sounding/456/41.0,-96.0/ml/severe'
			)
			expect(result).toBe(true)
		})

		it('should return false when navigating from valid forecast route to sounding', () => {
			const result = isDirectSoundingAccess(
				'/weather-data/forecast-models/123/gfs/conus/500/vort',
				'/weather-data/forecast-models/123/gfs/conus/500/vort/sounding/123/40.0,-95.0/ml/severe'
			)
			expect(result).toBe(false)
		})
	})

	describe('buildBackRoute', () => {
		it('should return the origin route', () => {
			const origin: NavigationOrigin = {
				route: '/weather-data/forecast-models/123/gfs/conus/500/vort',
				label: 'Main Model Viewer',
				timestamp: Date.now()
			}
			
			const result = buildBackRoute(origin)
			expect(result).toBe('/weather-data/forecast-models/123/gfs/conus/500/vort')
		})
	})

	describe('isOriginValid', () => {
		it('should return false for null origin', () => {
			const result = isOriginValid(null)
			expect(result).toBe(false)
		})

		it('should return true for recent origin', () => {
			const origin: NavigationOrigin = {
				route: '/test',
				label: 'Test',
				timestamp: Date.now() - 1000 // 1 second ago
			}
			
			const result = isOriginValid(origin)
			expect(result).toBe(true)
		})

		it('should return false for old origin', () => {
			const origin: NavigationOrigin = {
				route: '/test',
				label: 'Test',
				timestamp: Date.now() - (31 * 60 * 1000) // 31 minutes ago
			}
			
			const result = isOriginValid(origin)
			expect(result).toBe(false)
		})

		it('should respect custom max age', () => {
			const origin: NavigationOrigin = {
				route: '/test',
				label: 'Test',
				timestamp: Date.now() - 2000 // 2 seconds ago
			}
			
			const result = isOriginValid(origin, 1000) // 1 second max age
			expect(result).toBe(false)
		})
	})

	describe('restoreUIState', () => {
		it('should restore zoom state', () => {
			const mockStore = {
				setForecastZoomState: jest.fn(),
				setForecastFrameValidTime: jest.fn(),
				setRunFlag: jest.fn()
			}

			const origin: NavigationOrigin = {
				route: '/test',
				label: 'Test',
				timestamp: Date.now(),
				state: {
					zoomState: { positionX: 10, positionY: 20, scale: 1.5 }
				}
			}

			restoreUIState(origin, mockStore)

			expect(mockStore.setForecastZoomState).toHaveBeenCalledWith({ positionX: 10, positionY: 20, scale: 1.5 })
		})

		it('should handle missing state gracefully', () => {
			const mockStore = {
				setForecastZoomState: jest.fn()
			}

			const origin: NavigationOrigin = {
				route: '/test',
				label: 'Test',
				timestamp: Date.now()
			}

			expect(() => restoreUIState(origin, mockStore)).not.toThrow()
		})
	})
})
