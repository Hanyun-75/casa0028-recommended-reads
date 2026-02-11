import { useState, useEffect } from 'react';

function PlaqueModal({ title, description, onClose, selectedPlaque }) {
  console.log("PlaqueModal props:", { title, description, selectedPlaque });
  const [books, setBooks] = useState([]);
  // then to update the state
 
  async function fetchBooks() {
    const author = props.selectedPlaque.properties.lead_subject_name;

    try {
        const response = await fetch(`https://openlibrary.org/search.json?author=${encodeURIComponent(author)}&limit=10`);
        const data = await response.json();
        console.log("Fetched books data:", data);
        setBooks(data.docs);
    } catch (error) {
        console.error("Error fetching books data:", error);
    }
}
  useEffect(() => {
  fetchBooks();
}, []);

  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <h2
            id="modalTitle"
            className="text-xl font-bold text-gray-900 sm:text-2xl"
          >
            {title}
          </h2>

          <button
            type="button"
            className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <p className="text-pretty text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default PlaqueModal;
