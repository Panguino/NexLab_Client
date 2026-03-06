import { AdminProductPage } from '@/components/blocks/AdminProductPage/AdminProductPage'

interface PageProps {
	params: Promise<{
		adminOfficeId: string
		adminProdId: string
		adminValidId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { adminOfficeId, adminProdId, adminValidId } = await params
	return <AdminProductPage officeId={adminOfficeId} productId={adminProdId} validTime={adminValidId} />
}

export default Page
