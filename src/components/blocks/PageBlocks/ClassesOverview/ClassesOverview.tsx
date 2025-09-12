import styles from './ClassesOverview.module.scss'

interface IClassesOverviewProps {
	title?: string
	description?: string
	classes?: Array<{
		introText?: string
		classInfo?: Array<{
			blueText?: string
			classDescription?: string
			className?: string
		}>
	}>
}

export const ClassesOverview = ({ title, description, classes = [] }: IClassesOverviewProps) => {
	return (
		<section className={styles.classesOverview}>
			<div className={styles.container}>
				{(title || description) && (
					<header className={styles.header}>
						{title && <h2>{title}</h2>}
						{description && <p>{description}</p>}
					</header>
				)}
				{classes.map((c, idx) => (
					<div key={idx} className={styles.classGroup}>
						{c.introText && <p className={styles.introText} dangerouslySetInnerHTML={{ __html: c.introText }} />}
						<div className={styles.grid}>
							{c.classInfo?.map((ci, i) => (
								<div key={i} className={styles.card}>
									{ci.className && <h3 className={styles.name}>{ci.className}</h3>}
									{ci.blueText && <div className={styles.blue}>{ci.blueText}</div>}
									{ci.classDescription && <p className={styles.desc}>{ci.classDescription}</p>}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
