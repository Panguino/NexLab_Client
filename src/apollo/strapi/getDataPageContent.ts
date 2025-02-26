'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getDataPageContent = async (id) => {
	const getDataPageContentResponse = await getClient().query({
		query: gql`
			query {
				page(id: "${id}") {
					data {
                        attributes {
                            SEO {
                                metaTitle
                                metaDescription
                                metaImage {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                                metaSocial {
                                    id
                                    socialNetwork
                                    title
                                    description
                                    image {
                                        data {
                                            attributes {
                                                url
                                            }
                                        }
                                    }
                                }
                                keywords
                                metaRobots
                            }
                            productInfo
                            ProductImage {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                            productDescription
                        }
					}
				}
			}
		`,
	})
	return getDataPageContentResponse.data.page.data.attributes
}
