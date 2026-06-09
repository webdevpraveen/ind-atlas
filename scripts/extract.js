const fs = require('fs');

const districtsData = JSON.parse(fs.readFileSync('public/india-districts.geojson'));

const mapping = {};

districtsData.features.forEach(f => {
  const state = f.properties.NAME_1;
  const district = f.properties.NAME_2;
  
  if (!state || !district) return;
  
  if (!mapping[state]) mapping[state] = new Set();
  mapping[state].add(district);
});

const result = Object.keys(mapping).sort().map(state => ({
  state,
  districts: Array.from(mapping[state]).sort()
}));

fs.writeFileSync('lib/statesAndDistricts.json', JSON.stringify(result, null, 2));
console.log('Successfully generated lib/statesAndDistricts.json');
