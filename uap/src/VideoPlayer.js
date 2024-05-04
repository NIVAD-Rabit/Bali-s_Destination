import React, { useEffect } from 'react';
import './VideoPlayer.css'; // Import CSS file

const VideoPlayer = () => {
  const playAudio = () => {
    const audio = document.getElementById('StartAudio');
    const audioBg = document.getElementById('bgAudio');
    audio.play();
    audioBg.play();
    audio.onended = () => {
      audio.pause();
    };
  };

  useEffect(() => {
    const smallVideo = document.getElementById('smallVideo');
    smallVideo.onended = () => {
      document.getElementById('buttonContainer').classList.add('show');
    };

    const setDimensions = () => {
      const windowWidth = window.innerWidth;
      let equalBox, windowHeight;
      if (windowWidth < 768) {
        windowHeight = window.innerWidth * 0.85;
        equalBox = document.getElementById('smallVideo');
        equalBox.style.width = '85%';
        equalBox.style.height = windowHeight + 'px';

        const buttonContainer = document.getElementById('buttonContainer');
        buttonContainer.style.width = '85%';
        buttonContainer.style.height = windowHeight + 'px';
      } else {
        equalBox = document.getElementById('smallVideo');
        windowHeight = window.innerHeight * 0.85;
        equalBox.style.width = windowHeight + 'px';

        const buttonContainer = document.getElementById('buttonContainer');
        buttonContainer.style.width = windowHeight + 'px';
      }
    };

    window.onload = setDimensions;
    window.addEventListener('resize', setDimensions);

    return () => {
      window.removeEventListener('resize', setDimensions);
    };
  }, []);

  return (
    <>
      <audio id="bgAudio" autoPlay loop>
        <source src="YSnow.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <audio id="StartAudio" autoPlay>
        <source src="StartS.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <video id="mainVideo" autoPlay muted>
        <source src="loadS.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>

      <video id="smallVideo" autoPlay muted>
        <source src="loadS.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div id="buttonContainer" className="button-container">
        <div className="text">Bali's Destinations</div>
        <button onClick={playAudio} className="start-button">
          Start
        </button>
      </div>
    </>
  );
};

export default VideoPlayer;
