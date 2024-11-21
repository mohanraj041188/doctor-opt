import { useParams } from '@remix-run/react';

export async function loader( {params} : {params:any} ) {
  const { slug } = params;

  // If needed, map the slug back to the original text
  const originalText = slug.replace(/-/g, " ");

  // Fetch related data based on `originalText`
  return { slug, originalText };
}

export default function SearchResult() {
  const { slug } = useParams();

  return (
    <div className="search-results">
      <h2>Results for {slug.replace(/-/g, " ")}</h2>
      {/* Render search result details here */}
    </div>
  );
}
