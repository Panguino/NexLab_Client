'use client'
import { useEffect, useState } from 'react'
import styles from './UserSettingsForm.module.scss'

export const UserSettingsForm = ({ initialValue, jwt }) => {
	const [testInfo, setTestInfo] = useState('')

	const saveUserData = async () => {
		const meEndpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`
		const response = await fetch(meEndpointUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify({ TestInfo: testInfo }),
		})
		console.log(response)
		// Todo Validate Success or move this code into hook/convert into page favoriting
	}

	useEffect(() => {
		setTestInfo(initialValue)
	}, [initialValue])

	return (
		<div className={styles.UserSettingsForm}>
			<label>TestInfo</label>
			<input
				type="text"
				placeholder="TestInfo"
				onChange={(e) => {
					setTestInfo(e.target.value)
				}}
				value={testInfo}
			/>
			<button onClick={saveUserData}>Save</button>
		</div>
	)
}
