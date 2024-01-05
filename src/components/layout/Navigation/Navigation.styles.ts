import styled, { css } from 'styled-components'

export const Navigation = styled.div`
	width: 100%;
	padding: 20px;
	display: flex;
	justify-content: space-between;
`

export const Logo = styled.div`
	width: 300px;
	display: flex;
	gap: 13px;
	align-items: center;
	img {
		height: 30px;
		&:last-of-type {
			height: 20px;
		}
	}
`
export const NavItems = styled.div`
	display: flex;
	gap: 20px;
	align-items: center;
	&:last-of-type {
		width: 300px;
		justify-content: flex-end;
	}
	a {
		text-decoration: none;
		transition: color 0.2s ease;
		&:hover {
			color: #2677f0;
			text-decoration: none;
		}
	}
`
export const NavItem = styled.div`
	font-size: 18px;
	font-weight: 500;
`
