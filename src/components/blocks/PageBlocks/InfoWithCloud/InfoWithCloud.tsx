import { Button, ButtonType } from '@/components/elements/Button/Button'
import { RichText } from '@/components/elements/RichText/RichText'
import { RootNode } from '@strapi/blocks-react-renderer/dist/BlocksRenderer'
import styles from './InfoWithCloud.module.scss'

interface IInfoWithCloud {
	smallHeading: string
	heading: string
	body: RootNode[]
	buttons: ButtonType[]
	image: string
}

export const InfoWithCloud = ({ smallHeading, heading, body, buttons, image }: IInfoWithCloud) => {
	return (
		<div className={styles.infoWithCloud}>
			<div className={styles.image}>
				<svg width="771" height="438" viewBox="0 0 871 438" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M52.7484 327.135L-7.50752 201.928L-76.358 309.945L52.7484 327.135ZM-17.4485 193.439L-82.1852 295.003L-90.1528 181.491L-17.4485 193.439ZM-94.4015 305.855L-102.669 188.064L-191.55 273.824L-94.4015 305.855ZM-100.551 317.457L-195 286.316L-174.905 377.729L-100.551 317.457ZM-44.5566 432.565L-166.099 387.254L-89.8773 325.467L-44.5566 432.565ZM-30.513 432.532L-76.8931 322.932L50.9236 339.95L-30.513 432.532ZM-10.8484 429.776L66.3563 342.005L199.708 359.76L-10.8484 429.776ZM7.23074 437.405L221.68 366.094L219.948 437.405H7.23074ZM419.414 437.405H232.898L234.623 366.383L419.414 437.405ZM432.367 428.516L247.018 357.28L341.284 323.718L432.367 428.516ZM447.819 426.562L354.381 319.054L447.819 285.787V426.562ZM460.766 437.405V294.075L583.951 437.405H460.766ZM724.109 386.956L604.521 434.349V266.318L724.109 386.956ZM731.86 376.387L609.932 253.389L771.404 198.479L731.86 376.387ZM607.499 240.544L768.235 185.885L653.424 72.1926L607.499 240.544ZM596.298 232.412L641.406 67.0559L520.045 77.7933L596.298 232.412ZM579.497 227.612L507.815 82.2628L452.287 126.675L579.497 227.612ZM242.336 178.975L428.966 123.772L297.552 5.63699L242.336 178.975ZM152.144 0.595459H285.572L231.333 170.866L152.144 0.595459ZM139.675 4.48196L219.209 175.496L35.0817 91.6226L139.675 4.48196ZM202.643 182.173L27.0216 102.174L2.08124 182.173H202.643ZM3.58124 195.116H215.14L65.9373 324.688L3.58124 195.116ZM225.636 203.146L78.8579 330.612L222.078 349.681L225.636 203.146ZM332.164 313.225L235.074 347.793L238.529 205.491L332.164 313.225ZM345.262 308.562L254.782 204.458L435.913 276.287L345.262 308.562ZM446.982 266.752L252.267 189.536L436.104 135.158L446.982 266.752ZM460.156 268.975L449.582 141.053L582.82 246.773L460.156 268.975ZM591.575 426.414V258.342L466.57 280.968L591.575 426.414Z"
						fill="url(#cloudImageInlayPattern)"
					/>
					<defs>
						<pattern id="cloudImageInlayPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
							<use xlinkHref="#cloudImageInlay" transform="matrix(0.000392311 0 0 0.000867955 0 -0.237762)" />
						</pattern>
						<image id="cloudImageInlay" width="2549" height="1700" xlinkHref={image} />
					</defs>
				</svg>
			</div>
			<div className={styles.text}>
				<h3>{smallHeading}</h3>
				<h2>{heading}</h2>
				<RichText text={body} />
				<div className={styles.buttons}>
					{buttons.map((button, index) => {
						return <Button key={index} {...button} />
					})}
				</div>
			</div>
		</div>
	)
}
