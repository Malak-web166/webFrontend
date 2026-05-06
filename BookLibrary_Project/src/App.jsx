import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import BookDetail from './pages/BookDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/books/:id/edit" element={<BookForm />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Book Library Manager. Built with ❤️</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;