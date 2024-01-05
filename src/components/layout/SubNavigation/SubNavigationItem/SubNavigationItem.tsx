import Link from 'next/link'
import * as S from './SubNavigationItem.styles'

const SubNavigationItem = ({ name, link }) => {
	return (
		<Link href={link}>
			<S.NavItem>{name}</S.NavItem>
		</Link>
	)
}

export default SubNavigationItem
