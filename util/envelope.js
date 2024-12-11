const env = process.env.NEXT_PUBLIC_ENV || 'development'; 

let name;

if(env == 'production') {
    name = 'PyzWqzPHW'
} else if(env == 'staging') {
    name = 'syWVYntnN'
} else {
    name = 'dlcWnfQSi'
}

module.exports = require(`../lib/closet/${name}.js`);