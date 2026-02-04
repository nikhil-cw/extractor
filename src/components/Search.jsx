import React from 'react';

const Search = ({ url, setUrl, fetchData, disabled }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter a trip URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={fetchData} disabled={disabled}>
        Extract
      </button>
    </div>
  );
};

export default Search;
