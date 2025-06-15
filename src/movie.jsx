import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './style.css';

const Movie = () => {
  const [search, setSearch] = useState('Avenger');
  const [data, setData] = useState([]);

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=e3b303ba`
      );
      const result = await response.json();
      if (result.Response === 'True') {
        setData(result.Search);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(search);
  }, []);

  // Open YouTube trailer in a new tab
  const handlePosterClick = (title) => {
    const query = encodeURIComponent(`${title} trailer`);
    const url = `https://www.youtube.com/results?search_query=${query}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div className='header'>
        <div className='logo'>
          <h3>Movie Hub</h3>
        </div>
        <div className='search'>
          <input
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => fetchMovies(search)}>
            <FaSearch />
          </button>
        </div>
      </div>

      <div className='movie'>
        <h3>Movies</h3>
        <div className='container'>
          {data.length > 0 ? (
            data.map((curElm, index) => (
              <div className='box' key={index}>
                <div className='img_box'>
                  {curElm.Poster !== 'N/A' ? (
                    <img
                      src={curElm.Poster}
                      alt={curElm.Title}
                      onClick={() => handlePosterClick(curElm.Title)}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <div className='no-image'>No Image</div>
                  )}
                </div>
                <div className='detail'>
                  <h3>{curElm.Title}</h3>
                  <h4>Release date: {curElm.Year}</h4>
                </div>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Movie;
