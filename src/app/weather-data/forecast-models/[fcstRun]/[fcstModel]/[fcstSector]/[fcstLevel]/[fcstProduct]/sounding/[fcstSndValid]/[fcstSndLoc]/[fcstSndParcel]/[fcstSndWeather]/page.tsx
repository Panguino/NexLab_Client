const Page = async ({ params }) => {
	const {
		fcstModel: modelId,
		fcstRun: runId,
		fcstSector: sectorId,
		fcstLevel: levelId,
		fcstProduct: productId,
		fcstSndValid: validTimeId,
		fcstSndLoc: locationId,
		fcstSndParcel: parcelId,
		fcstSndWeather: weatherId,
	} = params
	console.log('Model ID:', modelId)
	console.log('Run ID:', runId)
	console.log('Sector ID:', sectorId)
	console.log('Level ID:', levelId)
	console.log('Product ID:', productId)
	console.log('Valid Time ID:', validTimeId)
	console.log('Location ID:', locationId)
	console.log('Parcel ID:', parcelId)
	console.log('Weather ID:', weatherId)
	return <>Forecast Soundings Page</>
}
export default Page
