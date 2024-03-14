'use client'

import { useEffect, useState } from 'react'
import { getDegrees } from '@/apollo/getDegrees'
import { DegreeInfo } from '@/components/blocks/DegreeInfo/DegreeInfo'

const Page = () => {
	const [degrees, setDegrees] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const res = await getDegrees()
			setDegrees(res)
		}
		fetchData().catch(console.error)
	}, [])
	console.log(degrees) // comment out eventually
	return (
		<div>
			{degrees.map((d, index) => {
				const { Title, Buttons, Description } = d.attributes
				return <DegreeInfo key={index} Title={Title} Buttons={Buttons} Description={Description} />
			})}
		</div>
	)
}

export default Page
