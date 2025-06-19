const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors()); // Use the cors middleware
app.use('/api/auth', authRoutes);

const bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	genre: String,
	description: String,
	price: Number,
	image: String,
});

const Book = mongoose.model('Book', bookSchema);

// Define API endpoint for fetching all books
app.get('/api/books', async (req, res) => {
	try {
		// Fetch all books from the database
		const allBooks = await Book.find();

		// Send the entire books array as JSON response
		res.json(allBooks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});