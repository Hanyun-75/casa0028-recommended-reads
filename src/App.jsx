import { useState } from 'react'
import './tw-styles.css'

import TitleBar from './components/TitleBar'
import MapDisplay from './components/MapDisplay'
import PlaqueModal from './components/PlaqueModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlaque, setSelectedPlaque] = useState(null);

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <div className="mx-auto max-w-screen-xl min-h-screen bg-gray-50">
      {/* Title */}
      <TitleBar subtitle="Week 04: no error pleaseeeeeeee" />

      {/* Map */}
      <MapDisplay
  longitude={-0.137310}
  latitude={51.521699}
  selectedPlaque={selectedPlaque}
  setSelectedPlaque={setSelectedPlaque}
  setIsModalOpen={setIsModalOpen}
/>
      {/* Buttons */}
      <div className="p-4 flex gap-2">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={openModal}
        >
          Open modal
        </button>

        <button
          className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
          onClick={closeModal}
        >
          Close modal
        </button>
      </div>

      {/* Modal (conditional rendering) */}
      {isModalOpen ? (
  <PlaqueModal
    title={selectedPlaque?.properties?.lead_subject_name ?? "My Reading List"}
    description="Books fetched from OpenLibrary."
    onClose={closeModal}
    selectedPlaque={selectedPlaque}
  />
) : null}

    </div>
  )
}

export default App
