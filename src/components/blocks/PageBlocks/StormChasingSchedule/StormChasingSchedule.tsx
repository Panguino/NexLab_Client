import { Button, ButtonType } from '@/components/elements/Button/Button'
import { RichText } from '@/components/elements/RichText/RichText'
import { RootNode } from '@strapi/blocks-react-renderer/dist/BlocksRenderer'
import styles from './StormChasingSchedule.module.scss'

type TripType = {
	startDate: string
	endDate: string
	status: string
	instructor: string
	assistant: string
}

interface IStormChasingSchedule {
	heading: string
	body: RootNode[]
	button: ButtonType
	trips: TripType[]
}

export const StormChasingSchedule = ({ heading, body, button, trips }: IStormChasingSchedule) => {
	function formatDates(startDateStr, endDateStr) {
		const startDate = new Date(startDateStr)
		const endDate = new Date(endDateStr)
		const year = startDate.getFullYear() // assumes they fall in the same year

		const formatter = new Intl.DateTimeFormat('en-US', {
			month: 'long',
			day: 'numeric',
		})

		const formattedStartDate = formatter.format(startDate)
		const formattedEndDate = formatter.format(endDate)

		return `${formattedStartDate} - ${formattedEndDate}, ${year}`
	}
	return (
		<div className={styles.stormChasingSchedule}>
			<div className={styles.wrapper}>
				<div className={styles.text}>
					<h1>{heading}</h1>
					<RichText text={body} />
					<div className={styles.buttons}>
						<Button {...button} />
					</div>
				</div>
				<div className={styles.tripTable}>
					<div className={styles.tripHeader}>
						<div>Trip Dates</div>
						<div>Status</div>
						<div>Instructor</div>
						<div>Assistant</div>
					</div>
					{trips.map(({ startDate, endDate, status, instructor, assistant }, index) => {
						return (
							<div key={index} className={styles.trip}>
								<div className={styles.dates}>{formatDates(startDate, endDate)}</div>
								<div className={styles.status}>{status}</div>
								<div className={styles.instructor}>{instructor}</div>
								<div className={styles.assistant}>{assistant}</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
