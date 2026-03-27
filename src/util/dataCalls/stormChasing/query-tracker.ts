import { getData } from '../dataCall-generic'

const TRACKER_ENDPOINT = 'https://weather.cod.edu/chasing/tracker/assets/json/cod-tracker.json'

export const getTrackerData = async () => {
	return await getData(TRACKER_ENDPOINT)
}
