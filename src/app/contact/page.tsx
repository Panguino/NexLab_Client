import { useEffect, useState } from 'react'
import MainContent from '@/components/layout/MainContent/MainContent'
import { ContactForm } from '@/components/blocks/ContactForm/ContactForm'

const Page = () => {
	return (
		<MainContent>
			<ContactForm />
		</MainContent>
	)
}

export default Page
