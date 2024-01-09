import { gql } from '@apollo/client'

import { getClient } from '@/apollo/apollo-client'
import { RichText } from '@/components/elements/RichText/RichText'

const Page = async ({ params }) => {
	const response = await getClient().query({
		query: gql`
			query {
				course(id: ${params.id}) {
					data {
						id
						attributes {							
							Title
							CourseID
							Description
							MaterialGroup {
								id
								Name
								Materials {
									id
									Name
									File {
										data {
											attributes {
												url
												size
												ext
											}
										}
									}
								}
							}
						}
					}
				}
			}
		`
	})
	//console.log('res', response.data.course.data.attributes)
	const { Title, CourseID, Description, MaterialGroup } = response.data.course.data.attributes
	return (
		<div>
			<h3>Earth {CourseID}</h3>
			<h1>{Title}</h1>
			<RichText text={Description} />
			{MaterialGroup.map((MaterialGroupItem, index) => {
				const { Name, Materials } = MaterialGroupItem
				// make sure materials group has items in it before displaying it
				if (Materials.length > 0) {
					return (
						<div key={index}>
							<b>{Name}</b>
							{Materials.map((Material, index) => {
								return (
									<div key={index}>
										{Material.Name} - {Material.File.data.attributes.url}
									</div>
								)
							})}
						</div>
					)
				}
			})}
		</div>
	)
}

export default Page
