export const CONVECTIVE_WATCH_DISCUSSION = 'discussion'
export const CONVECTIVE_WATCH_AVIATION_DISCUSSION = 'aviation-discussion'
export const CONVECTIVE_WATCH_OUTLINES = 'outlines'
export const CONVECTIVE_WATCH_PROBABILITIES = 'probabilities'
export const CONVECTIVE_WATCH_STATUS_REPORTS = 'status-reports'
// I'm including in here both the key found in the json data feeds
// as well as the WMO PIL for reference
// it's unclear at this time which will be more useful
export const CONVECTIVE_WATCH_PRODUCTS = {
	[CONVECTIVE_WATCH_DISCUSSION]: {
		title: 'Discussion',
		WMOPIL: 'WWUS20_SEL',
		feedKey: 'Watch_Notification_Messages',
	},
	[CONVECTIVE_WATCH_AVIATION_DISCUSSION]: {
		title: 'Discussion (Aviation)',
		WMOPIL: 'WWUS30_SAW',
		feedKey: 'Watch_Aviation_Notification_Messages',
	},
	[CONVECTIVE_WATCH_OUTLINES]: {
		title: 'Outlines',
		WMOPIL: 'WOUS64_WOU',
		feedKey: 'Watch_Outlines',
	},
	[CONVECTIVE_WATCH_PROBABILITIES]: {
		title: 'Probabilities',
		WMOPIL: 'WWUS40_WWP',
		feedKey: 'Watch_Probabilities',
	},
	[CONVECTIVE_WATCH_STATUS_REPORTS]: {
		title: 'Status Reports',
		WMOPIL: 'WOUS20_WWA',
		feedKey: 'Watch_Status_Reports',
	},
}
