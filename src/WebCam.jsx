import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './WebCam.css';
import { motion } from 'framer-motion';

function WebCam() {
    const [loading, setLoading] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const photoRef = useRef(null);
    const [streaming, setStreaming] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [photoCount, setPhotoCount] = useState(0);

    const handleGoBack = () => {
        window.history.back();
    };

    useEffect(() => {
        const constraints = { video: true, audio: false };
        


        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.addEventListener('loadedmetadata', () => {
                        if (videoRef.current) {
                            videoRef.current.play();
                            setStreaming(true);
                        }
                    });
                }
            })
            .catch((err) => {
                console.error('An error occurred: ', err);
            });
    
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);
    

    useEffect(() => {
        const request = window.indexedDB.open('gallery', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore('photos', { autoIncrement: true });

            objectStore.createIndex('data', 'data', { unique: false });
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            fetchPhotos(db);
        };

        request.onerror = (event) => {
            console.error('Error opening IndexedDB database:', event.target.error);
        };
    }, [photoCount]);

    const fetchPhotos = (db) => {
        const transaction = db.transaction(['photos'], 'readonly');
        const objectStore = transaction.objectStore('photos');
        const request = objectStore.getAll();

        request.onsuccess = () => {
            setPhotos(request.result);
        };

        request.onerror = (event) => {
            console.error('Error fetching photos from IndexedDB:', event.target.error);
        };
    };

    const addPhoto = (data) => {
        const request = window.indexedDB.open('gallery', 1);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['photos'], 'readwrite');
            const objectStore = transaction.objectStore('photos');
            const addRequest = objectStore.add(data);

            addRequest.onsuccess = () => {
                setPhotoCount(prevCount => prevCount + 1);
            };

            addRequest.onerror = (event) => {
                console.error('Error adding photo to IndexedDB:', event.target.error);
            };
        };

        request.onerror = (event) => {
            console.error('Error opening IndexedDB database:', event.target.error);
        };
    };

    const deletePhoto = (index) => {
        console.log('Deleting photo at index:', index);

        const request = window.indexedDB.open('gallery', 1);

        request.onsuccess = (event) => {
            console.log('IndexedDB opened successfully.');
            const db = event.target.result;
            const transaction = db.transaction(['photos'], 'readwrite');
            const objectStore = transaction.objectStore('photos');

            const cursorRequest = objectStore.openCursor(null, 'prev');

            let currentIndex = 0;
            cursorRequest.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if (currentIndex === index) {
                        const deleteRequest = objectStore.delete(cursor.key);
                        deleteRequest.onsuccess = () => {
                            console.log('Photo deleted successfully.');
                            setPhotoCount(prevCount => prevCount + 1);
                        };
                        deleteRequest.onerror = (event) => {
                            console.error('Error deleting photo from IndexedDB:', event.target.error);
                        };
                    } else {
                        currentIndex++;
                        cursor.continue();
                    }
                }
            };

            cursorRequest.onerror = (event) => {
                console.error('Error opening cursor:', event.target.error);
            };
        };

        request.onerror = (event) => {
            console.error('Error opening IndexedDB database:', event.target.error);
        };
    };

    const takePicture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const photo = photoRef.current;

        const context = canvas.getContext('2d');
        if (video.videoWidth && video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

            const data = canvas.toDataURL('image/png');
            addPhoto(data);
            photo.setAttribute('src', data);
            photo.style.display = 'block';
        } else {
            clearPhoto();
        }
    };

    const clearPhoto = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#AAA';
        context.fillRect(0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/png');
        photoRef.current.setAttribute('src', data);
    };

    const downloadImage = (imageData) => {
        const a = document.createElement('a');
        a.href = imageData;
        a.download = 'photo.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadAll = () => {
        const zip = new JSZip();

        photos.forEach((data, index) => {
            const filename = `photo_${index + 1}.png`;
            zip.file(filename, data.substr(data.indexOf(',') + 1), { base64: true });
        });

        zip.generateAsync({ type: 'blob' }).then((blob) => {
            saveAs(blob, 'photos.zip');
        });
    };


    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          takePicture();
        }, 1000);
      };
    
      const styles = {
        spinner: {
          width: '5vw',
          height: '5vw',
        },
      };
    

    return (
        <div>
        <div className="header_visitor container-fluid d-flex flex-column justify-content-center">
          <div className="back-button-gallery" onClick={handleGoBack}>
            <img src="turn-back-w.png" className="picture" alt="Go Back" />
          </div>
          <h1 className="texth text-center m-1 mb-2">Gallery of Visitors</h1>
          <div className="camera d-flex justify-content-center mb-3">
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <video className="border_gallery rounded m-1" ref={videoRef} playsInline autoPlay></video>
            <img className="border_gallery rounded m-1" ref={photoRef} alt="The screen capture will appear in this box." style={{ display: 'none' }} />
          </div>
          <motion.div
            className="Buttons_Gallery d-flex justify-content-center mb-3 align-items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div style={styles.container}>
              {loading ? (
                <img src="/loading.gif" alt="Loading" style={styles.spinner} />
              ) : (
                <motion.button
                  onClick={handleClick}
                  className="button_camera rounded-circle mx-2 border-0"
                >
                  <img src="picture.jpg" className="rounded-circle" alt="Button image" />
                </motion.button>
              )}
            </motion.div>
            <motion.button
              onClick={downloadAll}
              className="button_download rounded-circle mx-2 border-0"
            >
              <img src="download.jpg" className="rounded-circle" alt="Button image" />
            </motion.button>
          </motion.div>
        </div>
        <div id="Gallery_imageContainer">
          {photos.slice().reverse().map((data, index) => (
            <div key={index} id={`imageContainer-${index}`} className="Gallery_image-container mb-3">
              <img src={data} className="uploaded-image-gallery rounded mb-2 mx-2" alt="Gallery" />
              <div className="Buttons_Gallery d-flex justify-content-center mb-3 align-items-center">
                <button className="button_download rounded-circle mx-2 border-0" onClick={() => downloadImage(data)}>
                  <img src="download.jpg" className="rounded-circle" alt="Download" />
                </button>
                <button className="button_delete rounded-circle mx-2 border-0" onClick={() => deletePhoto(index)}>
                  <img src="delete.jpg" className="rounded-circle" alt="Delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default WebCam;
