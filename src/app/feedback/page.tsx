// import { FeedbackPage } from '@/components/blocks/FeedbackPage/FeedbackPage'
import { redirect } from 'next/navigation'

const Page = () => {
	// return <FeedbackPage />
	redirect('/feedback/webform/')
}

export default Page
