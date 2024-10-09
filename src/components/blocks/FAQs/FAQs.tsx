import { RichText } from '@/components/elements/RichText/RichText'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import styles from './FAQs.module.scss'

type FAQ = {
	id: string
	question: string
	answer: string
}

interface IFAQs {
	title: string
	body: JSON
	faqs: FAQ[]
}

export const FAQs = ({ title, body, faqs }: IFAQs) => {
	return (
		<div className={styles.faqs}>
			<div>
				<h1>{title}</h1>
				<div className={styles.body}>
					<RichText text={body} />
				</div>
			</div>
			<div>
				{faqs.map((faq, index) => {
					return (
						<Accordian key={index} title={faq.question} initiallyClosed={true} variant="line">
							<div className={styles.answer}>
								<RichText text={faq.answer} />
							</div>
						</Accordian>
					)
				})}
			</div>
		</div>
	)
}
