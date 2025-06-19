const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, email, password: hashedPassword });
		await user.save();
		res.status(201).send('User created');
	} catch (err) {
		res.status(400).send('Signup failed');
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(404).send('User not found');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).send('Invalid credentials');

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		res.json({ token, usename:user.username });
	} catch (err) {
		res.status(500).send('Login failed');
	}
});

module.exports = router;
