const Page = async () => {
	return (
		<>
			{/*  CLASSES PAGE MAIN CONTENT  */}
			<main className="classes-content" id="content-top" aria-labelledby="page-title">
				{/* HERO / INTRO */}
				<header className="hero hero--subpage" role="banner">
					<h1 id="page-title">Classes &amp; Course Pathways</h1>
					<p className="lead">
						Welcome to COD Meteorology Course Content — our collegiate program is dedicated to providing a comprehensive foundation in the
						atmospheric sciences within your first two years of college. Whether you’re a currently registered or aspiring student,
						explore the course material to better understand what we offer and how each class builds your skills. Continue below for a
						program overview and a suggested year-by-year plan for students intending to major in Meteorology.
					</p>
				</header>

				{/*  PROGRAM OVERVIEW  */}
				<section id="program-overview" className="section section--light">
					<div className="section__header">
						<h2>How the Program Works</h2>
						<p className="subhead">A concept-first approach that ramps up the math when you’re ready.</p>
					</div>

					<ul className="feature-list">
						<li>
							<h3>Foundations first</h3>
							<p>
								We start with a qualitative understanding of the atmosphere, weather phenomena, climate, and forecasting. There are no
								high-level math prerequisites to begin; we introduce the math you need along the way so you can focus on concepts
								first.
							</p>
						</li>
						<li>
							<h3>Hands-on with real data</h3>
							<p>
								From day one you’ll analyze observations, radar/satellite, and model output, applying concepts directly to live
								weather.
							</p>
						</li>
						<li>
							<h3>Clear transfer runway</h3>
							<p>
								After two years (paired with your general education and calculus), you’ll be prepared to transfer and thrive in
								upper-division meteorology courses.
							</p>
						</li>
					</ul>
				</section>

				{/*  FIELD STUDIES / STORM CHASING  */}
				<section id="storm-chasing" className="section section--accent">
					<div className="section__header">
						<h2>Field Studies: Storm Chasing</h2>
						<p className="subhead">An immersive, education-first experience with 35+ years of history.</p>
					</div>

					<div className="card card--highlight">
						<p>
							Our storm chasing program offers an experience unlike any other. With over 35 years of experience, we aim to bring you
							directly to the phenomena we study. You’ll prepare in the classroom, participate in daily forecast discussions, and apply
							your learning in the field under faculty guidance.
						</p>

						<div className="grid grid--2">
							<div>
								<h3>Course Options</h3>
								<ul>
									<li>
										<strong>ESAS 1112 — Storm Chasing / Thunderstorm Lab (Intro):</strong> open to the general public for
										participants 18+; no prerequisite.
									</li>
									<li>
										<strong>ESAS 2112 — Thunderstorm Lab (Advanced):</strong> for returning students; see prerequisites and
										instructor permission details.
									</li>
								</ul>
							</div>
							<div>
								<h3>Who It’s For</h3>
								<p>
									<em>Students:</em> Gain invaluable insight that solidifies knowledge from coursework.
									<br />
									<em>Enthusiasts:</em> If you love weather, this is a powerful, memorable way to learn.
								</p>
							</div>
						</div>

						<p className="note">
							<strong>Note:</strong> Dates, fees, logistics, and eligibility are posted ahead of each season. Check the Storm Chasing
							info page for current details.
						</p>

						{/*  Optional CTA buttons; update hrefs as needed  */}
						<div className="button-row">
							<a className="btn btn--primary" href="/academics/storm-chasing">
								Storm Chasing Details
							</a>
							<a className="btn btn--ghost" href="/contact">
								Contact the Program
							</a>
						</div>
					</div>
				</section>

				{/*  YEAR-BY-YEAR OVERVIEW  */}
				<section id="yearly-plan" className="section">
					<div className="section__header">
						<h2>Year-by-Year Overview</h2>
						<p className="subhead">Start with strong qualitative intuition, then level up the quantitative side.</p>
					</div>

					{/*  FIRST YEAR  */}
					<article id="first-year" className="year-block">
						<h3>First Year: Build the Core</h3>
						<p>
							We immediately focus on foundational aspects of the atmosphere and weather while introducing the math you need, when you
							need it. You’ll practice with real data and begin testing your forecasting intuition.
						</p>
						<ul className="course-list">
							<li>
								<strong>1110 — Introduction to Meteorology:</strong> Key processes, systems, and terminology that underpin all later
								study.
							</li>
							<li>
								<strong>1111 — Climate:</strong> Earth’s climate system, variability, and change in a societal context.
							</li>
							<li>
								<strong>1115 — Severe &amp; Unusual Weather:</strong> Thunderstorms, tornadoes, hurricanes, radar basics, and hazard
								awareness.
							</li>
							<li>
								<strong>1116 &amp; 1117 — Weather Analysis &amp; Forecasting I &amp; II:</strong> Reading maps and soundings,
								interpreting models, and issuing local forecasts.
							</li>
							<li>
								<strong>1119 — Weather Impacts:</strong> U.S. weather hazards, impacts, preparedness, and mitigation.
							</li>
							<li>
								<strong>1112 — Storm Chasing / Thunderstorm Lab (Intro):</strong> Field-based learning that connects classroom
								concepts to live weather.
							</li>
						</ul>
					</article>

					{/*  SECOND YEAR  */}
					<article id="second-year" className="year-block">
						<h3>Second Year: Level Up the Science</h3>
						<p>
							Keep strengthening your conceptual understanding while we guide you through higher-level quantitative ideas that support
							advanced forecasting and analysis—without restrictive math prerequisites to enroll.
						</p>
						<ul className="course-list">
							<li>
								<strong>2116 &amp; 2117 — Advanced Weather Analysis &amp; Forecasting I &amp; II:</strong> Independent event analysis,
								hand analysis mastery, and verification.
							</li>
							<li>
								<strong>2114 — Aviation Meteorology:</strong> Flight-critical weather hazards, METAR/TAF interpretation, and aviation
								products.
							</li>
							<li>
								<strong>2118 — Severe Weather Map Analysis (Lab):</strong> Hands-on severe forecasting and nowcasting with real-time
								radar and data.
							</li>
							<li>
								<strong>2115 — Mesoscale Meteorology:</strong> Local-to-regional weather features, convective systems, and mesoscale
								analysis tools.
							</li>
							<li>
								<strong>2110 — Intermediate Meteorology:</strong> Bridges to quantitative dynamics/thermodynamics used in
								upper-division study.
							</li>
							<li>
								<strong>2112 — Thunderstorm Lab (Advanced Chasing):</strong> Field leadership and advanced responsibilities for
								returning students.
							</li>
						</ul>
						<p className="note">
							<strong>Advising tip:</strong> Pair these with general education and calculus to be fully transfer-ready. Always check the
							COD catalog for the latest prerequisites and credit details.
						</p>
					</article>
				</section>

				{/*  OUTCOMES / GOAL  */}
				<section id="outcomes" className="section section--light">
					<h2>Our Goal</h2>
					<p>
						Students who complete our two-year sequence, alongside general education and calculus, are exceptionally well prepared to
						transfer as juniors. Our alumni consistently stand out for practical forecasting skill, lab experience, and fieldwork— giving
						them momentum through their 3rd and 4th years and beyond.
					</p>
				</section>

				{/*  GET STARTED / CTAs  */}
				<section id="get-started" className="section section--cta" aria-labelledby="get-started-title">
					<h2 id="get-started-title">Ready to Get Started?</h2>
					<ul className="cta-list">
						<li>
							<a className="btn btn--primary" href="/academics/classes-notes">
								Browse Class Notes, Labs &amp; Tutorials
							</a>
						</li>
						<li>
							<a className="btn btn--secondary" href="/tools">
								Explore NEXLAB Tools (Models, Satellite/Radar, Analysis)
							</a>
						</li>
						<li>
							<a className="btn btn--ghost" href="/academics/storm-chasing">
								See Storm Chasing FAQs &amp; Registration
							</a>
						</li>
						<li>
							<a className="link" href="/catalog">
								View COD Catalog for Credits &amp; Prerequisites
							</a>
						</li>
					</ul>
				</section>
			</main>
		</>
	)
}

export default Page
