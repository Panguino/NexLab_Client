import { auth } from '@/lib/auth'
import styles from './DashboardSettings.module.scss'
import { UserSettingsForm } from './UserSettingsForm/UserSettingsForm'

export const DashboardSettings = async () => {
	const session = await auth()
	if (!session || !session.user) return null
	console.log(session.user.jwt)
	const meEndpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`
	const response = await fetch(meEndpointUrl, { cache: 'no-cache', headers: { Authorization: `Bearer ${session.user.jwt}` } })
	const data = await response.json()
	const testInfoData = data.TestInfo

	return (
		<div className={styles.DashboardSettings}>
			<h2>Settings</h2>
			<UserSettingsForm initialValue={testInfoData} jwt={session.user.jwt} />
		</div>
	)
}
