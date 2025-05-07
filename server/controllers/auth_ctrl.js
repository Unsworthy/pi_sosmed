
const { validationResult } = require ('express-validator')

let self = {};


self.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } 

    try {
        const {username,email,password, firstName, lastName, classes, major_id, gender } = req.body;

        // const newStudent = await student.create({ firstName:firstName, lastName:lastName, classes:classes, major_id:major_id, gender:gender });

        res.status(201).json({
            message: "Student created successfully!",
            data: newStudent,
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



module.exports = self;