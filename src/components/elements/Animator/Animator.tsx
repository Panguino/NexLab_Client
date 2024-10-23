import { nexrad_data } from '@/util/dataCall'

export const getNexradData = async (site, product, frames) => {
	const data = await nexrad_data(site, product, frames)
	return data
}
