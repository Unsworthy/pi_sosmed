
const auth_crtl = require('../controllers/auth_ctrl'); // Adjust the path as needed
const express = require('express');
const { body } = require('express-validator');
const {major,user} = require('../models'); // Adjust the path as needed

module.exports = (app) => {
    const router = express.Router();

    // router.post("/register", auth_ctrl.save)
    router.post("/register", [
                body('username').notEmpty().withMessage('username is required').isLength({ min: 3, max:20 }).withMessage('Username must be at least 3 characters long').custom( async (value) => {
                    let userData = await user.findOne({ where: { firstName: value } })
                    if (!!userData) {
                        throw new Error('First name already exists');
                    }
                    return true;
                }),

                body('email').notEmpty().withMessage('Email is required').custom( async (value) => {
                    let userData = await user.findOne({ where: { email: value } })
                    if (!!userData) {
                        throw new Error('Email already exists');
                    }
                    return true;
                }),
                body('password').notEmpty().withMessage('Password is required'),
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
            ],auth_crtl.create);
        //update
            router.put("/:id",[
                body('firstName').notEmpty().withMessage('First name is required'),
                body('lastName').notEmpty().withMessage('Last name required'),
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
    ], 
    (req, res) => {
        // Add your update logic here
        res.send('Update endpoint');
    });


    return router
}