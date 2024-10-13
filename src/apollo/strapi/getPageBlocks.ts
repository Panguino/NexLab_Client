'use server'
import { getClient } from '@/apollo/apollo-client'
import { convertStrapiBlocksData } from '@/util/blocks'
import { gql } from '@apollo/client'

export const getPageBlocks = async (id) => {
	const getPageBlocksResponse = await getClient().query({
		query: gql`
			query {
				page(id: "${id}") {
					data {
                        attributes {
                            Blocks {
                                ... on ComponentBlocksPageHeading {
                                    heading
                                    body
                                    Buttons {
                                        Label
                                        Link
                                        Style
                                        target
                                    }
                                    Image {
                                        data {
                                            attributes {
                                                url
                                            }
                                        }
                                    }
                                }
                                ... on ComponentBlocksInfoWithCloudImage {
                                    smallHeading
                                    heading
                                    body
                                    Buttons {
                                        Label
                                        Link
                                        Style
                                        target
                                    }
                                    Image {
                                        data {
                                            attributes {
                                                url
                                            }
                                        }
                                    }
                                }
                                ... on ComponentBlocksTwoPanelIconInfo {
                                    iconInfoPanel {
                                        Icon {
                                            data {
                                                attributes {
                                                    url
                                                }
                                            }
                                        }
                                        heading
                                        body
                                        buttonLabel
                                        buttonUrl
                                        ButtonTarget
                                        backgroundImage {
                                            data {
                                                attributes {
                                                    url
                                                }
                                            }
                                        }
                                    }
                                }
                                ... on ComponentBlocksStormChasingSchedule {
                                    heading
                                    body
                                    Button {
                                        Label
                                        Link
                                        Style
                                        target
                                    }
                                }
                            }
                        }
					}
				}
			}
		`,
	})
	return convertStrapiBlocksData(getPageBlocksResponse.data.page.data.attributes.Blocks)
}
