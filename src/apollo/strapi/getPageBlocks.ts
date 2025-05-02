'use server'
import { getClient } from '@/apollo/apollo-client'
import { convertStrapiBlocksData } from '@/util/blocks'
import { gql } from '@apollo/client'

export const getPageBlocks = async (id) => {
	const getPageBlocksResponse = await getClient().query({
		query: gql`
			query {
				page(documentId: "${id}") {
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
                                url
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
                                url
                            }
                        }
                        ... on ComponentBlocksTwoPanelIconInfo {
                            iconInfoPanel {
                                Icon {
                                    url
                                }
                                heading
                                body
                                buttonLabel
                                buttonUrl
                                ButtonTarget
                                backgroundImage {
                                    url
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
                            Trips {
                                startDate
                                endDate
                                Status
                                Instructor
                                Assistant
                            }
                        }
                        ... on ComponentBlocksRichText {
                            body
                        }
                        ... on ComponentBlocksDegree {
                            degrees {
                                Title
                                Description
                                Buttons {
                                    Label
                                    Link
                                    Style
                                    target
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
                        ... on ComponentBlocksVideo {
                            id
                            Name
                        }
                        ... on ComponentBlocksStaff {
                            id
                            Name
                        }
                        ... on ComponentBlocksGallery {
                            id
                            Name
                        }
					}
				}
			}
		`,
	})
	return convertStrapiBlocksData(getPageBlocksResponse.data.page.Blocks)
}
