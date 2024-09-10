const { findUserById, login, register } = require("../services/user");

exports.currentUser = async (req, res) => {
    const currentUser = req.user;

    try {
        if (!currentUser) {
            return res.status(400).send({ err: 'User no longer in' });
        }

        const userDoc = await findUserById(currentUser.email);
        console.log(userDoc);

        // Safely remove the password from the user object before sending the response
        if (userDoc) {
            userDoc.password = undefined;
        }

        res.status(200).json(userDoc);
    } catch (err) {
        res.status(400).send({ err: err });
    }
};

exports.userRegister = async (req, res) => {
    try {
        const { fname, lname, password, email } = req.body;

        const existingUser = await findUserById(email);
        if (existingUser) {
            return res.status(400).send({
                err: "User Already Exists",
            });
        }

        const newUser = await register(email, fname, lname, password);
        res.status(201).send(newUser);
    } catch (err) {
        console.log(err);
        res.status(400).send({ err: "Registration failed" });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { password, email } = req.body;
        const payload = await login(email, password);

        res.status(200).send(payload);
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
};
