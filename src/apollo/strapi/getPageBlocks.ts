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
                            Name
                        }
                        ... on ComponentBlocksStaff {
                            Name
                        }
                        ... on ComponentBlocksGallery {
                            Name
                        }
                        ... on ComponentBlocksFeaturePanels {
                            buttons {
                                Label
                                Link
                                Style
                                target
                            }
                            description
                            title
                            feature_panel {
                                description
                                href
                                id
                                image {
                                    url
                                }
                                link_text
                                title
                            }
                        }
                        ... on ComponentBlocksAnimatorBackgroundHero {
                            Text
                            buttons {
                                Label
                                Link
                                id
                                target
                                Style
                            }
                        }
                        ... on ComponentBlocksStormChasingInfo {
                            Name
                        }
                        ... on ComponentBlocksSimpleCta {
                            button {
                                Label
                                Link
                                Style
                                id
                                target
                            }
                            intro_text
                            background {
                                url
                                size
                            }
                            background_full
                        }
                        ... on ComponentBlocksClassesOverview {
                            title
                            description
                            classes_overview {
                                id
                                intro_text
                                class_info {
                                    blue_text
                                    class_description
                                    class_name
                                    id
                                }
                            }
                        }
                        ... on ComponentBlocksImage {
                            Image {
                                url
                                size
                            }
                        }
                        ... on ComponentBlocksFeatureData {
                            intro_text
                            data_info_panels {
                                background {
                                    url
                                    size
                                }
                                title
                                main_button {
                                    Style
                                    target
                                    Link
                                    Label
                                }
                                id
                                description
                                buttons_title
                                buttons {
                                    Label
                                    Link
                                    Style
                                    target
                                }
                            }
                        }
                        ... on ComponentBlocksFaqs {
                            intro_text
                            faq_tags {
                                Name
                                documentId
                            }
                            buttons {
                                Label
                                Link
                                Style
                                target
                            }
                        }
                        ... on ComponentBlocksTestimonials {
                            testimonials {
                                avatar {
                                        url
                                        size
                                }
                                author_title
                                author
                                Quote
                            }
                      }
                      ... on ComponentBlocksTwoColumnRichText {
                        left_buttons {
                            Label
                            Link
                            Style
                            target
                        }
                        left_text
                        right_text
                        right_buttons {
                            Label
                            Link
                            Style
                            target
                        }
                      }
                    }
				}
			}
		`,
	})
	return convertStrapiBlocksData(getPageBlocksResponse.data.page.Blocks)
}
