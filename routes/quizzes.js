const express = require("express");
const router = express.Router();

//GETS
// needs to add WHERE
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

const newQuestionFormShow = (db) => {
  router.get("/questions/:quiz_id", (req, res) => {
    res.render(/*the question submission form*/);
  });
  return router;
};

// TODO: RENDER PAGE
const newQuizFormShow = (db) => {
  router.get("/new", (req, res) => {
    res.render(/* the page for form*/);
  });
};

// GOOD
const getQuiz = (db) => {
  router.get("/:quiz_id", (req, res) => {
    let query = `
    SELECT quizzes.title, questions.*
    FROM quizzes
    JOIN questions
    ON quizzes.id = questions.quiz_id
    WHERE quiz_id = '${req.params.quiz_id}';`;
    console.log(query);
    db.query(query)
      .then((data) => {
        console.log(data.rows);
        const quiz = data.rows;
        res.json({ quiz });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

//TODO: CREATE A RESULTS GET FOR A QUIZ

//POSTS
const newQuiz = (db) => {
  router.post("/new", (req, res) => {
    let query = `INSERT INTO quizzes ...RETURNING *`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const quizId = data.rows[0].id;
        res.redirect(`/questions/${quizId}`);
      })
      .then()
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

const submitQuestion = (db) => {
  router.post("/questions/:quiz_id", (req, res) => {
    let query = `INSERT INTO questions WHERE quiz-id = quiz-id`;
    db.query(query)
      .then(() => {
        const quizID = req.params.quiz_id;
        res.redirect(`/questions/${quizID}`);
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
  newQuestionFormShow,
  newQuizFormShow,
  newQuiz,
  submitQuestion,
  submitQuiz,
  editQuiz,
  deleteQuiz,
};
