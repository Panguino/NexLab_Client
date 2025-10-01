import { createNavigationSlice, NavigationOrigin } from '../navigationSlice'

// Mock store setup
const mockSet = jest.fn()
const mockGet = jest.fn()

describe('navigationSlice', () => {
	let slice: ReturnType<typeof createNavigationSlice>

	beforeEach(() => {
		jest.clearAllMocks()
		slice = createNavigationSlice(mockSet, mockGet)
	})

	describe('initial state', () => {
		it('should have null soundingOrigin initially', () => {
			expect(slice.soundingOrigin).toBeNull()
		})
	})

	describe('setSoundingOrigin', () => {
		it('should set the sounding origin', () => {
			const origin: NavigationOrigin = {
				route: '/weather-data/forecast-models/123/gfs/conus/500/vort',
				label: 'Main Model Viewer',
				timestamp: Date.now(),
				state: {
					validTime: '123456789',
					zoomState: { positionX: 0, positionY: 0, scale: 1 }
				}
			}

			slice.setSoundingOrigin(origin)

			expect(mockSet).toHaveBeenCalledWith({ soundingOrigin: origin })
		})

		it('should allow setting origin to null', () => {
			slice.setSoundingOrigin(null)

			expect(mockSet).toHaveBeenCalledWith({ soundingOrigin: null })
		})
	})

	describe('clearSoundingOrigin', () => {
		it('should clear the sounding origin', () => {
			slice.clearSoundingOrigin()

			expect(mockSet).toHaveBeenCalledWith({ soundingOrigin: null })
		})
	})

	describe('trackBackNavigation', () => {
		beforeEach(() => {
			// Mock window.gtag
			global.window = {
				gtag: jest.fn()
			} as any
		})

		afterEach(() => {
			delete (global as any).window
		})

		it('should log telemetry data', () => {
			const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

			slice.trackBackNavigation('main', '/weather-data/forecast-models/123/gfs/conus/500/vort', true, 150)

			expect(consoleSpy).toHaveBeenCalledWith(
				'🔙 Back Navigation Telemetry:',
				expect.objectContaining({
					origin: 'main',
					destination: '/weather-data/forecast-models/123/gfs/conus/500/vort',
					success: true,
					latency: 150,
					timestamp: expect.any(Number)
				})
			)

			consoleSpy.mockRestore()
		})

		it('should call gtag when available', () => {
			const mockGtag = jest.fn()
			global.window.gtag = mockGtag

			slice.trackBackNavigation('height-comparison', '/weather-data/forecast-models/123/gfs/conus/500/vort/compare-height/123456789', true, 200)

			expect(mockGtag).toHaveBeenCalledWith('event', 'sounding_back_navigation', {
				origin_type: 'height-comparison',
				destination_route: '/weather-data/forecast-models/123/gfs/conus/500/vort/compare-height/123456789',
				success: true,
				latency_ms: 200,
				custom_parameter_1: 'forecast_sounding'
			})
		})

		it('should handle missing gtag gracefully', () => {
			delete global.window.gtag

			expect(() => {
				slice.trackBackNavigation('main', '/test', true, 100)
			}).not.toThrow()
		})
	})
})
