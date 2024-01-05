import styled from 'styled-components'

export const SubNavigation = styled.div`
	width: 100%;
	padding: 10px;
	display: flex;
	justify-content: center;
	background-color: #333;
	color: #fff;
	a {
		color: white;
		text-decoration: none;
		transition: color 0.2s ease;
		&:hover {
			color: #0ec5ff;
			text-decoration: none;
		}
	}
`
export const NavItems = styled.div`
	display: flex;
	gap: 20px;
	align-items: center;
`
