import { Button, ButtonType } from '@/components/elements/Button/Button'
import { RichText } from '@/components/elements/RichText/RichText'
import { RootNode } from '@strapi/blocks-react-renderer/dist/BlocksRenderer'
import styles from './PageHeading.module.scss'

interface IPageHeading {
	heading: string
	body: RootNode[]
	buttons: ButtonType[]
	image: string | null
}
export const PageHeading = ({ heading, body, buttons, image }: IPageHeading) => {
	return (
		<div className={styles.pageHeading}>
			<div className={styles.wrapper}>
				<div className={styles.cloud}>
					<svg xmlns="http://www.w3.org/2000/svg" width="955" height="580" viewBox="0 0 1200 580" fill="none">
						<path
							opacity="0.5"
							d="M525.237 235.121L416.932 2M525.237 235.121L599.418 2M525.237 235.121L274.504 120.788M525.237 235.121H238.897M525.237 235.121L775.97 160.878M525.237 235.121L790.806 340.545M525.237 235.121L790.806 541M525.237 235.121L520.342 436.942M525.237 235.121L323.294 410.678M416.932 2L274.504 120.788M416.932 2H599.418M274.504 120.788L238.897 235.121M238.897 235.121L130.592 217.303M238.897 235.121L142.461 386.576M238.897 235.121L323.294 410.678M130.592 217.303L3 340.545M130.592 217.303L142.461 386.576M3 340.545L32.6725 475.667M3 340.545L142.461 386.576M32.6725 475.667L207.741 541M32.6725 475.667L142.461 386.576M207.741 541H517.818M207.741 541L142.461 386.576M207.741 541L520.342 436.942M207.741 541L214.527 534.462L323.294 410.678M517.818 541H790.806M517.818 541L520.342 436.942M790.806 541H962.907M790.806 541V340.545M790.806 541L520.342 436.942M962.907 541L1127.59 475.667M962.907 541V291.277M962.907 541L790.806 340.545M1127.59 475.667L1181 235.121M1127.59 475.667L962.907 291.277M1181 235.121L1025.22 80.6968M1181 235.121L962.907 291.277M1025.22 80.6968L857.569 95.5453M1025.22 80.6968L962.907 291.277M857.569 95.5453L775.97 160.878M857.569 95.5453L962.907 291.277M775.97 160.878L599.418 2M775.97 160.878L790.806 340.545M775.97 160.878L962.907 291.277M790.806 340.545L962.907 291.277M790.806 340.545L520.342 436.942M142.461 386.576L520.342 436.942M142.461 386.576L323.294 410.678"
							stroke="url(#cloudGradient)"
							strokeWidth="4"
							strokeLinecap="round"
						/>
						<defs>
							<linearGradient id="cloudGradient" x1="889.5" y1="165.5" x2="-169" y2="324.5" gradientUnits="userSpaceOnUse">
								<stop stopColor="white" />
								<stop offset="1" stopColor="white" stopOpacity="0" />
							</linearGradient>
						</defs>
					</svg>
				</div>
				<div className={styles.text}>
					<h1>{heading}</h1>
					<RichText text={body} />
					<div className={styles.buttons}>
						{buttons.map((button, index) => {
							return <Button key={index} {...button} />
						})}
					</div>
				</div>
				<div className={styles.image}>{image && <img src={image} />}</div>
			</div>
		</div>
	)
}
