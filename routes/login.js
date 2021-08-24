const express = require("express");
const router = express.Router();

const getLogin = (db) => {
  router.post("/login", (req, res) => {
    let query = `
    SELECT name
    FROM users
    WHERE users.id = '1';
    `;
    console.log(query);
    db.query(query)
      .then((data) => {
        res.send(data.rows.name);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

module.exports = getLogin;
