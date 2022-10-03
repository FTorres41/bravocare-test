const databasePool = require('../databasePool');

module.exports = {
    async index (request, response) {
        const result = [];
        const { id } = request.params;
        const clinicianHistoryResults = databasePool.query(
            `SELECT * FROM clinician_work_history WHERE facility_id = ${id} ORDER BY work_history_id ASC;`, 
            (error, results) => {
            if (error) {
              throw error
            }
            return results.rows;
          })

        if (clinicianHistoryResults?.length > 0) {
            clinicianHistoryResults?.forEach((row) => {
                const score = 0;
                if (row.worked_shift) score++;
                if (row.call_out) score -= 3;
                if (row.no_call_no_show) score -= 5;

                result.push({
                    nurse_id: row.nurse_id,
                    score
                })
            });
        }

        return response.status(200).json(result.sort((r, rr) => r.score - rr.score));
    }
}