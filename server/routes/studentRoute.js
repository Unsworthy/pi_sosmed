const express = require("express");
const student = require("../models/student");
const student_ctrl = require("../controllers/student_ctrl");
const { body } = require("express-validator");
const {major} = require("../models");
module.exports = (app) => {
    const router = app.Router();

    router.get("/", student_ctrl.index);
//get by id
    router.get("/:id", student_ctrl.detail);
// //create
    router.post("/", [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('classes').notEmpty().withMessage('Classes is required').custom( async (value) => {
       const classList = [ 'X', 'XI', 'XII', ];
       const isValid = classList.includes(value);
       if (!isValid) {
           throw new Error('Classes must be one of the following: X, XI, XII');
       }
        }),
        body('major_id').notEmpty().custom(async (value) => {
            const majorData = await major.findByPk(value);
            if (!!majorData == false) {
                throw new Error('Major ID does not exist');
            }


        }),
        body('gender').notEmpty().withMessage('Gender is required').custom( async (value) => {
            const genderList = [ 'M', 'F', ];
            const isValid = genderList.includes(value);
            if (!isValid) {
                throw new Error('Gender must be one of the following: M, F');
            }
             })
    ],student_ctrl.create);
//update
    router.put("/:id",[
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('classes').notEmpty().withMessage('Classes is required').custom( async (value) => {
       const classList = [ 'X', 'XI', 'XII', ];
       const isValid = classList.includes(value);
       if (!isValid) {
           throw new Error('Classes must be one of the following: X, XI, XII');
       }
        }),
        body('major_id').notEmpty().custom(async (value) => {
            const majorData = await major.findByPk(value);
            if (!!majorData == false) {
                throw new Error('Major ID doesnt exist');
            }


        }),
        body('gender').notEmpty().withMessage('Gender is required').custom( async (value) => {
            const genderList = [ 'M', 'F', ];
            const isValid = genderList.includes(value);
            if (!isValid) {
                throw new Error('Gender must be one of the following: M, F');
            }
             })
    ], student_ctrl.update);
//hapus
    router.delete("/:id", student_ctrl.destroy);

    return router;
}