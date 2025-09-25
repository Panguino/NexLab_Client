import { getCourseCategories } from '@/apollo/strapi/getCourseCategories'
import { getFooterContent } from '@/apollo/strapi/getFooterContent'
import { academicsSubnav } from './academics/subnav.config'
import { stormChasingSubnav } from './storm-chasing/subnav.config'
import { topNav } from './topNav.config'
import { weatherDataSubnav } from './weather-data/subnav.config'

export type MobileMenuItem = {
	id: string
	parentId: string | null
	title: string
	url: string // '' for non-clickable parent rows
	target: string // '_self' | '_blank' etc.
	variant?: 'default' | 'footer'
}

export async function buildMobileMenuItems(): Promise<MobileMenuItem[]> {
	const items: MobileMenuItem[] = []

	// Top-level items
	for (const t of topNav) {
		items.push({ id: t.id, parentId: null, title: t.title, url: t.href, target: '_self' })
	}

	// Weather Data children under weather-data
	for (const s of weatherDataSubnav) {
		items.push({ id: `wd-${s.title}`, parentId: 'weather-data', title: s.title, url: s.href.replace('/weather-data', ''), target: '_self' })

		// Weather Data > Analysis children (from Analysis sidebar)
		if (s.title === 'Analysis') {
			const analysisParentId = 'wd-Analysis'
			const analysisChildren = [
				{ id: 'surface-maps', title: 'Surface Maps', url: 'surface-maps' },
				{ id: 'upper-air', title: 'Upper Air maps', url: 'upper-air' },
				{ id: 'soundings', title: 'Soundings', url: 'soundings' },
				{ id: 'RAP-mesoanalysis', title: 'RAP Mesoanalysis', url: 'RAP-mesoanalysis' },
				{ id: 'isentropic-maps', title: 'Isentropic Analysis', url: 'isentropic-maps' },
			]
			analysisChildren.forEach((child) => {
				items.push({
					id: `${analysisParentId}-${child.id}`,
					parentId: analysisParentId,
					title: child.title,
					url: `/${child.url}`,
					target: '_self',
				})
			})
		}
	}

	// Academics children
	for (const s of academicsSubnav) {
		items.push({ id: `ac-${s.title}`, parentId: 'academics', title: s.title, url: s.href.replace('/academics', ''), target: '_self' })
	}

	// Storm Chasing children
	for (const s of stormChasingSubnav) {
		items.push({ id: `sc-${s.title}`, parentId: 'storm-chasing', title: s.title, url: s.href.replace('/storm-chasing', ''), target: '_self' })
	}

	// Footer-derived items (include all links; mark variant=footer)
	try {
		const footer = await getFooterContent()
		if (footer?.Group?.length) {
			footer.Group.forEach((group, idx) => {
				const heading: string = group?.Heading || `Section ${idx + 1}`
				const links = (group?.Links || []).filter((l) => l?.url && typeof l.url === 'string')
				if (links.length === 0) return // skip groups like "Location" that have no URLs
				const groupId = `footer-${idx}`
				items.push({ id: groupId, parentId: null, title: heading, url: '', target: '_self', variant: 'footer' })
				links.forEach((l, j) => {
					const childId = `${groupId}-${j}`
					const target = (l as any)?.target || '_self'
					items.push({ id: childId, parentId: groupId, title: l.text || 'Link', url: l.url, target, variant: 'footer' })
				})
			})
		}
		// Academics > Classes & Notes dynamic course list — flatten under Classes & Notes
		try {
			const courseCategories = await getCourseCategories()
			const classesNodeId = 'ac-Classes & Notes'
			courseCategories.forEach((category) => {
				;(category?.courses || []).forEach((course) => {
					items.push({
						id: `course-${course.documentId}`,
						parentId: classesNodeId,
						title: `EARTH ${course.CourseID} | ${course.Title}`,
						url: `/${course.documentId}`,
						target: '_self',
						variant: 'footer',
					})
				})
			})
		} catch (e) {
			// ignore; mobile menu still renders
		}
	} catch (e) {
		// If footer fetch fails, do nothing; mobile menu still works without footer
	}

	return items
}
