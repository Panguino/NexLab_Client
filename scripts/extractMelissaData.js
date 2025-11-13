/**
 * Script to extract Hurricane Melissa (AL13 2025) data from NHC tropical products API
 * and format it for use in the Animator component
 * 
 * Run with: node scripts/extractMelissaData.js
 */

const fs = require('fs');
const path = require('path');

async function fetchMelissaData() {
	try {
		const url = 'https://climate.cod.edu/data/tropical/web/al132025/products.json';
		const response = await fetch(url);
		const data = await response.json();

		// Get all advisory timestamps and sort them
		const timestamps = Object.keys(data).sort();
		console.log(`Total advisories: ${timestamps.length}`);
		console.log(`Date range: ${timestamps[0]} to ${timestamps[timestamps.length - 1]}`);

		// Select every 8th frame to get ~10 frames (80 advisories / 8 = 10 frames)
		// This gives us roughly one frame per day
		const selectedTimestamps = timestamps.filter((_, index) => index % 8 === 0);
		console.log(`\nSelected ${selectedTimestamps.length} frames for animation:`);
		selectedTimestamps.forEach(ts => console.log(`  ${ts}`));

		// Create frames array
		const frames = selectedTimestamps.map((timestamp, index) => {
			const advisory = data[timestamp];
			const { cone, pts, ww, bestTrack } = advisory;

			// Parse timestamp to Date
			const year = parseInt(timestamp.substring(0, 4));
			const month = parseInt(timestamp.substring(4, 6)) - 1; // JS months are 0-indexed
			const day = parseInt(timestamp.substring(6, 8));
			const hour = parseInt(timestamp.substring(8, 10));
			const minute = parseInt(timestamp.substring(10, 12));
			const frameDate = new Date(year, month, day, hour, minute);

			return {
				timestamp,
				frameDate: frameDate.toISOString(),
				frameNumber: index,
				totalFrames: selectedTimestamps.length,
				hasCone: cone && cone.length > 0,
				hasForecast: pts && pts.position && pts.position.length > 0,
				hasWarnings: ww && ww.length > 0,
				hasBestTrack: bestTrack && Object.keys(bestTrack).length > 0,
				stormName: pts?.stormname || 'Unknown',
				advisoryNumber: pts?.advisnum || 'N/A',
				maxWind: pts?.maxwind ? Math.max(...pts.maxwind) : 0,
				category: pts?.ss ? Math.max(...pts.ss) : 0,
			};
		});

		// Write summary to console
		console.log(`\n=== Frame Summary ===`);
		frames.forEach(frame => {
			console.log(`Frame ${frame.frameNumber}: ${frame.timestamp} - ${frame.stormName} (Cat ${frame.category}, ${frame.maxWind}kt)`);
		});

		// Write full data to file
		const outputPath = path.join(__dirname, '..', 'src', 'components', 'elements', 'Animator', 'AnimatorMapMachine', 'staticMapData', 'melissaHurricaneData.json');
		
		// Create output object with selected frames
		const output = {
			stormId: 'al132025',
			stormName: 'Hurricane Melissa',
			description: 'Historical data for Hurricane Melissa (October 2025) - Atlantic Basin Storm 13',
			totalAdvisories: timestamps.length,
			selectedFrames: selectedTimestamps.length,
			dateRange: {
				start: timestamps[0],
				end: timestamps[timestamps.length - 1],
			},
			frames: selectedTimestamps.map(timestamp => ({
				timestamp,
				data: data[timestamp],
			})),
		};

		fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
		console.log(`\n✅ Data written to: ${outputPath}`);
		console.log(`📊 File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);

	} catch (error) {
		console.error('❌ Error:', error.message);
		process.exit(1);
	}
}

fetchMelissaData();

