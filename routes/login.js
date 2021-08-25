const express = require("express");
const router = express.Router();

const getLogin = (db) => {
  router.post("/", (req, res) => {
    let query = `
    SELECT id
    FROM users
    WHERE users.username = $1;
    `;
    console.log(query);
    db.query(query, [req.body.username])
      .then((data) => {
        req.sessions.userid = data.rows[0].id;
        res.redirect("/");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

module.exports = getLogin;
