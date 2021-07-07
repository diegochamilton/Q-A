const pool = require("../config.js");

const getAllAnswers = (param, callback) => {
  var queryString = `SELECT
  id as answer_id,
  body,
  date_written as date,
  answerer_name,
  helpful as helpfulness,
  (
    SELECT jsonb_agg(jsonb_build_object(
      'id', photos.id,
      'url', photos.url
      ))
    FROM photos
    WHERE answers.id = photos.answer_id
  ) as photos
  FROM answers
  WHERE question_id = ${param} AND reported = false
  `;
  pool.query(queryString, (err, results) => {
    callback(err, results);
  });
};

module.exports = getAllAnswers;
