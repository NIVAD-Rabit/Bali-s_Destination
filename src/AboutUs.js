import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';

const handleGoBack = () => {
    window.history.back();
};

const AboutUs = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="bg">
            <div className="back-button-gallery" onClick={handleGoBack}>
            <img src="turn-back-w.png" className="picture" alt="Go Back" />
          </div>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    {['D.png', 'J.png', 'F.png', 'W.png'].map((src, index) => (
                        <div key={src} className="gallery-image-container" onClick={() => openModal(src)}>
                            <motion.img
                                src={src}
                                className="gallery-image img-fluid"
                                alt={`Gallery Image ${index + 1}`}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.75, delay: index * 0.2 }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <motion.div
                className="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1>About Us</h1>
                <p>
                We are a team of dedicated college students, passionate about coding and design, embarking on the exciting challenge of creating a website for Bali's tourism. While the journey is filled with late nights and countless debugging sessions, we find joy in every obstacle we overcome together. Each challenge strengthens our bond and fuels our creativity. We are committed to capturing the essence of Bali, showcasing its beauty and culture through our hard work and determination.
                </p>
            </motion.div>

            
        </div>
    );
};

export default AboutUs;
