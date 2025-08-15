const Page = () => {
	return (
		<>
			{/* WEATHER DATA LANDING – paste into a React file */}
			<main id="weather-data" className="wd-content" aria-labelledby="wd-title">
				{/* HERO */}
				<header className="hero hero--data" role="banner">
					<div className="hero__inner">
						<h1 id="wd-title">Weather Data</h1>
						<p className="lead">
							Professional-grade analysis, satellite &amp; radar, dual-pol NEXRAD, model guidance, and text products — free and fast for
							students, forecasters, and enthusiasts.
						</p>
					</div>
				</header>

				{/* FIVE MAIN SECTIONS */}
				<section id="wd-sections" className="section section--light" aria-labelledby="wd-sections-title">
					<div className="section__header">
						<h2 id="wd-sections-title">Explore by Category</h2>
						<p className="subhead">Start with one of our core hubs and drill into the products you need.</p>
					</div>

					<ul className="card-grid card-grid--sections" role="list">
						{/* Analysis */}
						<li className="card">
							<a className="card__link" href="/weather-data/analysis" aria-label="Open Analysis">
								<div className="card__media">
									{/* Replace src with a real preview */}
									<img src="/images/previews/analysis-overview.jpg" alt="Surface and upper-air analysis preview" />
								</div>
								<div className="card__body">
									<h3 className="card__title">Analysis</h3>
									<p className="card__text">Surface &amp; upper-air maps, soundings, and mesoanalysis for current setups.</p>
								</div>
							</a>
						</li>

						{/* Satellite & Radar */}
						<li className="card">
							<a className="card__link" href="/weather-data/satellite-mosaic-radar" aria-label="Open Satellite and Radar">
								<div className="card__media">
									<img src="/images/previews/sat-radar.jpg" alt="GOES satellite and radar mosaic preview" />
								</div>
								<div className="card__body">
									<h3 className="card__title">Satellite &amp; Radar</h3>
									<p className="card__text">Regional composites for quick situational awareness during active weather.</p>
								</div>
							</a>
						</li>

						{/* NEXRAD Dual-Pol */}
						<li className="card">
							<a className="card__link" href="/weather-data/nexrad-dual-pol-radar" aria-label="Open NEXRAD Dual-Pol Radar">
								<div className="card__media">
									<img src="/images/previews/dual-pol.jpg" alt="Dual-pol radar fields preview" />
								</div>
								<div className="card__body">
									<h3 className="card__title">NEXRAD Dual-Pol</h3>
									<p className="card__text">Z, ZDR, CC, KDP and more for storm interrogation and hazard identification.</p>
								</div>
							</a>
						</li>

						{/* Numerical Models */}
						<li className="card">
							<a className="card__link" href="/weather-data/forecast-models" aria-label="Open Numerical Models">
								<div className="card__media">
									<img src="/images/previews/models.jpg" alt="Numerical model guidance preview" />
								</div>
								<div className="card__body">
									<h3 className="card__title">Numerical Models</h3>
									<p className="card__text">Short- to medium-range guidance and loops tuned for mesoscale forecasting.</p>
								</div>
							</a>
						</li>

						{/* Text Products */}
						<li className="card">
							<a className="card__link" href="/weather-data/text-hazards-outlooks" aria-label="Open Text Products">
								<div className="card__media">
									<img src="/images/previews/text-products.jpg" alt="Hazards and outlooks preview" />
								</div>
								<div className="card__body">
									<h3 className="card__title">Text Products</h3>
									<p className="card__text">SPC, WPC, NHC, AFDs, and specialized bulletins — all in one place.</p>
								</div>
							</a>
						</li>
					</ul>
				</section>

				{/* FEATURED PRODUCTS */}
				<section id="wd-featured" className="section" aria-labelledby="wd-featured-title">
					<div className="section__header">
						<h2 id="wd-featured-title">Featured Products</h2>
						<p className="subhead">A few favorites across our five hubs. Click through for live data and loops.</p>
					</div>

					<ul className="card-grid card-grid--featured" role="list">
						{/* Examples below: swap hrefs/anchors to your real product routes and update preview images */}
						<li className="card card--product">
							<a className="card__link" href="/weather-data/analysis#surface-analysis">
								<div className="card__media">
									<img src="/images/previews/feat-sfc-analysis.jpg" alt="Surface analysis map with fronts" />
								</div>
								<div className="card__body">
									<span className="badge">Analysis</span>
									<h3 className="card__title">Surface Analysis (Fronts &amp; Isobars)</h3>
									<p className="card__text">Track synoptic patterns and boundaries at a glance.</p>
								</div>
							</a>
						</li>

						<li className="card card--product">
							<a className="card__link" href="/weather-data/satellite-mosaic-radar#geocolor">
								<div className="card__media">
									<img src="/images/previews/feat-geocolor.jpg" alt="GOES GeoColor mosaic" />
								</div>
								<div className="card__body">
									<span className="badge">Satellite &amp; Radar</span>
									<h3 className="card__title">GOES GeoColor Mosaics</h3>
									<p className="card__text">True-color daytime and enhanced nighttime views for context.</p>
								</div>
							</a>
						</li>

						<li className="card card--product">
							<a className="card__link" href="/weather-data/nexrad-dual-pol-radar#quicklook">
								<div className="card__media">
									<img src="/images/previews/feat-dualpol-quicklook.jpg" alt="Dual-pol quicklook products" />
								</div>
								<div className="card__body">
									<span className="badge">NEXRAD Dual-Pol</span>
									<h3 className="card__title">Dual-Pol Quicklook</h3>
									<p className="card__text">Rapid Z, ZDR, CC, and KDP interrogation for severe cells.</p>
								</div>
							</a>
						</li>

						<li className="card card--product">
							<a className="card__link" href="/weather-data/forecast-models#hrrr-reflectivity">
								<div className="card__media">
									<img src="/images/previews/feat-hrrr-ref.jpg" alt="HRRR composite reflectivity forecast" />
								</div>
								<div className="card__body">
									<span className="badge">Numerical Models</span>
									<h3 className="card__title">HRRR Composite Reflectivity</h3>
									<p className="card__text">High-resolution convective timing and structure guidance.</p>
								</div>
							</a>
						</li>

						<li className="card card--product">
							<a className="card__link" href="/weather-data/forecast-models#gfs-500mb">
								<div className="card__media">
									<img src="/images/previews/feat-gfs-500.jpg" alt="GFS 500 mb height and vorticity" />
								</div>
								<div className="card__body">
									<span className="badge">Numerical Models</span>
									<h3 className="card__title">GFS 500 mb Heights/Vort</h3>
									<p className="card__text">Large-scale pattern evolution and shortwave tracking.</p>
								</div>
							</a>
						</li>

						<li className="card card--product">
							<a className="card__link" href="/weather-data/text-hazards-outlooks#spc-outlooks">
								<div className="card__media">
									<img src="/images/previews/feat-spc-outlook.jpg" alt="SPC convective outlook map" />
								</div>
								<div className="card__body">
									<span className="badge">Text Products</span>
									<h3 className="card__title">SPC Convective Outlooks</h3>
									<p className="card__text">Day 1–8 severe probabilities and categorical risk areas.</p>
								</div>
							</a>
						</li>
					</ul>
				</section>

				{/* DONATE */}
				<section id="wd-donate" className="section section--cta" aria-labelledby="wd-donate-title">
					<div className="section__header">
						<h2 id="wd-donate-title">Help Keep Data Free</h2>
						<p className="subhead">Your donation powers hosting, development, and new features for the community.</p>
					</div>

					<div className="donate-panel">
						<p>
							NexLab Weather runs on community support. Contributions sustain our infrastructure and ensure students and weather lovers
							everywhere have free access to high-quality tools.
						</p>
						<div className="button-row">
							<a className="btn btn--primary" href="/donate">
								Donate Now
							</a>
							<a className="btn btn--secondary" href="/donate#sponsorships">
								Sponsorships
							</a>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default Page
