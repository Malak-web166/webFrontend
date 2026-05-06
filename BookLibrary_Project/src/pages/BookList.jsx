import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';
import { Loader } from '../components/ui';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
        setError(null);
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);


  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Browse <span>Collection</span></h1>
          <p className="page-description">Discover your next great read from our curated library.</p>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search by title or author..." 
            className="form-input search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error-message glass-card">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="results-count">
            Showing {filteredBooks.length} books
          </div>
          <div className="grid">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          {filteredBooks.length === 0 && (
            <div className="no-results glass-card">
              <h3>No books found</h3>
              <p>Try adjusting your search terms.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookList;
