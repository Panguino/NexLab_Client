import { HydroEROPage } from '@/components/blocks/HydroEROPage/HydroEROPage'

interface PageProps {
	params: Promise<{ hydroEROValidId: string }>
}

const Page = async ({ params }: PageProps) => {
	const { hydroEROValidId } = await params
	return <HydroEROPage validTime={hydroEROValidId} />
}

export default Page
