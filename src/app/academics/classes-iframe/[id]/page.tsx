import { getCourseById } from '@/apollo/strapi/getCourseById'
import { ClassInfo } from '@/components/blocks/ClassInfo/ClassInfo'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'

const Page = async ({ params }) => {
	const course = await getCourseById(params.id)
	console.log('course', course)
	//console.log('res', response.data.course.data.attributes)
	const { Title, CourseID, Description, MaterialGroup } = course
	return (
		<PageContentWrapper>
			<ClassInfo Title={Title} CourseID={CourseID} Description={Description} MaterialGroup={MaterialGroup} />
		</PageContentWrapper>
	)
}

export default Page
export const dynamic = 'force-dynamic'
