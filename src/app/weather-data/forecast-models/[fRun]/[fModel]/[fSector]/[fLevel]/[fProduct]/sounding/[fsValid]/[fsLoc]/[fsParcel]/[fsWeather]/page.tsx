const Page = async ({ params }) => {
	const {
		fModel: modelId,
		fRun: runId,
		fSector: sectorId,
		fLevel: levelId,
		fProduct: productId,
		fsValid: validTimeId,
		fsLoc: locationId,
		fsParcel: parcelId,
		fsWeather: weatherId,
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
