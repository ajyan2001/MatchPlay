const {
  get_user_by_id_repository,
  insert_user_repository,
  update_user_by_id_repository,
} = require("../repositories/users.repository");
const {
  get_compatible_user_service,
  get_multiple_compatible_service,
} = require("../services/users.service");

const get_user_by_id_controller = async (req, res) => {
  try {
    userID = req.params.id;
    const user = await get_user_by_id_repository(userID);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const update_user_controller = async (req, res) => {
  try {
    userId = req.body._id;
    set = req.body;
    delete set._id;

    await update_user_by_id_repository(userId, set);

    res.status(200).json({ message: "Document updated successfully" });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const insert_user_controller = async (req, res) => {
  try {
    userObject = req.body;
    const user = await insert_user_repository(userObject);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const get_compatible_user_controller = async (req, res) => {
  try {
    userID = req.params.id;
    const compatibleUser = await get_compatible_user_service(userID);
    res.status(200).json(compatibleUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const get_multiple_compatible_controller = async (req, res) => {
  try {
    userID = req.params.id;
    const compatibleUsers = await get_multiple_compatible_service(userID);
    res.status(200).json(compatibleUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  get_user_by_id_controller,
  insert_user_controller,
  get_compatible_user_controller,
  update_user_controller,
  get_multiple_compatible_controller,
};
