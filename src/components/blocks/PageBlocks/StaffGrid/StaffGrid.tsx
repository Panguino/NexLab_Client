import { getStaff } from '@/apollo/strapi/getStaff'
import styles from './StaffGrid.module.scss'

export const StaffGrid = async () => {
	const staff = await getStaff()
	console.log(staff)
	return (
		<div className={styles.StaffGrid}>
			<div className={styles.StaffWrapper}>
				{staff &&
					staff.map(({ Name, Photo, Position, ShortBio }, index) => (
						<div key={index} className={styles.StaffMember}>
							<div className={styles.photo}>
								<img
									src={Photo?.url || 'https://res.cloudinary.com/hyfzxgu1v/image/upload/v1746539435/default_image_c416511e7f.png'}
								/>
							</div>
							<h2>{Name}</h2>
							<h3>{Position}</h3>
							<p>{ShortBio}</p>
						</div>
					))}
			</div>
		</div>
	)
}
