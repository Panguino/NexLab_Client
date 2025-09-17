import styles from './StaffGrid.module.scss'

export interface StaffMember {
	Name: string
	Photo?: { url?: string }
	Position?: string
	ShortBio?: string
}

export const StaffGridView = ({ staff }: { staff: StaffMember[] }) => {
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

// Server-wrapper that fetches data, used in app pages (not Storybook)
export const StaffGrid = async () => {
	const { getStaff } = await import('@/apollo/strapi/getStaff')
	const staff = await getStaff()
	return <StaffGridView staff={staff} />
}
