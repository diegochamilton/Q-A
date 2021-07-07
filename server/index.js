const express = require("express");
const app = express();
const { getAllQuestions, addQuestion } = require("../db/helpers/questions");
const getAllAnswers = require("../db/helpers/answers");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/../client/dist"));

app.get("/qa/questions", (req, res) => {
  //TODO - your code here!
  var id = "6";
  getAllQuestions(id, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send({
      product_id: id,
      results: data.rows,
    });
  });
});

app.get("/qa/questions/answers", (req, res) => {
  //TODO - your code here!
  var id = "2";
  getAllAnswers(id, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send({
      question: id,
      page: 0,
      count: 5,
      results: data.rows,
    });
  });
});

app.get("/cats", (req, res) => {
  if (err) {
    console.log(err);
  }
  res.send({
    name: Diego,
  });
});

app.post("/qa/questions", (req, res) => {
  //TODO - your code here!
  var params = [
    req.body.body,
    req.body.name,
    req.body.email,
    req.body.product_id,
  ];
  console.log(params);
  addQuestion(params, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
