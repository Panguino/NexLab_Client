import styles from './StormChasingInfo.module.scss'

interface IStormChasingInfoProps {
	name?: string
}

export const StormChasingInfo = ({ name }: IStormChasingInfoProps) => {
	return (
		<section className={styles.stormChasingInfo}>
			<div className={styles.container}>
				{name && <h2 className={styles.title}>{name}</h2>}
				<p className={styles.body}>More storm chasing information will appear here.</p>
			</div>
		</section>
	)
}
