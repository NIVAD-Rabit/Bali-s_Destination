import React, { useEffect, useState } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MainPage = () => {
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const smallVideo = document.getElementById('smallVideo');
    smallVideo.onended = () => {
      setVideoEnded(true); 
    };

    const setDimensions = () => {
    };

    window.onload = setDimensions;
    window.addEventListener('resize', setDimensions);

    document.body.classList.add('overflow-hidden');

    return () => {
      window.removeEventListener('resize', setDimensions);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="container-fluid">
      <motion.video
        id="mainVideo"
        autoPlay
        muted
        className="d-block mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.75 }}
      >
        <source src="loadS.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      <motion.video
        id="smallVideo"
        autoPlay
        muted
        className="d-block mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <source src="loadS.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {videoEnded && (
        <motion.div
          id="buttonContainer"
          className="button-container text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="text" >Bali's <br /> Destinations</motion.div>
          <div className="button-wrapper">
             <Link to="/PageSlider" className="btn btn-primary start-button">
                Start
             </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MainPage;
