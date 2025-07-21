const db = require("../firebaseConfig");
const { sendConfirmationEmail } = require("../../student-registration-backend/emailService");
const { v4: uuidv4 } = require("uuid");

exports.registerStudent = async (req, res) => {
    try {
        const { name, email, className } = req.body;
        if (!name || !email || !className) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const registrationId = "REG-" + uuidv4().split("-")[0];

        const studentData = { registrationId, name, email, className, createdAt: new Date() };
        await db.collection("students").add(studentData);

        await sendConfirmationEmail(studentData);

        res.status(200).json({ message: "Student registered", student: studentData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
