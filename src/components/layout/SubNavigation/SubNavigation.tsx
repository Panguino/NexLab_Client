import Link from 'next/link'
import * as S from './SubNavigation.styles'

const SubNavigation = ({ children }) => {
	return (
		<S.SubNavigation>
			<S.NavItems>{children}</S.NavItems>
		</S.SubNavigation>
	)
}

export default SubNavigation
