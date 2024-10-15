import { getFooterContent } from '@/apollo/strapi/getFooterContent'
import Link from 'next/link'
import styles from './Footer.module.scss'

export const Footer = async () => {
	const footerData = await getFooterContent()
	console.log(footerData)
	return (
		<div className={styles.footer}>
			<div className={styles.container}>
				{footerData?.Group.map(({ Heading, Links }, index: number) => {
					return (
						<div key={index} className={styles.section}>
							<h4>{Heading}</h4>
							{Links.map(({ text, url, target }, index: number) => {
								if (url && target) {
									return (
										<Link key={index} href={url} target={target ? target : null}>
											{text}
										</Link>
									)
								} else {
									return <p>{text}</p>
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
