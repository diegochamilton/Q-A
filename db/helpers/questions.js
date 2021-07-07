const pool = require("../config.js");

const getAllQuestions = (param, callback) => {
  var queryString = `SELECT
  id as question_id,
  body as question_body,
  date_written as question_date,
  asker_name,
  helpful as question_helpfulness,
  reported,
  (
    SELECT jsonb_object_agg(answers.id, jsonb_build_object(
      'id', answers.id,
      'body', answers.body,
      'date', answers.date_written,
      'answerer_name', answerer_name,
      'helpfulness', answers.helpful,
      'photos', (
        SELECT jsonb_agg(jsonb_build_object(
          'id', photos.id,
          'url', photos.url
          ))
        FROM photos
        WHERE answers.id = photos.answer_id
      )
    ))
    FROM answers
    WHERE questions.id = answers.question_id
  ) as answers
  FROM questions
  WHERE product_id = ${param} AND reported = false limit 5`;
  pool.query(queryString, (err, results) => {
    callback(err, results);
  });
};

const addQuestion = (params, callback) => {
  var queryString =
    "INSERT INTO questions(body, asker_name, asker_email, product_id) VALUES (?, ?, ?, ?)";
  pool.query(queryString, params, (err, results) => {
    callback(err, results);
  });
};

module.exports.getAllQuestions = getAllQuestions;
module.exports.addQuestion = addQuestion;
