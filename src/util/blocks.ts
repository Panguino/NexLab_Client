const convertButton = (buttonData) => {
	return {
		label: buttonData.Label,
		link: buttonData.Link,
		style: buttonData.Style,
		target: buttonData.target,
	}
}
const convertButtons = (buttons = []) => (buttons || []).map((b) => convertButton(b))
const convertTripData = (TripsData) => {
	return TripsData.map(({ startDate, endDate, Status, Instructor, Assistant }) => {
		return {
			startDate,
			endDate,
			status: Status,
			instructor: Instructor,
			assistant: Assistant,
		}
	})
}
const convertDegreeData = (degreesData) => {
	return degreesData.map((degree) => {
		console.log('degree', degree)
		const { Title, Buttons, Description, Schools } = degree
		return {
			title: Title,
			body: Description,
			buttons: Buttons.map((buttonData) => convertButton(buttonData)),
			schools: Schools.map(({ SchoolList, SchoolLinks }) => {
				return {
					schoolList: SchoolList,
					schoolLinks: SchoolLinks.map(({ School, Link }) => {
						return {
							school: School,
							link: Link,
						}
					}),
				}
			}),
		}
	})
}
export const convertStrapiBlocksData = (blocksData) => {
	const blocks = blocksData.map((blockData) => {
		switch (blockData.__typename) {
			case 'ComponentBlocksPageHeading':
				return {
					type: 'PageHeading',
					heading: blockData.heading,
					body: blockData.body,
					buttons: convertButtons(blockData.Buttons),
					image: blockData.Image?.url || null,
				}
			case 'ComponentBlocksInfoWithCloudImage':
				return {
					type: 'InfoWithCloudImage',
					smallHeading: blockData.smallHeading,
					heading: blockData.heading,
					body: blockData.body,
					buttons: convertButtons(blockData.Buttons),
					image: blockData.Image?.url || null,
				}
			case 'ComponentBlocksTwoPanelIconInfo':
				return {
					type: 'TwoPanelIconInfo',
					panels: blockData.iconInfoPanel.map((panel) => {
						return {
							icon: panel.Icon?.url || null,
							heading: panel.heading,
							body: panel.body,
							buttonLabel: panel.buttonLabel,
							buttonUrl: panel.buttonUrl,
							buttonTarget: panel.ButtonTarget,
							backgroundImage: panel.backgroundImage?.url || null,
						}
					}),
				}
			case 'ComponentBlocksStormChasingSchedule':
				return {
					type: 'StormChasingSchedule',
					heading: blockData.heading,
					body: blockData.body,
					button: convertButton(blockData.Button),
					trips: convertTripData(blockData.Trips),
				}
			case 'ComponentBlocksRichText':
				return {
					type: 'RichText',
					body: blockData.body,
				}
			case 'ComponentBlocksDegree':
				return {
					type: 'Degrees',
					degrees: convertDegreeData(blockData.degrees),
				}
			case 'ComponentBlocksStaff':
				return {
					type: 'Staff',
				}
			case 'ComponentBlocksGallery':
				return { type: 'Gallery', name: blockData.Name }
			case 'ComponentBlocksVideo':
				return { type: 'Video', name: blockData.Name }
			case 'ComponentBlocksFeaturePanels':
				return {
					type: 'FeaturePanels',
					title: blockData.title,
					description: blockData.description,
					buttons: convertButtons(blockData.buttons),
					featurePanels: blockData.feature_panel.map((panel) => {
						return {
							title: panel.title,
							description: panel.description,
							href: panel.href,
							image: panel.image?.url || null,
							linkText: panel.link_text,
						}
					}),
				}
			case 'ComponentBlocksAnimatorBackgroundHero':
				return {
					type: 'AnimatorBackgroundHero',
					text: blockData.Text,
					buttons: convertButtons(blockData.buttons),
				}
			case 'ComponentBlocksStormChasingInfo':
				return {
					type: 'StormChasingInfo',
					name: blockData.Name,
				}
			case 'ComponentBlocksSimpleCta':
				return {
					type: 'SimpleCta',
					button: convertButton(blockData.button),
					introText: blockData.intro_text,
				}
			case 'ComponentBlocksClassesOverview':
				return {
					type: 'ClassesOverview',
					title: blockData.title,
					description: blockData.description,
					classes: (blockData.classes_overview || []).map((classData) => {
						return {
							id: classData.id,
							introText: classData.intro_text,
							classInfo: (classData.class_info || []).map((classInfo) => {
								return {
									id: classInfo.id,
									blueText: classInfo.blue_text,
									classDescription: classInfo.class_description,
									className: classInfo.class_name,
								}
							}),
						}
					}),
				}
			case 'ComponentBlocksImage':
				return {
					type: 'Image',
					image: { url: blockData.Image?.url || null, size: blockData.Image?.size || null },
				}
			case 'ComponentBlocksFeatureData':
				return {
					type: 'FeatureData',
					introText: blockData.intro_text,
					panels: (blockData.data_info_panels || []).map((panel) => ({
						id: panel.id,
						title: panel.title,
						description: panel.description,
						background: { url: panel.background?.url || null, size: panel.background?.size || null },
						mainButton: panel.main_button ? convertButton(panel.main_button) : null,
						buttonsTitle: panel.buttons_title,
						buttons: convertButtons(panel.buttons),
					})),
				}
			case 'ComponentBlocksFaqs':
				return {
					type: 'Faqs',
					introText: blockData.intro_text,
					tags: (blockData.faq_tags || []).map((t) => ({ name: t.Name, documentId: t.documentId })),
					buttons: convertButtons(blockData.buttons),
				}
			case 'ComponentBlocksTestimonials':
				return {
					type: 'Testimonials',
					testimonials: (blockData.testimonials || []).map((t) => ({
						avatar: t.avatar?.url || null,
						authorTitle: t.author_title,
						author: t.author,
						quote: t.Quote,
					})),
				}
			case 'ComponentBlocksTwoColumnRichText':
				return {
					type: 'TwoColumnRichText',
					leftButtons: convertButtons(blockData.left_buttons),
					leftText: blockData.left_text,
					rightText: blockData.right_text,
					rightButtons: convertButtons(blockData.right_buttons),
				}
			default:
				return null
		}
	})
	return blocks
}
