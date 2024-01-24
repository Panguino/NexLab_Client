'use server'
import { gql } from '@apollo/client'
import { getClient } from '@/apollo/apollo-client'

export const getDegrees = async () => {
	const response = await getClient().query({
		query: gql`
		query {
			degrees {
			  data {
				id
				attributes {
				  Title
				  Description
				  Buttons {
					Label
					Link
					Style
				  }
				  Schools {
					SchoolList
					SchoolLinks {
					  School
					  Link
					}
				  }
				}
			  }
			}
		  }
		`
	})
	return response.data.degrees.data
}
