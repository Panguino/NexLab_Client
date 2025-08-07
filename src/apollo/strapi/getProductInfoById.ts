'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getProductInfoById = async (id: string) => {
	console.log('getProductInfoById', id)
	const productInfoResponse = await getClient().query({
		query: gql`
            query {
                weatherDataProduct(documentId: "${id}") {
                    name
                    description
                    documentId
                    image {
                        url
                        height
                        hash
                    }
                }
            }
        `,
	})
	console.log(productInfoResponse.data.weatherDataProduct)
	const { name, description, image } = productInfoResponse.data.weatherDataProduct
	return { name, description, image: image?.url || null }
}
