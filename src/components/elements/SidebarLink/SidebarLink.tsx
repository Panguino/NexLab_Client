import Link from 'next/link'
import { MouseEventHandler, useCallback } from 'react'
import styles from './SidebarLink.module.scss'

interface ISidebarLinkProps {
	name: string
	linkUrl: string
	target?: string
	onClick?: (event: React.MouseEvent<HTMLAnchorElement>, contentElementId: string) => void
}

export const SidebarLink = ({ name, linkUrl, target = '_self', onClick }: ISidebarLinkProps) => {
	const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
		(event) => {
			if (onClick) {
				event.preventDefault()
				const contentElementId = target
				const contentElement = document.getElementById(contentElementId)
				if (contentElement) {
					fetch(linkUrl)
						.then((response) => response.text())
						.then((data) => {
							contentElement.innerHTML = data
						})
						.catch((error) => {
							console.error('Error loading content:', error)
							alert('Failed to open link.')
						})
				} else {
					console.error('Target element not found:', contentElementId)
					alert('Failed to open link.')
				}
				onClick(event, contentElementId)
			}
		},
		[linkUrl, target, onClick],
	)

	return (
		<div className={styles.SidebarLink}>
			<Link href={linkUrl} target={target} onClick={onClick ? handleClick : undefined}>
				{name}
			</Link>
		</div>
	)
}
