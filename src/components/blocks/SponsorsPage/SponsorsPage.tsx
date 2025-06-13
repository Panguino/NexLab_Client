import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { Footer } from '../PageBlocks/Footer/Footer'

export const SponsorsPage = () => {
	return (
		<ScrollArea>
			<section id="sponsor-hero" className="sponsor-hero">
				<div className="container">
					<h1>Partner with NexLab Weather</h1>
					<p className="intro-text">
						Support free, high-quality weather data and analysis used by millions worldwide. Sponsorship is a premium way for
						organizations to make a significant impact while gaining broad visibility and collaboration opportunities.
					</p>
					<div className="hero-cta">
						<a href="/sponsors/media-kit.pdf" className="btn btn-primary" target="_blank" rel="noopener">
							Download Sponsorship Prospectus
						</a>
						<a href="#contact-sponsor" className="btn btn-secondary">
							Contact Us About Sponsorship
						</a>
					</div>
				</div>
			</section>
			<section id="sponsor-why" className="sponsor-why">
				<div className="container">
					<h2>Why Sponsor NexLab Weather?</h2>
					<p>
						Millions of researchers, educators, storm chasers, and hobbyists rely on our free data and tools every day. By sponsoring
						NexLab Weather, your organization helps sustain and expand this vital public resource, while positioning your brand in front
						of a global audience passionate about meteorology and data science.
					</p>
					<div className="metrics-grid">
						<div className="metric">
							<strong>5M+</strong>
							<span>Monthly Site Visits</span>
						</div>
						<div className="metric">
							<strong>12M+</strong>
							<span>API Calls per Month</span>
						</div>
						<div className="metric">
							<strong>Global</strong>
							<span>Users in 100+ Countries</span>
						</div>
						<div className="metric">
							<strong>50K+</strong>
							<span>Discord Community Members</span>
						</div>
					</div>
					<blockquote className="testimonial">
						“Partnering with NexLab Weather elevated our presence among meteorology professionals and led to valuable collaborations.”
						<cite>— Jane Doe, CTO, WeatherTech Corp.</cite>
					</blockquote>
					<div className="impact-examples">
						<h3>Impact Examples:</h3>
						<ul>
							<li>Last year’s sponsorship funded a new real-time alert feature used in multiple severe-weather events.</li>
							<li>Technical collaboration with Sponsor X enabled integration of specialized datasets for academic research.</li>
						</ul>
					</div>
				</div>
			</section>
			<section id="sponsor-benefits" className="sponsor-benefits">
				<div className="container">
					<h2>Sponsorship Benefits</h2>
					<div className="benefit-category">
						<h3>Brand Visibility & Recognition</h3>
						<ul>
							<li>
								<strong>Prominent Logo Placement:</strong> Display your logo in site header/footer, data view banners, and sponsor
								page.
							</li>
							<li>
								<strong>Featured in Communications:</strong> Inclusion in newsletters, annual impact reports, and selected social
								media posts.
							</li>
							<li>
								<strong>Event & Webinar Sponsorship:</strong> Co-brand webinars or workshops hosted by NexLab Weather, showcasing your
								expertise.
							</li>
						</ul>
					</div>
					<div className="benefit-category">
						<h3>Audience Engagement & Reach</h3>
						<ul>
							<li>
								<strong>Exposure to Millions of Users:</strong> Your brand seen by researchers, educators, forecasters, and
								enthusiasts worldwide.
							</li>
							<li>
								<strong>Content Collaboration:</strong> Opportunities to co-author blog posts, technical articles, or case studies
								featuring your organization’s work with weather data.
							</li>
							<li>
								<strong>Lead Generation (Optional):</strong> Co-hosted webinars or downloadable resources to capture opt-in leads
								aligned with your goals.
							</li>
						</ul>
					</div>
					<div className="benefit-category">
						<h3>Custom Integrations & Technical Collaboration</h3>
						<ul>
							<li>
								<strong>API & Feature Co-Development:</strong> Work directly with our engineering team to build tailored tools, data
								feeds, or dashboards.
							</li>
							<li>
								<strong>Priority Access & Feedback Loop:</strong> Early preview of new features; influence roadmap for relevant
								enhancements.
							</li>
							<li>
								<strong>Dedicated Technical Support:</strong> A defined point of contact for integration assistance and SLA support
								for custom projects.
							</li>
						</ul>
					</div>
					<div className="benefit-category">
						<h3>Thought Leadership & Community Positioning</h3>
						<ul>
							<li>
								<strong>Speaking Opportunities:</strong> Present in NexLab-hosted webinars or panel discussions, showcasing your
								expertise in weather-related applications.
							</li>
							<li>
								<strong>Guest Content & Articles:</strong> Publish on our blog or newsletter about how your organization leverages
								weather data.
							</li>
							<li>
								<strong>Advisory Participation:</strong> Invitation to join advisory discussions about future platform features and
								priorities.
							</li>
						</ul>
					</div>
					<div className="benefit-category">
						<h3>Reporting & Transparency</h3>
						<ul>
							<li>
								<strong>Impact Reports:</strong> Quarterly or annual summaries detailing how sponsorship funds were allocated and what
								was achieved.
							</li>
							<li>
								<strong>Metrics Dashboard:</strong> Access to metrics on ad impressions, click-through rates on sponsor placements,
								and engagement with co-branded content.
							</li>
							<li>
								<strong>Regular Check-Ins:</strong> Scheduled meetings to review progress on custom integrations and upcoming
								initiatives.
							</li>
						</ul>
					</div>
				</div>
			</section>
			<section id="current-sponsors" className="current-sponsors">
				<div className="container">
					<h2>Our Sponsors</h2>
					<div className="logo-wall">
						<img src="/assets/logos/sponsor1.png" alt="Sponsor One Logo" />
						<img src="/assets/logos/sponsor2.png" alt="Sponsor Two Logo" />
						<img src="/assets/logos/sponsor3.png" alt="Sponsor Three Logo" />
						<img src="/assets/logos/sponsor4.png" alt="Sponsor Four Logo" />
					</div>
					<div className="sponsor-testimonials">
						<div className="testimonial-item">
							<blockquote>
								“Sponsoring NexLab Weather gave us unparalleled reach into the meteorology community and directly supported new
								feature development we needed.”
								<cite>— John Smith, VP of Engineering, ClimateCorp</cite>
							</blockquote>
						</div>
						<div className="testimonial-item">
							<blockquote>
								“The technical collaboration and visibility we gained through sponsorship helped position us as leaders in weather
								analytics.”
								<cite>— Emily Zhang, Product Manager, StormWatch Inc.</cite>
							</blockquote>
						</div>
					</div>
				</div>
			</section>
			<section id="how-funds-used" className="how-funds-used">
				<div className="container">
					<h2>How Sponsorship Helps</h2>
					<p>We allocate sponsorship funds strategically to ensure maximum impact and sustainability of free weather data and tools:</p>
					<ul>
						<li>
							<strong>Infrastructure & Performance:</strong> Enhance server capacity, reduce latency, and ensure high uptime to serve
							millions of users reliably.
						</li>
						<li>
							<strong>Feature Development:</strong> Fund new tools and integrations—such as real-time alert systems, advanced
							visualization modules, and custom API endpoints.
						</li>
						<li>
							<strong>Team Support:</strong> Compensate our part-time experts (developers, data engineers, support staff) so they can
							maintain and innovate the platform continuously.
						</li>
						<li>
							<strong>Community Initiatives:</strong> Support workshops, webinars, and educational resources that benefit students,
							researchers, and enthusiasts.
						</li>
						<li>
							<strong>Transparency & Reporting:</strong> Maintain clear impact reports, analytics dashboards, and regular updates so
							sponsors see exactly how funds drive improvements.
						</li>
					</ul>
					<p>
						By sponsoring NexLab Weather, you directly enable these activities, ensuring the platform remains free, cutting-edge, and
						responsive to community needs.
					</p>
				</div>
			</section>
			<Footer />
		</ScrollArea>
	)
}
