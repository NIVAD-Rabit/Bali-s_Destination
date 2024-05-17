import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import PageSlider from './PageSlider';
import AboutUs from './AboutUs';
import WebCam from './WebCam';
import Explore from './Explore';
import { AnimatePresence } from 'framer-motion';
import BgSound from './BgSound.mp3';

function AudioPlayer() {
  const audioRef = React.useRef(null);
  const [muted, setMuted] = React.useState(true);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setMuted(audioRef.current.muted);
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '2vh', right: '2vw', zIndex: '9999' }}>
      <audio ref={audioRef} src={BgSound} loop muted={muted} />
      <button 
        onClick={toggleMute} 
        style={{ 
          backgroundImage: `url(${muted ? 'muted.png' : 'unmuted.png'})`, 
          backgroundSize: 'cover', 
          width: '50px', 
          height: '50px', 
          border: 'none', 
          cursor: 'pointer', 
          borderRadius: '50%',
          backgroundColor: 'transparent',
        }}
      ></button>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Update AnimatePresence with mode='wait' */}
      <AnimatePresence exitBeforeEnter={false} mode='wait'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/PageSlider" element={<PageSlider />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/WebCam" element={<WebCam />} />
          <Route path="/Explore" element={<Explore />} />
        </Routes>
      </AnimatePresence>
      <AudioPlayer />
    </Router>
  );
}

export default App;
