import { redirect } from 'next/navigation'

/**
 * Redirect /warnings to /warnings/map by default
 */
const Page = () => {
	redirect('/weather-data/text-hazards-outlooks/spc-convective-weather/warnings/map')
}

export default Page
