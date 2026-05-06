import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getBook, createBook, updateBook } from '../services/api';
import { Button, Input, Loader } from '../components/ui';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    category: '',
    description: '',
    coverImage: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const fetchBook = async () => {
        try {
          setFetching(true);
          const data = await getBook(id);
          setFormData(data);
        } catch (err) {
          console.error('Fetch error:', err);
          setError('Failed to load book data. Please try again.');
        } finally {
          setFetching(false);
        }
      };
      fetchBook();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEdit) {
        await updateBook(id, formData);
      } else {
        await createBook(formData);
      }
      navigate('/books');
    } catch (err) {
      console.error('Submit error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Loader />;

  return (
    <div className="container fade-in">
      <div className="form-wrapper glass-card">
        <header className="form-header">
          <h1 className="form-title">{isEdit ? 'Edit' : 'Add New'} <span>Book</span></h1>
          <p className="form-subtitle">
            {isEdit ? 'Update the book information below.' : 'Fill in the details to add a new book to the collection.'}
          </p>
        </header>

        {error && (
          <div className="error-message glass-card" style={{ marginBottom: '2rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-grid">
            <Input
              label="Book Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. The Great Gatsby"
              required
            />
            <Input
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. F. Scott Fitzgerald"
              required
            />
            <Input
              label="Publish Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g. 1925"
              required
            />
            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Classic, Fiction, Science"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              className="form-input"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-input"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a brief summary of the book..."
            ></textarea>
          </div>

          <div className="form-actions">
            <Link to="/books" className="btn btn-secondary">
              Cancel
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEdit ? 'Update Book' : 'Add Book'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
