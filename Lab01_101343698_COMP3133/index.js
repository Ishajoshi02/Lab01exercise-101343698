const fs = require('fs');
const csv = require('csv-parser');

// File paths
const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

// Step 1: Delete existing files if they exist
if (fs.existsSync(canadaFile)) {
  fs.unlinkSync(canadaFile);
  console.log(`${canadaFile} deleted`);
}

if (fs.existsSync(usaFile)) {
  fs.unlinkSync(usaFile);
  console.log(`${usaFile} deleted`);
}

// Step 2: Read and filter data
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const { country } = row;
    if (country.toLowerCase() === 'canada') {
      fs.appendFileSync(canadaFile, `${Object.values(row).join(',')}\n`);
    } else if (country.toLowerCase() === 'united states') {
      fs.appendFileSync(usaFile, `${Object.values(row).join(',')}\n`);
    }
  })
  .on('end', () => {
    console.log('CSV file processed successfully');
  });
