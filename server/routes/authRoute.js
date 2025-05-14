const auth_ctrl = require("../controllers/auth_ctrl"); // Adjust the path as needed
const { body } = require("express-validator");
const { major, user } = require("../models");

module.exports = (app) => {
  const router = app.Router();

  // router.get("/login",
  //     [
  //         body('username').notEmpty().withMessage('username is required').isLength({ min: 3, max:20 }).withMessage('Username must be at least 3 characters long').custom( async (value) => {
  //             let userData = await user.findOne({ where: { firstName: value } })
  //             if (!!userData) {
  //                 throw new Error('First name already exists');
  //             }
  //             return true;
  //         }),

  //         body('password').notEmpty().withMessage('Password is required'),
  //     ],
  //  auth_crtl.login);

  // router.post("/register", auth_ctrl.save)
  router.post(
    "/register",
    [
      body("username")
        .notEmpty()
        .isLength({ min: 4, max: 20 })
        .custom(async (value) => {
          let userData = await user.findOne({
            where: {
              username: value,
            },
          });
          console.log(`userData`, userData);

          if (userData) {
            throw new Error("Username has been registered!");
          }
        }),
      body("email")
        .notEmpty()
        .isEmail()
        .custom(async (value) => {
          let emailData = await user.findOne({
            where: {
              email: value,
            },
          });

          if (emailData) {
            throw new Error("email has been registered!");
          }
        }),
      body("password").notEmpty().isLength({ min: 6, max: 20 }),
      body("firstName").notEmpty(),
      body("lastName").notEmpty(),
      body("classes")
        .notEmpty()
        .custom(async (values) => {
          const classList = ["X", "XI", "XII", "XII"];
          const isValid = classList.includes(values);
          if (!isValid) {
            throw new Error("classes is not registered!");
          }
        }),
      body("major_id")
        .notEmpty()
        .custom(async (values) => {
          let majorData = await major.findByPk(values);
          if (!!majorData == false) {
            throw new Error("major is not registered!");
          }
        }),
      body("gender")
        .notEmpty()
        .custom(async (values) => {
          const genderList = ["M", "F"];
          const isValid = genderList.includes(values);
          if (!isValid) {
            throw new Error("gender is not registered!");
          }
        }),
    ],
    auth_ctrl.create
  );
  //update
  router.put(
    "/:id",
    [
      body("firstName").notEmpty().withMessage("First name is required"),
      body("lastName").notEmpty().withMessage("Last name required"),
      body("classes")
        .notEmpty()
        .withMessage("Classes is required")
        .custom(async (value) => {
          const classList = ["X", "XI", "XII"];
          const isValid = classList.includes(value);
          if (!isValid) {
            throw new Error("Classes must be one of the following: X, XI, XII");
          }
        }),
      body("major_id")
        .notEmpty()
        .custom(async (value) => {
          const majorData = await major.findByPk(value);
          if (!!majorData == false) {
            throw new Error("Major ID doesnt exist");
          }
        }),
      body("gender")
        .notEmpty()
        .withMessage("Gender is required")
        .custom(async (value) => {
          const genderList = ["M", "F"];
          const isValid = genderList.includes(value);
          if (!isValid) {
            throw new Error("Gender must be one of the following: M, F");
          }
        }),
    ],
    (req, res) => {
      // Add your update logic here
      res.send("Update endpoint");
    }
  );

  return router;
};
