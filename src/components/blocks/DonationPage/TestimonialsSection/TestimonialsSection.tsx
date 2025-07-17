'use client'

import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './TestimonialsSection.module.scss'

export const TestimonialsSection = () => {
	const testimonials = [
		{
			quote: 'NexLab Weather has been an invaluable resource for my research. The free access to high-quality data and tools has made a significant impact on my work.',
			name: 'Dr. Jane Smith',
			title: 'Meteorologist',
			avatar: 'https://via.placeholder.com/48x48/4285f4/ffffff?text=JS',
		},
		{
			quote: 'As a storm chaser, having reliable and up-to-date weather data is crucial. NexLab Weather provides exactly what I need, when I need it.',
			name: 'Mike Johnson',
			title: 'Storm Chaser',
			avatar: 'https://via.placeholder.com/48x48/1877f2/ffffff?text=MJ',
		},
		{
			quote: 'The educational resources and tools available through NexLab Weather have transformed how I teach meteorology to my students.',
			name: 'Prof. Sarah Davis',
			title: 'University Professor',
			avatar: 'https://via.placeholder.com/48x48/6d889c/ffffff?text=SD',
		},
	]

	return (
		<section className={styles.testimonials}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>What Our Community Says</h2>
					<p>Hear from researchers, educators, and weather enthusiasts who rely on NexLab Weather every day.</p>
				</div>

				<div className={styles.testimonialsGrid}>
					{testimonials.map((testimonial, index) => (
						<div key={index} className={styles.testimonial}>
							<div className={styles.quoteIcon}>
								<FontAwesomeIcon icon={faQuoteLeft} />
							</div>
							<blockquote className={styles.quote}>"{testimonial.quote}"</blockquote>
							<div className={styles.author}>
								<div className={styles.avatar}>
									<img src={testimonial.avatar} alt={`Avatar of ${testimonial.name}`} />
								</div>
								<div className={styles.authorInfo}>
									<cite className={styles.name}>{testimonial.name}</cite>
									<cite className={styles.title}>{testimonial.title}</cite>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
