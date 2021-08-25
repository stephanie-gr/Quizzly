const express = require("express");
const router = express.Router();

// TODO:
// PROTECT AGAINST SQL INJECTION
// REFACTOR TO EXPORT ONE FUNCTION, WITH MULTIPLE ROUTERS

//GETS
// needs to add WHERE taking quizzes from quizzes.creator_id = userid (from session?)
const getQuizzes = (db) => {
  router.get("/", (req, res) => {
    let query = `
    SELECT * FROM quizzes
    WHERE creator_id = $1;
    `;
    console.log(query);
    db.query(query, [req.cookies.user_id])
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

// pop up a new question form
// ASK: how do we implement this? Should this be handled via AJAX via SPA?
// ASK: how can we do create quiz -> create questions for that quiz in general?
const newQuestionFormShow = (db) => {
  router.get("/questions/:quiz_id", (req, res) => {
    res.render(/*the question submission form*/);
  });
  return router;
};



// TODO: RENDER PAGE
// ASK: similar to question ask^^^
const newQuizFormShow = (db) => {
  router.get("/new", (req, res) => {
    res.render(/* the page for form*/);
  });
  return router;
};

// done
const getQuiz = (db) => {
  router.get("/:quiz_id", (req, res) => {
    let query = `
    SELECT questions.id, quizzes.title, questions.question, questions.option_a, questions.option_b, questions.option_c, questions.option_d, questions.correct_answer
    FROM quizzes
    JOIN questions
    ON quizzes.id = questions.quiz_id
    WHERE quiz_id = ${req.params.quiz_id};
    `;
    // console.log(query);
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

// TODO: CREATE A RESULTS GET FOR A QUIZ
// ASK: How do we implement results? Midterm guideline unclear; what is results?
// is results just a score? ie. 5/6 correct for quiz with quiz_id?
// should we have a seperate endpoint for all users ie. scoreboard?
// should we have an endpoint for a specific user's score on a specific quiz with quiz_id?

// POSTS
// ASK: should we handle posts with res.redirect?


// ASK: How do we implement the new quiz? Need to create a new quiz -> then create a new question for each quiz, RETURNING * for retrieving quiz_id to use in another query for question creation form??
const newQuiz = (db) => {
  router.post("/title", (req, res) => {
    let params = [req.body['quiz-title-text']];
    let query = `
    INSERT INTO quizzes (title)
    VALUES ($1)
    RETURNING *
    `;
    console.log('this is query and params', query, params);
    db.query(query, [params])
      .then((data) => {
        const quizId = data.rows[0].id;
        res.json ({
          quiz_id: quizId
        })
        console.log('got the quizIDDDDD', quizId);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

/*
question creation button -> inserts a new question into questions table FOR questions.quiz_id = quizzes.id
*/
const submitNewQuestion = (db) => {
  router.post("/questions", (req, res) => {
    console.log('req', req.body)
    let params = [req.body.quizId, req.body['text'], req.body['option-a-text'], req.body['option-b-text'], req.body['option-c-text'], req.body['option-d-text'], req.body['option-a-text']];
    let query = `
    INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `;
    console.log('query:', query, params);
    db.query(query, params)
      .then((data) => {

        console.log('data rows', data.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

/*
quiz creation button -> inserts a new quiz into quizzes table, taking data from a user-filled form
*/
//ASK: what should the query be? How to submit a quiz/question?
const submitQuiz = (db) => {
  router.post("/quizzes/:quiz_id", (req, res) => {
    let query = `
    INSERT INTO user_answers (user_id, date, question_id, correct)
    VALUES ('1', NOW(),)
    `;
    // console.log(query);
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
//ASK: How do we get the value from a toggle-button to use in query?
const editQuiz = (db) => {
  router.put("/quizzes/:quiz_id/edit", (req, res) => {
    let query = `
    UPDATE quizzes
    SET is_public = ... //toggle-button state
    WHERE quizzes.id = '${req.params.quiz_id}';
    `;
    // console.log(query);
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

//DELETES

const deleteQuiz = (db) => {
  router.put("/:quiz_id/delete", (req, res) => {
    let query = `
    DELETE FROM quizzes
    WHERE quiz_id = '${req.params.quiz_id}'
    `;
    // console.log(query);
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
  submitNewQuestion,
  submitQuiz,
  editQuiz,
  deleteQuiz,
};
