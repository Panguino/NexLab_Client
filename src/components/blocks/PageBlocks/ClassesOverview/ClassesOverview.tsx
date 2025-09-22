import { CourseCard } from '@/components/elements/CourseCard/CourseCard'
import styles from './ClassesOverview.module.scss'

interface IClassesOverviewProps {
	title?: string
	description?: string
	classes?: Array<{
		id?: string | number
		introText?: string
		classInfo?: Array<{
			id?: string | number
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
				{classes.map((c) => (
					<div key={c.id ?? `${c.introText?.slice(0, 16)}`} className={styles.classGroup}>
						<div className={styles.introText} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: c.introText || '' }} />
						<div className={styles.grid}>
							{c.classInfo?.map((ci) => (
								<CourseCard
									key={ci.id ?? `${ci.className}-${ci.blueText}`}
									code={ci.blueText}
									title={ci.className}
									desc={ci.classDescription}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
