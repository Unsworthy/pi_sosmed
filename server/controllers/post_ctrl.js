const post = require("../models/post.js");
const { validationResult } = require("express-validator");

let self = {};

self.index = async (_, res) => {
  const error = post.validationResult();
  if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.array() });
  }

  let data = await post.findAll();
  //   await post.create({
  //     content_text: req.body.content_text,
  //     content_image: req.body.content_image,
  //     user_id: req.user,
  //   })

  return res.status(201).json({
    message: "Post Found successfully!",
    data: data,
  });
};

module.exports = self;
