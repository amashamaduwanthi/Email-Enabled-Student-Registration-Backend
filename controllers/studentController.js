const { body, validationResult } = require("express-validator");
const db = require("../firebaseConfig");
const { sendConfirmationEmail } = require("../services/emailService");
const { v4: uuidv4 } = require("uuid");

// Helper to check duplicate emails
const checkDuplicateEmail = async (email) => {
    const snapshot = await db.collection("students").where("email", "==", email).get();
    return !snapshot.empty;
};

exports.validateStudent = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long")
        .matches(/^[A-Za-z\s]+$/).withMessage("Name must only contain letters and spaces"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address")
        .custom(async (email) => {
            const exists = await checkDuplicateEmail(email);
            if (exists) {
                throw new Error("Email is already registered");
            }
            return true;
        }),

    body("className")
        .trim()
        .notEmpty().withMessage("Class name is required")
        .matches(/^[A-Za-z0-9\s\-]+$/).withMessage("Class name must be alphanumeric (letters, numbers, dashes)"),
];

// Registration handler
exports.registerStudent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return all validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, className } = req.body;

        const registrationId = "REG-" + uuidv4().split("-")[0];
        const studentData = {
            registrationId,
            name,
            email,
            className,
            createdAt: new Date(),
        };

        await db.collection("students").add(studentData);
        await sendConfirmationEmail(studentData);

        res.status(200).json({ message: "Student registered", student: studentData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
