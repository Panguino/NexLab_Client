const convertButton = (buttonData) => {
	return {
		label: buttonData.Label,
		link: buttonData.Link,
		style: buttonData.Style,
		target: buttonData.target,
	}
}
export const convertStrapiBlocksData = (blocksData) => {
	const blocks = blocksData.map((blockData) => {
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
				}
			default:
				return null
		}
	})
	return blocks
}
