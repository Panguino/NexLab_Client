'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getDataPageContent = async (id) => {
	const getDataPageContentResponse = await getClient().query({
		query: gql`
			query {
				page(documentId: "${id}") {
                    SEO {
                        metaTitle
                        metaDescription
                        metaImage {
                            url
                        }
                        metaSocial {
                            id
                            socialNetwork
                            title
                            description
                            image {
                                url
                            }
                        }
                        keywords
                        metaRobots
                    }
                    productInfo
                    ProductImage {
                        url
                    }
                    productDescription
				}
			}
		`,
	})
	return getDataPageContentResponse.data.page
}
