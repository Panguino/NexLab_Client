'use client'

import styles from './ChasingFeed.module.scss'

const PLACEHOLDER_POSTS = [
	{
		id: 1,
		title: 'Chasing the Dryline: A Day on the Southern Plains',
		excerpt:
			"We intercepted a supercell near Childress, TX with a wall cloud that persisted for nearly two hours. Here's a full breakdown of the chase.",
		date: 'June 12, 2025',
	},
	{
		id: 2,
		title: 'Chase Debrief: May 28 — Tornado Warned Supercell in Kansas',
		excerpt:
			'An elevated storm environment made for a tricky intercept, but we were rewarded with a brief tornado near Pratt. Full video and analysis inside.',
		date: 'May 30, 2025',
	},
	{
		id: 3,
		title: 'Equipment Update: New Dashcam + Atmospheric Sensor Array',
		excerpt:
			"We've upgraded our in-vehicle sensor suite for this season. Read about the new instruments we're running and what data they collect.",
		date: 'April 18, 2025',
	},
	{
		id: 4,
		title: "Season Preview: What We're Watching This Spring",
		excerpt:
			'La Niña patterns, an active subtropical jet, and a favorable ENSO transition — this season has the ingredients for a memorable chase year.',
		date: 'March 3, 2025',
	},
	{
		id: 5,
		title: 'Year in Review: 2024 Chase Season Recap',
		excerpt: "From the Nebraska panhandle to the Florida panhandle — we logged over 14,000 miles in pursuit of storms. Here's everything we saw.",
		date: 'January 8, 2025',
	},
]

const ChasingFeed = () => {
	return (
		<div className={styles.ChasingFeed}>
			<div className={styles.header}>
				<span className={styles.label}>Chase Feed</span>
				<span className={styles.source}>via Substack</span>
			</div>
			<div className={styles.posts}>
				{PLACEHOLDER_POSTS.map((post) => (
					<div key={post.id} className={styles.post}>
						<span className={styles.postDate}>{post.date}</span>
						<h4 className={styles.postTitle}>{post.title}</h4>
						<p className={styles.postExcerpt}>{post.excerpt}</p>
						<span className={styles.readMore}>Read more →</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default ChasingFeed
