'use client'
import { getFooterContent } from '@/apollo/strapi/getFooterContent'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Footer.module.scss'

export const Footer = () => {
	const [footerData, setFooterData] = useState(null)

	useEffect(() => {
		const fetchFooterData = async () => {
			const data = await getFooterContent()
			setFooterData(data)
		}
		fetchFooterData()
	}, [])

	if (!footerData) {
		return <div className={styles.footer}>Loading...</div>
	}

	return (
		<div className={styles.footer}>
			<div className={styles.container}>
				{footerData?.Group.map(({ Heading, Links }, index: number) => {
					return (
						<div key={index} className={styles.section}>
							<h4>{Heading}</h4>
							{Links.map(({ text, url, target }, i: number) => {
								if (url && target) {
									return (
										<Link key={i} href={url} target={target ? target : null}>
											{text}
										</Link>
									)
								} else {
									return <p key={i}>{text}</p>
								}
							})}
						</div>
					)
				})}
			</div>
			<div className={styles.copyRight}>© {new Date().getFullYear()} College of DuPage NEXLAB</div>
		</div>
	)
}
