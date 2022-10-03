const databasePool = require('../databasePool');

module.exports = {
    async index (_, response) {
        const facilities = databasePool.query('SELECT * FROM facilities ORDER BY facility_id ASC;', (error, results) => {
            if (error) {
              throw error
            }
          })

        return response.json(facilities); 
    }
}