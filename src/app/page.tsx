const Page = () => {
	return (
		<>
			{/*  HOMEPAGE MAIN CONTENT  */}
			<main id="home" className="home-content" aria-labelledby="home-title">
				{/*  HERO  */}
				<header className="hero hero--home" role="banner">
					<div className="hero__inner">
						<h1 id="home-title">NexLab Weather at College of DuPage</h1>
						<p className="lead">
							Free, research-grade weather data and hands-on meteorology education — built by educators, powered by community support,
							and trusted by students, forecasters, and weather enthusiasts worldwide.
						</p>
						<div className="button-row">
							<a className="btn btn--primary" href="/weather-data">
								Explore Weather Data
							</a>
							<a className="btn btn--secondary" href="/academics">
								Explore Academics
							</a>
						</div>
					</div>
				</header>

				{/*  WEATHER DATA FEATURE GRID  */}
				<section id="weather-data" className="section section--light" aria-labelledby="weather-data-title">
					<div className="section__header">
						<h2 id="weather-data-title">Weather Data</h2>
						<p className="subhead">Your hub for analysis tools, satellite &amp; radar, dual-pol, forecast models, and text products.</p>
					</div>

					<ul className="card-grid card-grid--data" role="list">
						<li className="card">
							<div className="card__body">
								<h3 className="card__title">
									<a href="/weather-data/analysis">Analysis</a>
								</h3>
								<p className="card__text">
									Surface &amp; upper-air maps, soundings, RAP mesoanalysis, and isentropic tools for diagnosing current setups.
								</p>
								<a className="card__cta" href="/weather-data/analysis" aria-label="Open Analysis tools">
									Open tools →
								</a>
							</div>
						</li>

						<li className="card">
							<div className="card__body">
								<h3 className="card__title">
									<a href="/weather-data/satellite-mosaic-radar">Satellite &amp; Radar</a>
								</h3>
								<p className="card__text">
									Regional composites and mosaics built for quick situational awareness during active weather.
								</p>
								<a className="card__cta" href="/weather-data/satellite-mosaic-radar" aria-label="Open Satellite and Radar">
									Open tools →
								</a>
							</div>
						</li>

						<li className="card">
							<div className="card__body">
								<h3 className="card__title">
									<a href="/weather-data/nexrad-dual-pol-radar">NEXRAD Dual-Pol</a>
								</h3>
								<p className="card__text">
									Site-level dual-polarization radar products (e.g., ZDR, CC, KDP) for storm interrogation and hazard ID.
								</p>
								<a className="card__cta" href="/weather-data/nexrad-dual-pol-radar" aria-label="Open NEXRAD Dual-Pol">
									Open tools →
								</a>
							</div>
						</li>

						<li className="card">
							<div className="card__body">
								<h3 className="card__title">
									<a href="/weather-data/forecast-models">Numerical Models</a>
								</h3>
								<p className="card__text">
									Model guidance and loops tailored for mesoscale setups, quick comparisons, and forecast confidence.
								</p>
								<a className="card__cta" href="/weather-data/forecast-models" aria-label="Open Numerical Models">
									Open tools →
								</a>
							</div>
						</li>

						<li className="card">
							<div className="card__body">
								<h3 className="card__title">
									<a href="/weather-data/text-hazards-outlooks">Text Products</a>
								</h3>
								<p className="card__text">
									NWS/WPC/SPC text products, hazards, outlooks, and specialized bulletins — all in one place.
								</p>
								<a className="card__cta" href="/weather-data/text-hazards-outlooks" aria-label="Open Text Products">
									Open tools →
								</a>
							</div>
						</li>
					</ul>

					<div className="section__footer">
						<a className="btn btn--ghost" href="/weather-data">
							Browse all Weather Data
						</a>
					</div>
				</section>

				{/*  ACADEMICS FEATURE  */}
				<section id="academics" className="section" aria-labelledby="academics-title">
					<div className="section__header">
						<h2 id="academics-title">Academics at COD Meteorology</h2>
						<p className="subhead">
							Concept-first courses, forecasting labs each week, and a proven transfer runway to four-year programs.
						</p>
					</div>

					<div className="feature feature--split">
						<div className="feature__body">
							<p>
								Begin real meteorology from day one. Our two-year sequence covers severe weather, aviation meteorology, climate, and
								forecasting practice — using the same professional tools you’ll rely on in the field.
							</p>
							<ul className="checklist">
								<li>Hands-on labs with live data</li>
								<li>Qualitative foundations that ramp into quantitative skills</li>
								<li>Clear pathways to transfer and career readiness</li>
							</ul>
							<div className="button-row">
								<a className="btn btn--primary" href="/academics">
									Explore Academics
								</a>
								<a className="btn btn--secondary" href="/academics/courses">
									View Classes &amp; Notes
								</a>
							</div>
						</div>
					</div>
				</section>

				{/*  STORM CHASING CALLOUT  */}
				<section id="storm-chasing" className="section section--accent" aria-labelledby="chasing-title">
					<div className="section__header">
						<h2 id="chasing-title">Field Studies: Storm Chasing</h2>
						<p className="subhead">Since 1989 — immersive science in motion across the Great Plains.</p>
					</div>

					<div className="card card--highlight">
						<p>
							Experience severe weather up close while learning to analyze radar, satellite, soundings, and mesoscale environments in
							real time. Our academic storm-chasing program pairs classroom prep with multi-day fieldwork led by COD faculty.
						</p>
						<div className="button-row">
							<a className="btn btn--primary" href="/storm-chasing">
								Storm Chasing Overview
							</a>
							<a className="btn btn--ghost" href="/storm-chasing/trips-and-registration">
								Trips &amp; Registration
							</a>
						</div>
					</div>
				</section>

				{/*  DONATE / SUPPORT  */}
				<section id="donate" className="section section--cta" aria-labelledby="donate-title">
					<div className="section__header">
						<h2 id="donate-title">Keep Weather Data Free</h2>
						<p className="subhead">Your support powers open tools, reliable hosting, and ongoing innovation for millions of users.</p>
					</div>

					<div className="donate-panel">
						<p>
							NexLab Weather is community-supported. Donations sustain our infrastructure, compensate our small development team, and
							accelerate new features — while keeping data and tools freely available.
						</p>
						<div className="button-row">
							<a className="btn btn--primary" href="/donate">
								Donate Now
							</a>
							<a className="btn btn--secondary" href="/donate#sponsorships">
								Become a Sponsor
							</a>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default Page
