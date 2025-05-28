const { validationResult } = require("express-validator");
const { user, student, student_user, roles } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let self = {};

self.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }


  const options = {
    expiresIn: "24h",
  };
  const userData = await user.findOne({
    where: {
      username: req.body.username,
    },
    include: [
      {model: roles},
      {model: student} 
    ],
    attributes: ["id", "username", "email"],
  });
 

  const token = jwt.sign(
    {
      data: {
        id: userData?.id,
        username: userData?.username,
        email: userData?.email,
        roles: userData?.roles[0]?.role_name,
        student: userData?.roles[0]
      }
    },
    process.env.JWT_SECRET || "adios", // replace with your secret
    options
  );
  console.log(token)
  res.status(201).json({
    message: "Student created successfully!",
    data: token,
  });
};

self.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      classes,
      major_id,
      gender,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const userData = await user.create({
      username: username,
      email: email,
      password: passwordHash,
    });

    const studentData = await student.create({
      firstName: firstName,
      lastName: lastName,
      classes: classes,
      major_id: major_id,
      gender: gender,
    });

    await student_user.create({
      user_id: userData.id,
      student_id: studentData.id,
    });

    const roleUserRegister = await role.findOne({
      where: {
        role_name: "student",
      },
      attributes: ["id"],
    });
    await role_user.create({
      user_id: userData.id,
      role_id: roleUserRegister.id,
    });

    //  const newStudent = await student.create({ firstName:firstName, lastName:lastName, classes:classes, major_id:major_id, gender:gender });

    res.status(201).json({
      message: "Student created successfully!",
      data: userData,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 
module.exports = self;
