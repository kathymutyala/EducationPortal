import React from 'react';
import BookDetail from './BookDetail';
import '../styles/BookList.css'; // Import the CSS file for the book list

const BookList = ({ books }) => {
    return (
        <div className="book-list">
            {books.map((book) => (
                <BookDetail key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BookList;
