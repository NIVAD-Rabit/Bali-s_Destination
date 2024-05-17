import React from 'react';
import { motion } from 'framer-motion';
import WeatherData from './WeatherData';
import LeafletMap from './LeafletMap';
import CurrencyExchange from './CurrencyExchange';

const handleGoBack = () => {
  window.history.back();
};

const Explore = () => {
  return (
    <div>
      <div>
      <motion.div className="image-section" style={{backgroundImage: "url('bali-1.jpg')"}} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
        <div className="caption">

        <div className="back-button-explore" onClick={handleGoBack}>
        <img src="turn-back-w.png" className="picture"></img>
            </div>

          <span className="border">Weather</span>
        </div>
      </motion.div>
      </div>

      <div className="content-section" style={{background: 'linear-gradient(#00253f, #1b2735)'}}>
        <WeatherData />
      </div>

      <div className="image-section" style={{backgroundImage: "url('bali-2.jpg')"}}>
        <div className="caption">
          <span className="border">Money Changer</span>
        </div>
      </div>

      <div className="content-section" style={{background: 'linear-gradient(#1b2735, #021422)'}}>
         <CurrencyExchange /> 
      </div>

      <div className="image-section" style={{backgroundImage: "url('bali-3.jpg')"}}>
        <div className="caption">
          <span className="border">Map</span>
        </div>
      </div>

      <div className="content-section" style={{background: 'linear-gradient( #021422, #00253f)'}}>
        <LeafletMap />
      </div>
    </div>
  );
};

export default Explore;
