import styles from './CourseCard.module.scss'

export interface CourseCardProps {
  code?: string
  title?: string
  desc?: string
  className?: string
}

export const CourseCard = ({ code, title, desc, className }: CourseCardProps) => {
  return (
    <div className={`${styles.courseCard} ${className || ''}`.trim()}>
      {code && <div className={styles.code}>{code}</div>}
      {title && <div className={styles.title}>{title}</div>}
      {desc && <p className={styles.desc}>{desc}</p>}
    </div>
  )
}

