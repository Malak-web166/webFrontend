import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBook, deleteBook } from '../services/api';
import { Button, Loader } from '../components/ui';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBook(id);
        setBook(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Book not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        setDeleting(true);
        await deleteBook(id);
        navigate('/books');
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete book.');
      } finally {
        setDeleting(false);
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="container"><div className="error-message glass-card">{error}</div></div>;
  if (!book) return null;

  return (
    <div className="container fade-in">
      <div className="book-detail-wrapper glass-card">
        <div className="detail-layout">
          <div className="detail-cover">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} />
            ) : (
              <div className="placeholder-cover large">
                <span>{book.title?.[0]}</span>
              </div>
            )}
          </div>
          
          <div className="detail-content">
            <header className="detail-header">
              <span className="detail-category">{book.category || 'General'}</span>
              <h1 className="detail-title">{book.title}</h1>
              <p className="detail-author">by <strong>{book.author}</strong></p>
            </header>

            <div className="detail-meta grid">
              <div className="meta-item">
                <span className="meta-label">Published</span>
                <span className="meta-value">{book.year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">ID</span>
                <span className="meta-value">#{book.id}</span>
              </div>
            </div>

            <div className="detail-description">
              <h3>Description</h3>
              <p>{book.description || 'No description available for this book.'}</p>
            </div>

            <div className="detail-actions">
              <Link to={`/books/${id}/edit`} className="btn btn-primary">
                Edit Book
              </Link>
              <Button 
                variant="danger" 
                onClick={handleDelete} 
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete Book'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
