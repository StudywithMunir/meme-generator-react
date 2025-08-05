export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="dark-toggle">
      <label className="switch" aria-label="Toggle dark mode">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(prev => !prev)}
        />
        <span className="slider" />
      </label>
    </div>
  )
}
