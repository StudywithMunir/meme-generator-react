# 🎭 Meme Generator

A modern, feature-rich meme generator built with React and Vite. Create, customize, and share memes with an intuitive interface and powerful editing tools.

**Live Demo:** [meme-generator-react-delta.vercel.app](https://meme-generator-react-delta.vercel.app/)
**GitHub Repo:** [github.com/StudywithMunir/meme-generator-react](https://github.com/StudywithMunir/meme-generator-react)

![Meme Generator](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.0.4-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎨 **Core Functionality**
- **Text Overlay**: Add top and bottom text to any meme template
- **Template Gallery**: Browse and select from 100+ popular meme templates
- **Random Generator**: Generate random memes with preset text combinations
- **Download**: Save your creations as PNG images

### 🎯 **Advanced Customization**
- **Font Controls**: Choose from 7 different font families
- **Text Styling**: Customize font size, color, and outline for both top and bottom text
- **Emoji Stickers**: Drag and drop emoji stickers onto your memes
- **Template Selection**: Visual template picker with preview thumbnails

### 🌙 **User Experience**
- **Dark Mode**: Toggle between light and dark themes
- **Meme History**: View and remix your last 5 created memes
- **Social Sharing**: Share directly to Twitter, Facebook, and Reddit
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### ♿ **Accessibility**
- **Keyboard Navigation**: Full keyboard support for all features
- **Screen Reader**: ARIA labels and semantic HTML
- **Focus Management**: Clear visual focus indicators
- **High Contrast**: Optimized for accessibility standards

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/StudywithMunir/meme-generator-react.git
   cd meme-generator-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start creating memes!

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 How to Use

### Creating Your First Meme

1. **Select a Template**
   - Scroll through the template gallery at the top
   - Click on any template to select it
   - Or use the "🎲 New Meme" button for a random template

2. **Add Your Text**
   - Enter your top text in the "Top Text" field
   - Enter your bottom text in the "Bottom Text" field
   - Text updates in real-time on the meme preview

3. **Customize Appearance**
   - **Font Family**: Choose from Impact, Arial, Comic Sans, Times New Roman, Courier New, Montserrat, or Oswald
   - **Font Size**: Adjust from 1.0 to 5.0 (default: 2.2)
   - **Text Color**: Pick any color for your text
   - **Outline Color**: Set the outline/stroke color for better visibility

4. **Add Stickers** (Optional)
   - Drag emoji stickers from the sticker bar onto your meme
   - Position them anywhere on the image
   - Use "🧹 Clear Stickers" to remove all stickers

5. **Download & Share**
   - Click "🪂 Download Meme" to save as PNG
   - Use social media buttons to share directly to Twitter, Facebook, or Reddit

### Advanced Features

#### **Meme History**
- Your last 5 created memes are automatically saved
- Click on any meme in the gallery to remix it
- Perfect for creating variations or series

#### **Dark Mode**
- Toggle the dark/light theme switch in the header
- Automatically adjusts all UI elements and colors
- Saves your preference for future visits

#### **Keyboard Shortcuts**
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and select templates
- **Arrow Keys**: Navigate through template gallery
- **Escape**: Clear focus from current element

## 🛠️ Technical Details

### Built With
- **React 19.1.1** - Modern React with hooks and functional components
- **Vite 7.0.4** - Fast build tool and development server
- **html2canvas** - Convert DOM elements to images for download
- **Imgflip API** - Access to popular meme templates

### Project Structure
```
src/
├── components/
│   ├── Header.jsx          # App header with dark mode toggle
│   ├── Main.jsx            # Main meme editor component
│   ├── MemeGallery.jsx     # History gallery component
│   └── DarkModeToggle.jsx  # Dark mode switch component
├── assets/                 # Static assets
├── App.jsx                 # Main app component
└── main.jsx               # App entry point
```

### Key Features Implementation

#### **Drag & Drop Stickers**
- Uses HTML5 Drag and Drop API
- Calculates precise positioning relative to meme container
- Supports keyboard accessibility with Enter/Space activation

#### **Real-time Text Preview**
- Live updates as you type
- Custom font styling with CSS-in-JS
- Text shadow and outline effects for visibility

#### **Template Management**
- Fetches templates from Imgflip API on component mount
- Caches templates for performance
- Visual selection with highlighted borders

#### **Image Download**
- Uses html2canvas to capture meme as image
- Maintains quality and styling
- Automatic PNG download with descriptive filename

## 🎨 Customization

### Adding New Fonts
Edit the `fontFamilies` array in `Main.jsx`:
```javascript
const fontFamilies = [
  'Impact, sans-serif',
  'Arial, sans-serif',
  // Add your custom fonts here
  'Your Custom Font, sans-serif',
];
```

### Adding New Stickers
Modify the `emojiStickers` array in `Main.jsx`:
```javascript
const emojiStickers = ["😂", "🔥", "😎", "🥲", "👀", "💯", "🤡", "😱", "🎉", "🦄", "🌟", "💪"];
```

### Customizing Colors
Update the CSS variables in `public/styles.css`:
```css
:root {
  --primary-color: #672280;
  --secondary-color: #A626D3;
  --background-light: #f9f9f9;
  --background-dark: #181824;
}
```

## 🐛 Troubleshooting

### Common Issues

**Images not loading**
- Check your internet connection
- Imgflip API might be temporarily unavailable
- Try refreshing the page

**Download not working**
- Ensure you have sufficient disk space
- Check browser permissions for downloads
- Try a different browser if issues persist

**Stickers not appearing**
- Make sure you're dragging from the sticker bar
- Check that the meme area is highlighted when dragging
- Try clicking and dragging instead of just clicking

### Performance Tips

- **Large Templates**: Some templates may take longer to load
- **Multiple Stickers**: Too many stickers can impact performance
- **Browser Cache**: Clear cache if experiencing slow loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and formatting
- Add comments for complex logic
- Test features across different browsers
- Ensure accessibility standards are met

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Imgflip API** for providing meme templates
- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **html2canvas** for image conversion capabilities

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the browser console for error messages

---

## 🔗 Links
- **Live Demo:** [https://meme-generator-react-delta.vercel.app/](https://meme-generator-react-delta.vercel.app/)
- **GitHub Repository:** [https://github.com/StudywithMunir/meme-generator-react](https://github.com/StudywithMunir/meme-generator-react)

**Happy Meme Making! 🎭✨**
