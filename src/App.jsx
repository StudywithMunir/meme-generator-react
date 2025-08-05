import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import MemeGallery from './components/MemeGallery'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [history, setHistory] = useState([])
  const [remixMeme, setRemixMeme] = useState(null)

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Main setHistory={setHistory} remixMeme={remixMeme} setRemixMeme={setRemixMeme} />
      <MemeGallery history={history} setRemixMeme={setRemixMeme} />
    </div>
  )
}
