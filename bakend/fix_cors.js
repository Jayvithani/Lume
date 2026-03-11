const fs = require('fs');
let data = fs.readFileSync('e:/lume/bakend/src/index.js', 'utf8');
data = data.replace('http://localhost:5173', '*');
fs.writeFileSync('e:/lume/bakend/src/index.js', data);
console.log('CORS updated');
