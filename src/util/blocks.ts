const convertButton = (buttonData) => {
	return {
		label: buttonData.Label,
		link: buttonData.Link,
		style: buttonData.Style,
		target: buttonData.target,
	}
}
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
	return degreesData.data.map((degree) => {
		console.log('degree', degree)
		const { Title, Buttons, Description, Schools } = degree.attributes
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
		console.log(blockData)
		switch (blockData.__typename) {
			case 'ComponentBlocksPageHeading':
				return {
					type: 'PageHeading',
					heading: blockData.heading,
					body: blockData.body,
					buttons: blockData.Buttons.map((buttonData) => convertButton(buttonData)),
					image: blockData.Image?.data?.attributes?.url || null,
				}
			case 'ComponentBlocksInfoWithCloudImage':
				return {
					type: 'InfoWithCloudImage',
					smallHeading: blockData.smallHeading,
					heading: blockData.heading,
					body: blockData.body,
					buttons: blockData.Buttons.map((buttonData) => convertButton(buttonData)),
					image: blockData.Image?.data?.attributes?.url || null,
				}
			case 'ComponentBlocksTwoPanelIconInfo':
				return {
					type: 'TwoPanelIconInfo',
					panels: blockData.iconInfoPanel.map((panel) => {
						return {
							icon: panel.Icon?.data?.attributes?.url || null,
							heading: panel.heading,
							body: panel.body,
							buttonLabel: panel.buttonLabel,
							buttonUrl: panel.buttonUrl,
							buttonTarget: panel.ButtonTarget,
							backgroundImage: panel.backgroundImage?.data?.attributes?.url || null,
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
			default:
				return null
		}
	})
	return blocks
}
