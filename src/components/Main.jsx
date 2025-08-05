import { useEffect, useState, useRef } from "react"
import html2canvas from "html2canvas"

const randomTexts = [
  ["Me coding", "At 3AM"],
  ["404", "Brain Not Found"],
  ["Trust me", "I'm an engineer"],
  ["Just one bug", "They said..."]
]

const emojiStickers = ["😂", "🔥", "😎", "🥲", "👀", "💯", "🤡", "😱", "🎉", "🦄"];

export default function Main({ setHistory, remixMeme, setRemixMeme }) {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imgURL: "http://i.imgflip.com/1bij.jpg",
  })

  const [allMemes, setAllMemes] = useState([])
  const memeRef = useRef(null)
  const [stickers, setStickers] = useState([]); // {emoji, x, y}
  const [dragging, setDragging] = useState(null); // {emoji, offsetX, offsetY}
  const [font, setFont] = useState({
    family: 'Impact, sans-serif',
    size: 2.2,
    color: '#fff',
    outline: '#000',
    weight: 'bold',
  });
  const [bottomFont, setBottomFont] = useState({
    family: 'Impact, sans-serif',
    size: 2.2,
    color: '#fff',
    outline: '#000',
    weight: 'bold',
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
      .catch(error => console.log("Error occurred: ", error))
  }, [])

  useEffect(() => {
    if (remixMeme) {
      setMeme({
        topText: remixMeme.topText,
        bottomText: remixMeme.bottomText,
        imgURL: remixMeme.imgURL,
      });
      setStickers([]);
      setFont({
        family: 'Impact, sans-serif',
        size: 2.2,
        color: '#fff',
        outline: '#000',
        weight: 'bold',
      });
      setBottomFont({
        family: 'Impact, sans-serif',
        size: 2.2,
        color: '#fff',
        outline: '#000',
        weight: 'bold',
      });
      setSelectedTemplate(remixMeme.imgURL);
      setRemixMeme(null);
    }
  }, [remixMeme]);

  function handleChange(e) {
    const { name, value } = e.target
    setMeme(prev => ({ ...prev, [name]: value }))
  }

  function getRandomText() {
    return randomTexts[Math.floor(Math.random() * randomTexts.length)]
  }

  function getMemeImg() {
    const random = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[random].url
    const [top, bottom] = getRandomText()

    setMeme(prev => {
      const newMeme = { ...prev, imgURL: url, topText: top, bottomText: bottom }
      setHistory(prevHistory => [newMeme, ...prevHistory.slice(0, 4)]) // limit to 5
      return newMeme
    })
  }

  async function downloadMeme() {
    const canvas = await html2canvas(memeRef.current)
    const link = document.createElement('a')
    link.download = 'meme.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  function handleDrop(e) {
    if (dragging && memeRef.current) {
      const rect = memeRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStickers(prev => [...prev, { emoji: dragging.emoji, x, y }]);
      setDragging(null);
    }
  }

  function handleDragStart(emoji, e) {
    setDragging({ emoji, offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.offsetY });
  }

  function handleMemeDragOver(e) {
    if (dragging) e.preventDefault();
  }

  function clearStickers() {
    setStickers([]);
  }

  function selectTemplate(url) {
    setMeme(prev => ({ ...prev, imgURL: url }));
    setSelectedTemplate(url);
  }

  function shareTo(platform) {
    const url = encodeURIComponent(meme.imgURL);
    const top = encodeURIComponent(meme.topText);
    const bottom = encodeURIComponent(meme.bottomText);
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${top}%20${bottom}&url=${url}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'reddit') {
      shareUrl = `https://www.reddit.com/submit?url=${url}&title=${top}%20${bottom}`;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }

  // Font options
  const fontFamilies = [
    'Impact, sans-serif',
    'Arial, sans-serif',
    'Comic Sans MS, cursive, sans-serif',
    'Times New Roman, serif',
    'Courier New, monospace',
    'Montserrat, sans-serif',
    'Oswald, sans-serif',
  ];

  return (
    <main>
      <form className="form" autoComplete="off">
        <div className="form-group">
          <label htmlFor="topText">Top Text</label>
          <input id="topText" name="topText" type="text" onChange={handleChange} value={meme.topText} aria-label="Top Text" />
        </div>
        <div className="form-group">
          <label htmlFor="bottomText">Bottom Text</label>
          <input id="bottomText" name="bottomText" type="text" onChange={handleChange} value={meme.bottomText} aria-label="Bottom Text" />
        </div>
        <div className="button-row">
          <button type="button" onClick={getMemeImg} aria-label="New Meme">🎲 New Meme</button>
          <button type="button" onClick={downloadMeme} aria-label="Download Meme">🪂 Download Meme</button>
          <button type="button" onClick={clearStickers} aria-label="Clear Stickers">🧹 Clear Stickers</button>
        </div>
        <div className="form-group">
          <label>Top Font</label>
          <div className="form-row">
            <select value={font.family} onChange={e => setFont(f => ({...f, family: e.target.value}))} aria-label="Top Font">
              {fontFamilies.map(fam => <option key={fam} value={fam}>{fam.split(',')[0]}</option>)}
            </select>
            <label>Top Size
              <input type="number" min="1" max="5" step="0.1" value={font.size} onChange={e => setFont(f => ({...f, size: +e.target.value}))} aria-label="Top Font Size" />
            </label>
            <label>Top Color
              <input type="color" value={font.color} onChange={e => setFont(f => ({...f, color: e.target.value}))} aria-label="Top Font Color" />
            </label>
            <label>Top Outline
              <input type="color" value={font.outline} onChange={e => setFont(f => ({...f, outline: e.target.value}))} aria-label="Top Font Outline" />
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Bottom Font</label>
          <div className="form-row">
            <select value={bottomFont.family} onChange={e => setBottomFont(f => ({...f, family: e.target.value}))} aria-label="Bottom Font">
              {fontFamilies.map(fam => <option key={fam} value={fam}>{fam.split(',')[0]}</option>)}
            </select>
            <label>Bottom Size
              <input type="number" min="1" max="5" step="0.1" value={bottomFont.size} onChange={e => setBottomFont(f => ({...f, size: +e.target.value}))} aria-label="Bottom Font Size" />
            </label>
            <label>Bottom Color
              <input type="color" value={bottomFont.color} onChange={e => setBottomFont(f => ({...f, color: e.target.value}))} aria-label="Bottom Font Color" />
            </label>
            <label>Bottom Outline
              <input type="color" value={bottomFont.outline} onChange={e => setBottomFont(f => ({...f, outline: e.target.value}))} aria-label="Bottom Font Outline" />
            </label>
          </div>
        </div>
      </form>
      <div className="template-gallery-bar">
        <div className="template-gallery-scroll">
          {allMemes.slice(0, 20).map((memeObj, i) => (
            <img
              key={memeObj.id}
              src={memeObj.url}
              alt={memeObj.name}
              className={selectedTemplate === memeObj.url ? 'template-selected' : ''}
              onClick={() => selectTemplate(memeObj.url)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && selectTemplate(memeObj.url)}
              role="button"
              tabIndex={0}
              aria-label={`Select template: ${memeObj.name}`}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '8px',
                margin: '0 0.5rem',
                border: selectedTemplate === memeObj.url ? '3px solid #A626D3' : '2px solid #eee',
                boxShadow: selectedTemplate === memeObj.url ? '0 2px 12px #A626D3aa' : '0 1px 4px #0002',
                cursor: 'pointer',
                transition: 'border 0.2s, box-shadow 0.2s',
              }}
              title={memeObj.name}
            />
          ))}
        </div>
        <div style={{textAlign: 'center', fontSize: '0.95rem', color: '#888', marginTop: '0.3rem'}}>Pick a template</div>
      </div>
      <div
        className="meme"
        ref={memeRef}
        onDrop={handleDrop}
        onDragOver={handleMemeDragOver}
        style={{ position: 'relative' }}
      >
        <img src={meme.imgURL} alt="meme" crossOrigin="anonymous" />
        <span
          className="top"
          style={{
            fontFamily: font.family,
            fontSize: font.size + 'rem',
            color: font.color,
            fontWeight: font.weight,
            WebkitTextStroke: `2px ${font.outline}`,
            textShadow: `2px 2px 8px ${font.outline}, 0 0 2px #A626D3`,
          }}
        >
          {meme.topText}
        </span>
        <span
          className="bottom"
          style={{
            fontFamily: bottomFont.family,
            fontSize: bottomFont.size + 'rem',
            color: bottomFont.color,
            fontWeight: bottomFont.weight,
            WebkitTextStroke: `2px ${bottomFont.outline}`,
            textShadow: `2px 2px 8px ${bottomFont.outline}, 0 0 2px #A626D3`,
          }}
        >
          {meme.bottomText}
        </span>
        {stickers.map((s, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              fontSize: '2.5rem',
              pointerEvents: 'none',
              userSelect: 'none',
              filter: 'drop-shadow(1px 1px 2px #0008)'
            }}
          >
            {s.emoji}
          </span>
        ))}
      </div>
      <div className="share-bar">
        <button className="share-btn twitter" onClick={() => shareTo('twitter')} title="Share on Twitter" aria-label="Share on Twitter">🐦 Twitter</button>
        <button className="share-btn facebook" onClick={() => shareTo('facebook')} title="Share on Facebook" aria-label="Share on Facebook">📘 Facebook</button>
        <button className="share-btn reddit" onClick={() => shareTo('reddit')} title="Share on Reddit" aria-label="Share on Reddit">👽 Reddit</button>
      </div>
      <div className="sticker-bar" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1.5rem 0' }}>
        {emojiStickers.map((emoji, i) => (
          <span
            key={i}
            draggable
            onDragStart={e => handleDragStart(emoji, e)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleDragStart(emoji, e)}
            role="button"
            tabIndex={0}
            aria-label={`Sticker: ${emoji}`}
            style={{ fontSize: '2.2rem', cursor: 'grab', userSelect: 'none' }}
            title="Drag onto meme"
          >
            {emoji}
          </span>
        ))}
      </div>
    </main>
  )
}
