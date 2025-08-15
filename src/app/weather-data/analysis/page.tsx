const Page = () => {
	return (
		<main id="analysis" className="analysis-content" aria-labelledby="analysis-title">
			{/* HERO / INTRO */}
			<header className="hero hero--subpage" role="banner">
				<div className="hero__inner">
					<h1 id="analysis-title">Weather Analysis</h1>
					<p className="lead">
						Diagnose the current state of the atmosphere with surface and upper-air maps, observed soundings, RAP mesoanalysis fields, and
						isentropic tools. Use these products together to understand synoptic and mesoscale patterns, moisture/thermal structure, and
						vertical motion before you forecast.
					</p>
					<div className="button-row">
						<a className="btn btn--primary" href="/weather-data">
							Back to Weather Data
						</a>
						<a className="btn btn--secondary" href="/donate">
							Keep It Free
						</a>
					</div>
				</div>
			</header>

			{/* ANALYSIS CATEGORIES */}
			<section id="analysis-sections" className="section section--light" aria-labelledby="analysis-sections-title">
				<div className="section__header">
					<h2 id="analysis-sections-title">Explore Analysis Tools</h2>
					<p className="subhead">Five complementary views of the current atmosphere.</p>
				</div>

				<ul className="card-grid card-grid--sections" role="list">
					{/* Surface Maps */}
					<li className="card">
						<a className="card__link" href="/weather-data/analysis#surface-maps" aria-label="Open Surface Maps">
							<div className="card__media">
								{/* Replace with real preview image */}
								<img src="/images/previews/analysis-surface.jpg" alt="Surface analysis with isobars, temps, and fronts" />
							</div>
							<div className="card__body">
								<h3 className="card__title">Surface Maps</h3>
								<p className="card__text">
									Fronts, pressure, wind, temperature, and dewpoint to locate boundaries and synoptic features.
								</p>
								<span className="card__cta">Open →</span>
							</div>
						</a>
					</li>

					{/* Upper Air Maps */}
					<li className="card">
						<a className="card__link" href="/weather-data/analysis#upper-air" aria-label="Open Upper Air Maps">
							<div className="card__media">
								<img src="/images/previews/analysis-upperair.jpg" alt="500 mb height/vorticity upper-air chart" />
							</div>
							<div className="card__body">
								<h3 className="card__title">Upper Air Maps</h3>
								<p className="card__text">
									850–300 mb height, wind, temperature, and vorticity for pattern recognition and jet dynamics.
								</p>
								<span className="card__cta">Open →</span>
							</div>
						</a>
					</li>

					{/* Soundings */}
					<li className="card">
						<a className="card__link" href="/weather-data/analysis#soundings" aria-label="Open Soundings">
							<div className="card__media">
								<img src="/images/previews/analysis-sounding.jpg" alt="Observed sounding skew-T log-P diagram" />
							</div>
							<div className="card__body">
								<h3 className="card__title">Soundings</h3>
								<p className="card__text">Observed RAOB profiles and derived indices to assess instability, shear, and moisture.</p>
								<span className="card__cta">Open →</span>
							</div>
						</a>
					</li>

					{/* RAP Mesoanalysis */}
					<li className="card">
						<a className="card__link" href="/weather-data/analysis#rap-meso" aria-label="Open RAP Mesoanalysis">
							<div className="card__media">
								<img src="/images/previews/analysis-rapmeso.jpg" alt="RAP mesoanalysis fields like CAPE and shear" />
							</div>
							<div className="card__body">
								<h3 className="card__title">RAP Mesoanalysis</h3>
								<p className="card__text">
									Real-time CAPE, shear, lapse rates, convergence, and composite parameters for mesoscale setups.
								</p>
								<span className="card__cta">Open →</span>
							</div>
						</a>
					</li>

					{/* Isentropic Analysis */}
					<li className="card">
						<a className="card__link" href="/weather-data/analysis#isentropic" aria-label="Open Isentropic Analysis">
							<div className="card__media">
								<img
									src="/images/previews/analysis-isentropic.jpg"
									alt="Isentropic theta surfaces with streamlines and mixing ratio"
								/>
							</div>
							<div className="card__body">
								<h3 className="card__title">Isentropic Analysis</h3>
								<p className="card__text">
									Diagnose ascent/descent and moisture transport on theta surfaces for precipitation forecasting.
								</p>
								<span className="card__cta">Open →</span>
							</div>
						</a>
					</li>
				</ul>
			</section>

			{/* DONATE */}
			<section id="analysis-donate" className="section section--cta" aria-labelledby="analysis-donate-title">
				<div className="section__header">
					<h2 id="analysis-donate-title">Support Open Weather Tools</h2>
					<p className="subhead">Your donation keeps analysis maps and education resources free for everyone.</p>
				</div>

				<div className="donate-panel">
					<p>
						NexLab Weather is community-supported. Contributions fund hosting, development, and new features — helping students,
						forecasters, and weather fans access reliable tools at no cost.
					</p>
					<div className="button-row">
						<a className="btn btn--primary" href="/donate">
							Donate Now
						</a>
						<a className="btn btn--secondary" href="/donate#sponsorships">
							See Sponsorships
						</a>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Page
