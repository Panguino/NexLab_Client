import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { Footer } from '../PageBlocks/Footer/Footer'
import DonationForm from './DonationForm/DonationForm'
import styles from './DonationPage.module.scss'

export const DonationPage = () => {
	return (
		<ScrollArea>
			<div className={styles.donationPage}>
				<DonationForm />
				<div className={styles.hero}>
					<div className={styles.heroContent}>
						<h1>Support the Future of Free Weather Data and Analysis</h1>
						<p>
							By contributing today, you keep vital datasets and forecasting tools freely available to millions of learners, educators,
							and storm chasers. Help us empower the next generation of meteorologists with open access to research-grade weather data.
						</p>
						<button>Donate Now</button>
						<button>Become a Sponsor</button>
					</div>
				</div>
				<div className={styles.perks}>
					<h2>Perks of making a donation</h2>
					<p>
						By giving to Nexlab, you keep vital weather data and analysis tools free for millions of researchers, educators, storm
						chasers, and hobbyists worldwide. Your support not only sustains open weather resources but also deepens your involvement with
						Nexlab’s mission. As a token of our gratitude, each donor unlocks benefits across several categories—Community & Recognition
						some of which are:
					</p>
					<ul>
						<li>
							<b>Exclusive Donator Role:</b> This role gives donors a special badge on both the website and Discord.
						</li>
						<li>
							<b>Private Discord Channels:</b> A space to preview upcoming features, provide feedback, and suggest new ideas.
						</li>
						<li>
							<b>Premium Tool Access:</b> Priority access to advanced versions of tools, such as expanded model/data comparison options
							and increased saved/favorite limits.
						</li>
					</ul>
					<button>Full Breakdown</button>
				</div>
				<div className={styles.donationUse}>
					<h2>Planned use of donations</h2>
					<p>
						Help us continue delivering reliable weather data and tools—completely free—by becoming a donating member. Your support
						ensures we can maintain infrastructure, compensate our expert team, and innovate new features. Thank you for considering a
						gift that benefits millions worldwide.
					</p>
					<div className={styles.donationUseContent}>
						<div className={styles.donationUsePanel}>
							<h4>Sustaining Our Dedicated Team of Weather Experts</h4>
							<p>
								NexLab Weather is powered by a small, dedicated team of part-time staff members who handle everything from development
								to maintenance and support. Donations directly contribute to covering their time and efforts, allowing us to continue
								providing high-quality weather tools and keeping up with community needs.
							</p>
						</div>
						<div className={styles.donationUsePanel}>
							<h4>Hosting, Technology, and Infrastructure Costs</h4>
							<p>
								Running a weather data platform with thousands of daily users requires reliable, high-performance servers and
								resources. Donations will help us maintain and scale our hosting infrastructure, ensuring data remains accessible and
								tools run smoothly. These funds also allow us to upgrade equipment and computing resources as needed to handle the
								demands of our growing community.
							</p>
						</div>
						<div className={styles.donationUsePanel}>
							<h4>Continued Innovation and Expansion</h4>
							<p>
								Beyond upkeep, donations will enable us to pursue ambitious updates and enhancements, including the full UI/UX
								rebrand, new tool development, and potential open-source contributions to weather data solutions. Your support keeps
								us innovating and empowers NexLab Weather to evolve for a broader audience.
							</p>
						</div>
					</div>
				</div>
				<div className={styles.donate}>
					<h2>Become a donating Member</h2>
					<table>
						<thead>
							<tr>
								<th>Perk / Tier</th>
								<th>Standard ($5/mo or $100 lifetime)</th>
								<th>Advanced ($25/mo or $250 lifetime)</th>
								<th>Premium ($50/mo or $1,000 lifetime)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Acknowledgement on Donor Wall</td>
								<td>✓</td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Donor Badge (site &amp; Discord)</td>
								<td>✓</td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Private Discord Channels</td>
								<td>✓</td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Advanced Poll Participation</td>
								<td>✓</td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Prioritized Feedback with Developers</td>
								<td></td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Preview Upcoming Features</td>
								<td></td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Geolocation Tools</td>
								<td>✓</td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Web Alert Push Notifications</td>
								<td>✓</td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>User-Defined Color Enhancements</td>
								<td>✓</td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Custom Model Comparison Tool</td>
								<td>✓</td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Dashboard – Unlimited Favorites</td>
								<td></td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Distance Measurement Tool</td>
								<td></td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Increased Hazards Map Refresh Frequency</td>
								<td></td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Dashboard – Geolocated Selection</td>
								<td></td>
								<td></td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Save Data to Cloud</td>
								<td></td>
								<td></td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Save Animations Locally</td>
								<td></td>
								<td></td>
								<td>✓</td>
							</tr>
							<tr>
								<td>API Access</td>
								<td></td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>API Polling Frequency</td>
								<td></td>
								<td>Moderate</td>
								<td>Maximum</td>
							</tr>
							<tr>
								<td>Exclusive Data Packages</td>
								<td></td>
								<td>✓</td>
								<td>✓</td>
							</tr>
							<tr>
								<td>• Full ECMWF</td>
								<td>(verify)</td>
								<td>✓</td>
								<td>✓?</td>
							</tr>
							<tr>
								<td>• HRRR Soundings</td>
								<td></td>
								<td></td>
								<td>✓</td>
							</tr>
							<tr>
								<td>• VIP Weather Alert Feed</td>
								<td></td>
								<td></td>
								<td>✓</td>
							</tr>
							<tr>
								<td>Monthly Donor Newsletter &amp; Impact Insights</td>
								<td>✓</td>
								<td>✓</td>
								<td>✓</td>
							</tr>
						</tbody>
					</table>
				</div>
				<section className={styles.sponsor}>
					<h2>Looking to Sponsor?</h2>
					<p>
						If individual donations aren’t the right fit for your organization or you’re ready to make a larger impact, consider
						sponsoring NexLab Weather. Partner with us and have your brand seen by millions of users who rely on our free data and tools
						every day.
					</p>
					<ul>
						<li>
							<strong>Prominent Logo Placement:</strong> Showcase your brand across our high-traffic platform—on the site header, data
							views, and sponsor page.
						</li>
						<li>
							<strong>Custom Feature & API Collaboration:</strong> Work with our team to develop integrations or tools tailored to your
							needs, while supporting the wider community.
						</li>
						<li>
							<strong>Premium Recognition:</strong> Featured as a key supporter in our annual impact report, on the sponsors page, and
							in select communications—demonstrating your commitment to open weather data.
						</li>
					</ul>
					<a href="/sponsors">Explore Sponsorship Opportunities</a>
				</section>
				<section className={styles.testimonials}>
					<div className={styles.testimonial}>
						<p>
							"NexLab Weather has been an invaluable resource for my research. The free access to high-quality data and tools has made a
							significant impact on my work."
						</p>
						<div className={styles.avatar}>
							<img src="/images/avatar1.jpg" alt="Avatar of Dr. John Doe" />
						</div>
						<cite>
							<b>Dr. Jane Smith</b>
						</cite>
						<cite>Meteorologist</cite>
					</div>
					<div className={styles.testimonial}>
						<p>
							"NexLab Weather has been an invaluable resource for my research. The free access to high-quality data and tools has made a
							significant impact on my work."
						</p>
						<div className={styles.avatar}>
							<img src="/images/avatar1.jpg" alt="Avatar of Dr. John Doe" />
						</div>
						<cite>
							<b>Dr. Jane Smith</b>
						</cite>
						<cite>Meteorologist</cite>
					</div>
					<div className={styles.testimonial}>
						<p>
							"NexLab Weather has been an invaluable resource for my research. The free access to high-quality data and tools has made a
							significant impact on my work."
						</p>
						<div className={styles.avatar}>
							<img src="/images/avatar1.jpg" alt="Avatar of Dr. John Doe" />
						</div>
						<cite>
							<b>Dr. Jane Smith</b>
						</cite>
						<cite>Meteorologist</cite>
					</div>
				</section>
			</div>
			<Footer />
		</ScrollArea>
	)
}
