import dotenv from "dotenv";
dotenv.config();

export function createYearlyDictionary(filteredData) {
  // Check if the data starts in January and ends in December
  const firstInstanceDate = filteredData[0][process.env.DATETIME_OCC_FIELD];
  const lastInstanceDate = filteredData[filteredData.length - 1][process.env.DATETIME_OCC_FIELD];
  // Array of month names in three-letter representation
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Create an empty dictionary for the year
  let yearDictionary = {};

  monthNames.forEach((month) => {
    yearDictionary[month] = 0; // Initialize each month with a count of 0
});
  filteredData.forEach((row) => {
    const date = row[process.env.DATETIME_OCC_FIELD]
    const monthIndex = date.getMonth()
    const monthName = monthNames[monthIndex]
    if (monthName in yearDictionary) {
        yearDictionary[monthName] += 1;
    }
  })
  return yearDictionary;
}
