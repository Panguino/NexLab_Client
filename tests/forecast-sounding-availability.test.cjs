const assert = require('node:assert/strict')
const test = require('node:test')
const { FORECAST_MODELS } = require('../src/data/forecast/models')
const { supportsForecastSounding, soundingRunFromFrame } = require('../src/util/forecast/sounding-availability')
const { getCompareModelsData } = require('../src/util/dataCalls/forecast/query-comparisons')

test('soundings are available only for the specified models and initialization hours', () => {
	const supportedModels = ['HRRR', 'RAP', 'RRFS', 'RDPS', 'GDPS', 'ECMWF', 'GFS', 'AIFS']
	assert.deepEqual(
		Object.keys(FORECAST_MODELS)
			.filter((model) => FORECAST_MODELS[model].allowForecastSounding)
			.sort(),
		[...supportedModels].sort(),
	)
	assert.equal(FORECAST_MODELS.RRFS3KM, undefined)
	for (const model of Object.keys(FORECAST_MODELS)) {
		for (let hour = 0; hour < 24; hour++) {
			const run = `20261110${String(hour).padStart(2, '0')}`
			assert.equal(
				supportsForecastSounding(model, run),
				supportedModels.includes(model) && (model === 'RAP' || hour % 6 === 0),
				`${model} ${run}`,
			)
		}
	}
	for (const run of [null, '', 'current', '2026111024', '202611100', '2026111000extra']) {
		assert.equal(supportsForecastSounding('RAP', run), false)
	}
})

test('model comparison uses the image run rather than the URL run', () => {
	const frame = 'https://weather.cod.edu/wxdata/forecast/HRRR/2026111006/MW/HRRRMW_sfc_temp_001.png'
	assert.equal(soundingRunFromFrame(frame, 'HRRR'), '2026111006')
	assert.equal(soundingRunFromFrame(frame, 'RRFS'), null)
	assert.equal(soundingRunFromFrame('/placeholder.png', 'HRRR'), null)
	assert.equal(soundingRunFromFrame(null, 'HRRR'), null)
})

test('model comparison removes retired model frames without changing alignment', async () => {
	const originalFetch = global.fetch
	global.fetch = async () => ({
		ok: true,
		json: async () => ({
			err: false,
			models: ['HRRR', 'RRFS3KM', 'RRFS'],
			frames: ['hrrr-frame', 'retired-frame', 'rrfs-frame'],
			validtimes: [1],
			img: { width: 1, height: 1 },
		}),
	})
	try {
		const result = await getCompareModelsData('2026111006', 'MW', 'sfc', 'temp', 1, 'similar')
		assert.deepEqual(result.models, ['HRRR', 'RRFS'])
		assert.deepEqual(result.frames, ['hrrr-frame', 'rrfs-frame'])
	} finally {
		global.fetch = originalFetch
	}
})
