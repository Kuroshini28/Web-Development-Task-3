const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store book objects
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

let nextId = 4; // To simulate unique IDs

// Endpoint 1: GET /books - Returns all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Endpoint 2: GET /books/:id - Returns a single book by ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Endpoint 3: POST /books - Adds a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: nextId++,
        title: req.body.title,
        author: req.body.author
    };

    if (!newBook.title || !newBook.author) {
        return res.status(400).json({ message: 'Title and author are required.' });
    }

    books.push(newBook);
    res.status(201).json(newBook);
});

// Endpoint 4: PUT /books/:id - Updates an existing book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books[bookIndex].title = req.body.title || books[bookIndex].title;
        books[bookIndex].author = req.body.author || books[bookIndex].author;
        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Endpoint 5: DELETE /books/:id - Deletes a book
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const initialLength = books.length;
    books = books.filter(b => b.id !== bookId);

    if (books.length < initialLength) {
        res.status(204).send(); // No content to send back
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});