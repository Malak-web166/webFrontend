import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="book-card glass-card fade-in">
      <div className="book-cover">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} />
        ) : (
          <div className="placeholder-cover">
            <span>{book.title?.[0] || 'B'}</span>
          </div>
        )}
      </div>
      <div className="book-info">
        <span className="book-category">{book.category || 'General'}</span>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-footer">
          <span className="book-year">{book.year}</span>
          <Link to={`/books/${book.id}`} className="btn btn-secondary btn-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
