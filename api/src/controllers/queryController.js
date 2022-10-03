const databasePool = require('../databasePool');

module.exports = {
    async index4 (_, response) {
        databasePool.query(
            `SELECT 
                J.job_id,
                (J.total_number_nurses_needed - COUNT(nhj.nurse_id)) AS "remaining_spots"
            FROM jobs J
            INNER JOIN nurse_hired_jobs NHJ ON NHJ.job_id = J.job_id
            GROUP BY J.job_id, NHJ.job_id
            ORDER BY J.job_id ASC;
            `, 
            (error, results) => {
            if (error) {
              throw error
            }
            return response.status(200).json(results.rows);
          });
    },

    async index5 (_, response) {
        databasePool.query(
            `SELECT 
                N.nurse_id, 
                N.nurse_name, 
                N.nurse_type,
                (COUNT(J.nurse_type_needed) - COUNT(NHJ.nurse_id)) AS "available_job_count"
            FROM nurses N
            INNER JOIN nurse_hired_jobs NHJ ON NHJ.nurse_id = N.nurse_id
            INNER JOIN jobs J ON J.nurse_type_needed = N.nurse_type
            GROUP BY J.nurse_type_needed, NHJ.nurse_id, N.nurse_id
            ORDER BY N.nurse_id ASC;`, 
            (error, results) => {
            if (error) {
              throw error
            }
            return response.status(200).json(results.rows);
          });
    },

    async index6 (_, response) {
        databasePool.query(
            `SELECT 
                F.facility_name,
                N.nurse_name,
                COUNT(N.nurse_name) AS "count"
             FROM facilities F
             INNER JOIN jobs J ON J.facility_id = F.facility_id
             INNER JOIN nurse_hired_jobs NHJ ON NHJ.job_id = J.job_id
             INNER JOIN nurses N ON N.nurse_id = NHJ.nurse_id
             GROUP BY NHJ.nurse_id, F.facility_id, N.nurse_name
             ORDER BY F.facility_name ASC;`, 
            (error, results) => {
            if (error) {
              throw error
            }
            return response.status(200).json(results.rows);
          });
    }
}