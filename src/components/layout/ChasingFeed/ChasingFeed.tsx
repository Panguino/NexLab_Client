'use client'

import styles from './ChasingFeed.module.scss'

const PLACEHOLDER_POSTS = [
	{
		id: 1,
		date: 'June 30, 2025',
		title: 'Storm Intercept: Northern Illinois Supercell',
		excerpt: 'The team intercepted a discrete supercell near Rockford producing softball-sized hail and a brief EF1 tornado.',
	},
	{
		id: 2,
		date: 'June 28, 2025',
		title: 'SPC Day 2 Outlook and Target Area',
		excerpt: 'Breaking down our target selection for tomorrow\'s potential significant severe weather event across the central Plains.',
	},
	{
		id: 3,
		date: 'June 25, 2025',
		title: 'Dryline Chase — Kansas Panhandle',
		excerpt: 'A classic dryline setup produced several photogenic supercells. The team logged four tornadoes over five hours.',
	},
	{
		id: 4,
		date: 'June 20, 2025',
		title: 'Equipment Update: New Dashcam Array',
		excerpt: 'We\'ve upgraded our vehicle camera system with four 4K units offering full 360° coverage for improved documentation.',
	},
	{
		id: 5,
		date: 'June 15, 2025',
		title: 'Season Recap: First Three Weeks',
		excerpt: 'An unusually active early season has the team already logging 12 chase days and 7 tornado observations.',
	},
]

const ChasingFeed = () => {
	return (
		<div className={styles.ChasingFeed}>
			<div className={styles.header}>
				<span className={styles.headerTitle}>Chase Feed</span>
				<span className={styles.headerSub}>via Substack</span>
			</div>
			<div className={styles.posts}>
				{PLACEHOLDER_POSTS.map((post) => (
					<div key={post.id} className={styles.post}>
						<div className={styles.postDate}>{post.date}</div>
						<div className={styles.postTitle}>{post.title}</div>
						<div className={styles.postExcerpt}>{post.excerpt}</div>
						<span className={styles.postReadMore}>Read more →</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default ChasingFeed
