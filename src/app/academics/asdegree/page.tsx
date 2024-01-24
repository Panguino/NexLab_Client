'use client'

import { useEffect, useState } from 'react'
import {getDegrees} from '@/apollo/getDegrees'

const Page = () => {
	const [degrees, setDegrees] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const res = await getDegrees()
			setDegrees(res)
		}
		fetchData().catch(console.error)
	}, [])
	console.log(degrees)
	return <>AS Degree and Transfer Landing Page</>
}

export default Page
