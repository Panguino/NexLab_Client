import styles from './Testimonials.module.scss'

type Testimonial = {
  avatar?: string | null
  authorTitle?: string
  author?: string
  quote?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  if (!testimonials || testimonials.length === 0) return null
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <ul className={styles.grid}>
          {testimonials.map((t, i) => (
            <li key={i} className={styles.card}>
              {t.avatar && <img className={styles.avatar} src={t.avatar} alt={t.author || ''} />}
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <div className={styles.author}>{t.author}</div>
              {t.authorTitle && <div className={styles.title}>{t.authorTitle}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Testimonials

