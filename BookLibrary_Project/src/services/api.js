import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const MOCK_BOOKS = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, category: 'Classic', description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, category: 'Fiction', description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.' },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949, category: 'Dystopian', description: 'Winston Smith reins in his rebellion against the Party in a world of omnipresent surveillance.' },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, category: 'Romance', description: 'Elizabeth Bennet and Mr. Darcy navigate the complex social hierarchies of early 19th-century England.' },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, category: 'Classic', description: 'The story of Holden Caulfield, a teenager who is kicked out of his prep school.' },
  { id: 6, title: 'Brave New World', author: 'Aldous Huxley', year: 1932, category: 'Dystopian', description: 'A vision of a future society that is genetically engineered and socially stratified.' },
];

// Local Storage Helper with Error Handling
const getLocalBooks = () => {
  try {
    const booksStr = localStorage.getItem('library_books');
    if (!booksStr) {
      localStorage.setItem('library_books', JSON.stringify(MOCK_BOOKS));
      return MOCK_BOOKS;
    }
    const books = JSON.parse(booksStr);
    // Sort by ID descending to show newest first
    return Array.isArray(books) ? books.sort((a, b) => b.id - a.id) : MOCK_BOOKS;
  } catch (e) {
    console.error('Local storage parse error', e);
    return MOCK_BOOKS;
  }
};

const saveLocalBooks = (books) => {
  localStorage.setItem('library_books', JSON.stringify(books));
};

// Books API with Fallback
export const getBooks = async (params) => {
  try {
    const response = await API.get('/books', { params });
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using local storage');
    return getLocalBooks();
  }
};

export const getBook = async (id) => {
  try {
    const response = await API.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, using local storage');
    const books = getLocalBooks();
    const book = books.find(b => b.id.toString() === id.toString());
    if (!book) throw new Error('Book not found');
    return book;
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await API.post('/books', bookData);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, saving to local storage');
    const books = getLocalBooks();
    const newBook = { ...bookData, id: Date.now() };
    books.push(newBook);
    saveLocalBooks(books);
    return newBook;
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await API.put(`/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, updating in local storage');
    const books = getLocalBooks();
    const index = books.findIndex(b => b.id.toString() === id.toString());
    if (index === -1) throw new Error('Book not found');
    books[index] = { ...books[index], ...bookData };
    saveLocalBooks(books);
    return books[index];
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await API.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.warn('API unavailable, deleting from local storage');
    const books = getLocalBooks();
    const filtered = books.filter(b => b.id.toString() !== id.toString());
    saveLocalBooks(filtered);
    return { success: true };
  }
};

export default API;
