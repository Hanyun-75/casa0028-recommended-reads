import { useState } from 'react'
import './tw-styles.css'
import TitleBar from './components/TitleBar'
import MapDisplay from './components/MapDisplay'
import PlaqueModal from './components/PlaqueModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="mx-auto max-w-screen-xl bg-gray-50 min-h-screen">
      <TitleBar />
      <MapDisplay />

      <div className="p-4">
        <button
          className="mr-2 rounded bg-blue-600 px-4 py-2 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Open modal
        </button>

        <button
          className="rounded bg-gray-600 px-4 py-2 text-white"
          onClick={() => setIsModalOpen(false)}
        >
          Close modal
        </button>
      </div>

      {isModalOpen ? <PlaqueModal /> : null}
    </div>
  )
}

export default App