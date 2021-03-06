const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `
    SELECT * FROM quizzes
    WHERE creator_id = $1;
    `;
    db.query(query, [req.cookies.user_id])
      .then((data) => {
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //get quiz
  router.get("/:quiz_url", (req, res) => {
    let query = `
    SELECT questions.id, quizzes.title, questions.question, questions.option_a, questions.option_b, questions.option_c, questions.option_d, questions.correct_answer
    FROM quizzes
    JOIN questions
    ON quizzes.id = questions.quiz_id
    WHERE url = $1
    `;
    const params = "/quizzes/" + req.params.quiz_url;

    console.log(params);
    db.query(query, [params])
      .then((data) => {
        const quiz = data.rows;
        res.json({ quiz });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //new quiz
  router.post("/title", (req, res) => {
    let randURL = "/quizzes/" + generateRandomString();
    let params = [
      req.cookies.user_id,
      req.body["quiz-title-text"],
      randURL,
      "false",
      "now()",
    ];
    let query = `
    INSERT INTO quizzes (creator_id, title, url, is_public, date_created)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;
    console.log("this is query and params", query, params);
    db.query(query, params)
      .then((data) => {
        const quizId = data.rows[0].id;
        res.json({
          quiz_id: quizId,
        });
        console.log("got the quizIDDDDD", quizId);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //submit new question
  router.post("/questions", (req, res) => {
    console.log("req", req.body);
    let params = [
      req.body.quizId,
      req.body["text"],
      req.body["option-a-text"],
      req.body["option-b-text"],
      req.body["option-c-text"],
      req.body["option-d-text"],
      req.body["option-a-text"],
    ];
    let query = `
      INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `;
    console.log("query:", query, params);
    db.query(query, params)
      .then((data) => {
        console.log("data rows", data.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/public", (req, res) => {
    console.log("getting inside public post route");
    console.log("req", req.body.quizId);
    let query = `
      UPDATE quizzes
      SET is_public = true
      WHERE url = $1;
      `;
    db.query(query, [req.body.quizId])
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/public", (req, res) => {
    console.log("getting inside public get route");
    console.log("req", req.body.quizId);
    let query = `
      SELECT url
      FROM quizzes
      WHERE id = req.body.quiz_id
      `;
    db.query(query, [req.body.quizId])
      .then((data) => {
        res.redirect("/public");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/private", (req, res) => {
    console.log("getting inside public post route");
    console.log("req", req.body.quizId);
    let query = `
      UPDATE quizzes
      SET is_public = false
      WHERE url = $1;
      `;
    db.query(query, [req.body.quizId])
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  //submit quiz
  //TODO: overhaul this endpoint to return for results page expect
  router.post("/quizzes/:quiz_id", (req, res) => {
    let query = `
    INSERT INTO user_answers (user_id, date, question_id, correct)
    VALUES ('1', NOW(),)
    `;
    db.query(query)
      .then(() => {
        res.redirect("/quizzes");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:quiz_url/results", (req, res) => {
    const answers = req.body.answers;
    let matched = 0;
    let query = `
    SELECT correct_answer FROM questions
    JOIN quizzes ON quizzes.id = questions.quiz_id
    WHERE quizzes.url = $1;
    `;
    db.query(query, ["/quizzes/" + req.params.quiz_url]).then(
      (correctAnswers) => {
        for (let i = 0; i < correctAnswers.rows.length; i++) {
          if (correctAnswers.rows[i].correct_answer === answers[i]) {
            matched++;
          }
        }
        const results = {
          matched: matched,
          numAnswers: correctAnswers.rows.length,
          quizURL: req.params.quiz_url,
        };
        console.log("asdf", results);
        res.json(results);
      }
    );
  });

  //delete quiz
  //TODO: add a delete button on my_quizzes pages for this route
  router.post("/:quiz_id/delete", (req, res) => {
    // console.log();
    let query = `
    DELETE FROM quizzes
    WHERE url = $1;
    `;
    console.log("query:", req.params.quiz_id);
    db.query(query, ["/quizzes/" + req.params.quiz_id])
      .then(() => {
        res.redirect("/quizzes");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};

const generateRandomString = () => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
