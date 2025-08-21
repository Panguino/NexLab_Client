// Formats a run string YYYYMMDDHH -> "HHZ M/D/YY"
export const formatRunToZDate = (run: string): string => {
  if (!run || run.length !== 10) return run || ''
  const year = parseInt(run.slice(0, 4), 10)
  const month = parseInt(run.slice(4, 6), 10) // 1..12
  const day = parseInt(run.slice(6, 8), 10)
  const hour = parseInt(run.slice(8, 10), 10)

  const twoDigitYear = String(year).slice(2)
  // month is numeric without leading zero for visual compactness
  return `${hour.toString().padStart(2, '0')}Z ${month}/${day}/${twoDigitYear}`
}

