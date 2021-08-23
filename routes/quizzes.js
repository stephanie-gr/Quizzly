const express = require("express");
const router = express.Router();

//GETS
const getQuizzes = (db) => {
  router.get("/", (req, res) => {
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

const newQuizFormShow = (db) => {
  router.get("/new", (req, res) => {
    res.render(/* the page for form*/);
  });
};

const getQuiz = (db) => {
  router.get("/:quiz_id", (req, res) => {
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
  return router;
};

//POSTS
const newQuiz = (db) => {
  router.post("/new", (req, res) => {
    let query = `INSERT INTO quizzes ...`;
    console.log(query);
    db.query(query)
      .then(() => {
        res.redirect("/quizzes");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

const submitQuiz = (db) => {
  router.post("/quizzes/:quiz_id", (req, res) => {
    let query = `INSERT INTO user_answers ...`;
    console.log(query);
    db.query(query)
      .then(() => {
        res.redirect("/quizzes");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

//PUTS

//sets quiz private/public in database
const editQuiz = (db) => {
  router.put("/quizzes/:quiz_id/edit", (req, res) => {
    let query = `UPDATE quizzes SET ... WHERE ...`;
    console.log(query);
    db.query(query)
      .then(() => {
        res.redirect("/quizzes");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};

//DELETE
const deleteQuiz = (db) => {
  router.put("/:quiz_id/delete", (req, res) => {
    let query = `DELETE FROM quizzes WHERE quiz_id = ${req.params.quiz_id}`;
    console.log(query);
    db.query(query)
      .then(() => {
        res.redirect("/quizzes");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

module.exports = {
  getQuizzes,
  getQuiz,
  newQuizFormShow,
  newQuiz,
  submitQuiz,
  editQuiz,
  deleteQuiz,
};
