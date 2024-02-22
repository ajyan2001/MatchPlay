const express = require("express");

const { getUserByID, insertUser } = require("../controllers/users.controller");

const router = express.Router();

router.get("/:id", getUserByID);

router.post("/", insertUser);

module.exports = router;
