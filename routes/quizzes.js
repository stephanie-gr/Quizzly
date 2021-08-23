const express = require("express");
const router = express.Router();

const getQuizzes = (db) => {
  router.get("/quizzes", (req, res) => {
    let query = `SELECT * FROM quizzes`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

const getQuiz = (db) => {
  router.get("/quizzes/:quiz_id", (req, res) => {
    let query = `
    SELECT * FROM quizzes
    JOIN users ON users.id = creator_id
    WHERE quiz_id = ${req.params.quiz_id}
    AND WHERE creator_id = users.id`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const quiz = data.rows;
        res.json({ quiz });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
};

const newQuiz = (db) => {
  router.post("/quizzes/new", (req, res) => {
    let query = `INSERT INTO quizzes ...`;
    console.log(query);
    db.query(query).then(() => {
      res.redirect("/quizzes").catch((err) => {
        res.status(500).json({ error: err.message });
      });
    });
  });
};

const editQuiz = (db) => {
  router.put("/quizzes/:quiz_id/edit", (req, res) => {
    let query = `UPDATE quizzes SET ... WHERE ...`;
    console.log(query);
    db.query(query).then(() => {
      res.redirect("/quizzes").catch((err) => {
        res.status(500).json({ error: err.message });
      });
    });
  });
};

const deleteQuiz = (db) => {
  router.put("/quizzes/:quiz_id/delete", (req, res) => {
    let query = `DELETE FROM quizzes WHERE quiz_id = ${req.params.quiz_id}`;
    console.log(query);
    db.query(query).then(() => {
      res.redirect("/quizzes").catch((err) => {
        res.status(500).json({ error: err.message });
      });
    });
  });
};

module.exports = { getQuizzes, getQuiz, newQuiz, editQuiz, deleteQuiz };
