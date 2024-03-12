'use client'

import { useEffect, useState } from 'react'
import MainContent from '@/components/layout/MainContent/MainContent'
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
		<MainContent>
			{degrees.map((d, index) => {
				const { Title, Buttons, Description } = d.attributes
				return <DegreeInfo key={index} Title={Title} Buttons={Buttons} Description={Description} />
			})}
		</MainContent>
	)
}

export default Page
