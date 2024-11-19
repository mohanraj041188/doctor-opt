import React from 'react';
import { useParams } from '@remix-run/react';

export default function SearchResult() {
  const { query } = useParams();

  return (
    <div className="search-results">
      <h2>Results for "{query}"</h2>
      {/* Render search result details here */}
    </div>
  );
}
