import dotenv from "dotenv";
dotenv.config();

export function createHourlyDictionary(data) {
  // Create an array of size 24 for the hours in a day, initializing each element to 0
  let hourDictionary = Array(24).fill(0);

  // Process each row in the input data
  data.forEach((row) => {
    // Extract the datetime field from the row
    const datetimeField = row[process.env.DATETIME_OCC_FIELD];
    if (datetimeField) {
      // Convert the datetime field to a Date object
      const date = new Date(datetimeField);

      // Get the hour from the Date object
      const hour = date.getHours();

      // Increment the count for that hour
      hourDictionary[hour]++;
    }
  });

  // Convert the array of hour counts to an array of objects
  const result = hourDictionary.map((crimeCount, hour) => ({
    hour,
    crimeCount,
  }));

  return result;
}
