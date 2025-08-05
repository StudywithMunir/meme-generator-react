export default function MemeGallery({ history, setRemixMeme }) {
  return (
    <section className="gallery">
      <h3>🖼 Meme Gallery</h3>
      <div className="gallery-grid">
        {history.map((m, i) => (
          <div
            className="gallery-item"
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`Remix meme: ${m.topText} | ${m.bottomText}`}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setRemixMeme(m)}
            onClick={() => setRemixMeme(m)}
            title="Remix this meme"
            style={{ cursor: 'pointer' }}
          >
            <img src={m.imgURL} alt="meme" />
            <div className="overlay top">{m.topText}</div>
            <div className="overlay bottom">{m.bottomText}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
