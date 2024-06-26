const express = require("express");

const {
  get_user_by_id_controller,
  insert_user_controller,
  get_compatible_user_controller,
  get_multiple_compatible_controller,
  update_user_controller,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/:id", get_user_by_id_controller);
router.get("/:id/compatible", get_compatible_user_controller);
router.get("/:id/compatible/multiple", get_multiple_compatible_controller);
router.put("/update", update_user_controller);

router.post("/", insert_user_controller);

module.exports = router;
