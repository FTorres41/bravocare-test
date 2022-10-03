const Pool = require('pg').Pool
const databasePool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'bravocare',
  password: '1234qwer',
  port: 5432,
})

module.exports = databasePool;