import React from 'react'
import trollFace from '../assets/troll-face.png';
import DarkModeToggle from './DarkModeToggle';

export default function Header({ darkMode, setDarkMode }) {
    return (
        <header className='header'>
            <img src={trollFace} alt="trollFace" />
            <h1>Meme Generator</h1>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </header>
    );
}