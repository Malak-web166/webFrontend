import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container container fade-in">
      <section className="hero">
        <div className="hero-content">
          <span className="badge">New Arrival</span>
          <h1 className="hero-title">
            Your Personal <span>Library</span> Managed Effortlessly
          </h1>
          <p className="hero-subtitle">
            Explore a vast collection of books, track your reading progress, and manage your personal library with our state-of-the-art management system.
          </p>
          <div className="hero-actions">
            <Link to="/books" className="btn btn-primary btn-lg">
              Explore Collection
            </Link>
            <Link to="/books/new" className="btn btn-secondary btn-lg">
              Add New Book
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card c1">
            <span className="icon">📖</span>
            <div className="text">
              <strong>1,240+</strong>
              <span>Books available</span>
            </div>
          </div>
          <div className="floating-card c2">
            <span className="icon">⭐</span>
            <div className="text">
              <strong>4.9/5</strong>
              <span>User Rating</span>
            </div>
          </div>
          <div className="floating-card c3">
            <span className="icon">👥</span>
            <div className="text">
              <strong>500+</strong>
              <span>Active Readers</span>
            </div>
          </div>
          <div className="hero-glow"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;