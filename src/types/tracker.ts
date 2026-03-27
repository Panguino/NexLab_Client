export type TrackerData = {
	status: string
	status_code: number
	last_update: string
	latitude: number
	longitude: number
	movement: string
	reportUnix: number
	generated_at: string
	status_message: string
}

export type TrackerMapLayer = {
	id: string
	label: string
	description?: string
	active: boolean
}
