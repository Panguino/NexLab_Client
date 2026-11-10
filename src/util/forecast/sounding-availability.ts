import { FORECAST_MODELS } from '../../data/forecast/models'

export function supportsForecastSounding(model: unknown, run: unknown): boolean {
	if (typeof model !== 'string' || typeof run !== 'string' || !/^\d{10}$/.test(run)) return false
	if (!FORECAST_MODELS[model]?.allowForecastSounding) return false
	const hour = Number(run.slice(-2))
	return hour < 24 && (model === 'RAP' || hour % 6 === 0)
}

export function soundingRunFromFrame(frame: unknown, model: unknown): string | null {
	if (typeof frame !== 'string' || typeof model !== 'string') return null
	try {
		const parts = new URL(frame, 'https://weather.cod.edu').pathname.split('/')
		const index = parts.indexOf(model)
		const run = index >= 0 ? parts[index + 1] : undefined
		return run && /^\d{10}$/.test(run) ? run : null
	} catch {
		return null
	}
}
