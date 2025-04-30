const { validationResult } = require('express-validator');
const { student,  } = require('../models');
let self = {};

self.index = async (_, res) => {

    const data = await student.findAll()

    res.status(200).json({ message: "student has been founded",
        data: data
     });
};

self.detail = async (req, res) => {
    try {
        const { id } = req.params;
        const studentData = await student.findByPk(id);
        if (!studentData) return res.status(404).json({ message: "Student not found", data:data });
        res.status(200).json(studentData);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

self.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } 

    try {
        const { firstName, lastName, classes, major_id, gender } = req.body;

        const newStudent = await student.create({ firstName:firstName, lastName:lastName, classes:classes, major_id:major_id, gender:gender });

        res.status(201).json({
            message: "Student created successfully!",
            data: newStudent,
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

self.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, classes, major_id, gender } = req.body;

        // Fetch the existing student data
        const existingStudent = await student.findByPk(id);
        if (!existingStudent) return res.status(404).json({ message: "Student not found" });

        // Update the student data
        const updated = await student.update(
            { firstName:firstName, lastName:lastName, classes:classes, major_id:major_id, gender:gender },
            { where: { id } }
        );

        if (!updated[0]) return res.status(404).json({ message: "Student not found" });

        // Fetch the updated student data
        const updatedStudent = await student.findByPk(id);

        res.status(200).json({
            message: "Student updated successfully!",
            before: existingStudent,
            after: updatedStudent,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

self.destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await student.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ message: "Student not found" });

        res.status(200).json({ message: "Student deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = self;