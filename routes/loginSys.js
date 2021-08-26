const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/:id", (req, res) => {
    res.cookie("user_id", req.params.id).redirect("/");
  });
  return router;
};
