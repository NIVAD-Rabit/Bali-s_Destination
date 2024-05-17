import React, { useState, useEffect } from 'react';
import './PageSlider.css'; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    document.body.classList.add('overflow-hidden');

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.body.classList.remove('overflow-hidden');
    };
  }, [currentSlide]);

  const handleTouchStart = (event) => {
    const touchStartX = event.touches[0].clientX;
    
    const handleTouchMove = (event) => {
      const touchEndX = event.touches[0].clientX;
      const deltaX = touchStartX - touchEndX;
  
      if (deltaX > 50) {
        nextSlide();
      } else if (deltaX < -50) {
        prevSlide();
      }
    };
  
    document.addEventListener('touchmove', handleTouchMove);
  
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <motion.div className="slider-container"> 
      <motion.div
        className="slider"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}

      >
        <div className="slide col-md-4" style={{ backgroundImage: "url('/slider_IMG1.jpg')" }}>
          <div className="button-container">
            <div className="text" style={{ color: '#275b5b' }}>Explore Bali</div>
            <div className="button-wrapper">
            <Link to="/Explore" className="btn btn-primary D-button">
                View
             </Link>
             </div>
          </div>
        </div>
        <div className="slide col-md-4" style={{ backgroundImage: "url('/slider_IMG2.jpg')" }}>
          <div className="button-container">
            <div className="text" style={{ color: '#355355' }}>Visitor</div>
            <div className="button-wrapper" >
              <Link to="/WebCam" className="btn btn-primary V-button">
                View
             </Link>
             </div>
          </div>
        </div>
        <div className="slide col-md-4" style={{ backgroundImage: "url('/slider_IMG3.jpg')" }}>
          <div className="button-container">
            <div className="text" style={{ color: '#4d7685' }}>About Us</div>
            <div className="button-wrapper">
              <Link  to="/AboutUs"className="btn btn-primary AU-button">
                View
             </Link></div>
          </div>
        </div>
      </motion.div>

      <div className="pagination">
        <button className={`page ${currentSlide === 0 ? 'active' : ''}`} onClick={() => goToSlide(0)}></button>
        <button className={`page ${currentSlide === 1 ? 'active' : ''}`} onClick={() => goToSlide(1)}></button>
        <button className={`page ${currentSlide === 2 ? 'active' : ''}`} onClick={() => goToSlide(2)}></button>
      </div>

      <button className="prev btn btn-dark" onClick={prevSlide}>&#10094;</button>
      <button className="next btn btn-dark" onClick={nextSlide}>&#10095;</button>
    </motion.div>
  );
};

export default PageSlider;
