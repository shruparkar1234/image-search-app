import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState({});
  const [topSearches, setTopSearches] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHistoryMenu, setShowHistoryMenu] = useState(false);
  const navigate = useNavigate();

  // Move checkAuth definition before useEffect
  const checkAuth = useCallback(async () => {
    try {
      await api.get('/api/me');
    } catch (err) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      await loadTopSearches();
      await loadHistory();
    };
    init();
  }, [checkAuth]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showHistoryMenu && !event.target.closest('.clear-history-dropdown')) {
        setShowHistoryMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHistoryMenu]);

  const loadTopSearches = async () => {
    try {
      const res = await api.get('/api/top-searches');
      setTopSearches(res.data.searches || []);
    } catch (err) {
      console.error('Failed to load top searches:', err);
    }
  };

  const loadHistory = async () => {
    try {
      const res = await api.get('/api/history');
      setHistory(res.data.history || []);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const res = await api.post('/api/search', { term: searchTerm.trim() });
      setResults(res.data.results || []);
      setSelected({});
      await loadTopSearches();
      await loadHistory();
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  // Add logout handler
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await api.get('/auth/logout');
      // Clear any local storage/state if needed
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear your search history?')) {
      return;
    }
    
    try {
      await api.delete('/api/history');
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
      alert('Failed to clear history. Please try again.');
    }
  };

  const handleClearHistoryByTime = async (timeRange, label) => {
    setShowHistoryMenu(false);
    
    if (!window.confirm(`Are you sure you want to delete searches from ${label}?`)) {
      return;
    }
    
    try {
      await api.delete(`/api/history?timeRange=${timeRange}`);
      await loadHistory();
    } catch (err) {
      console.error('Failed to clear history:', err);
      alert('Failed to clear history. Please try again.');
    }
  };

  const handleClearTopSearches = async () => {
    if (!window.confirm('Are you sure you want to clear all top searches? This will delete all search records.')) {
      return;
    }
    
    try {
      await api.delete('/api/top-searches');
      setTopSearches([]);
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear top searches:', err);
      alert('Failed to clear top searches. Please try again.');
    }
  };

  return (
    <div className="search-page">
      <header className="header">
        <h1>Image Search</h1>
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </header>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for images..."
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="top-searches">
        <div className="section-header">
          <h3>Top Searches</h3>
          {topSearches.length > 0 && (
            <button onClick={handleClearTopSearches} className="clear-button">
              Clear All
            </button>
          )}
        </div>
        <div className="top-searches-list">
          {topSearches.length > 0 ? (
            topSearches.map(search => (
              <button
                key={search._id}
                onClick={() => setSearchTerm(search.term)}
                className="top-search-item"
              >
                {search.term} ({search.count})
              </button>
            ))
          ) : (
            <p className="empty-message">No top searches yet</p>
          )}
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="selected-count">
          Selected: {selectedCount} images
        </div>
      )}

      <div className="results-grid">
        {results.map(image => (
          <div key={image.id} className="image-card">
            <label className="image-checkbox">
              <input
                type="checkbox"
                checked={!!selected[image.id]}
                onChange={() => toggleSelect(image.id)}
              />
            </label>
            <img
              src={image.urls.small}
              alt={image.alt_description || 'search result'}
              className="image-result"
            />
          </div>
        ))}
      </div>

      <aside className="search-history">
        <div className="section-header">
          <h3>Search History</h3>
          {history.length > 0 && (
            <div className="clear-history-dropdown">
              <button 
                onClick={() => setShowHistoryMenu(!showHistoryMenu)} 
                className="clear-button"
              >
                Clear History ▾
              </button>
              {showHistoryMenu && (
                <div className="dropdown-menu">
                  <button 
                    onClick={() => handleClearHistoryByTime('1hour', 'last hour')}
                    className="dropdown-item"
                  >
                    🕐 Last Hour
                  </button>
                  <button 
                    onClick={() => handleClearHistoryByTime('24hours', 'last 24 hours')}
                    className="dropdown-item"
                  >
                    📅 Last 24 Hours
                  </button>
                  <button 
                    onClick={() => handleClearHistoryByTime('7days', 'last 7 days')}
                    className="dropdown-item"
                  >
                    📆 Last 7 Days
                  </button>
                  <button 
                    onClick={() => handleClearHistoryByTime('all', 'all time')}
                    className="dropdown-item danger"
                  >
                    🗑️ All Time
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="history-list">
          {history.length > 0 ? (
            history.map(item => (
              <div key={item._id} className="history-item">
                <span>{item.term}</span>
                <small>{new Date(item.timestamp).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p className="empty-message">No search history yet</p>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SearchPage;