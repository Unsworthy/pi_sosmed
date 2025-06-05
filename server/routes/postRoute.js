const authenticateJWT = require("../middleware/authMiddleware");
const post_ctrl = require("../controllers/post_ctrl");

module.exports = (app) => {
  const router = app.Router();

  router.get("/list", authenticateJWT, post_ctrl.index);

  return router;
};
