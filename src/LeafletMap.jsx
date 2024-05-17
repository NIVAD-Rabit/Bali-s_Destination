import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "./styles.css";
import "leaflet/dist/leaflet.css";

const LeafletMap = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  const markers = [
    {
      geocode: [-8.2752778, 115.16638888888889],
      popUp: (
        <a href="https://www.google.com/maps/dir//Danau+Beratan,+Candikuning,+Baturiti,+Tabanan+Regency,+Bali+82191/@-8.2751723,115.0844215,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2dd1896c9fac0857:0x18246568e4db1b53!2m2!1d115.1668234!2d-8.2751807?entry=ttu" target="_blank" className="popup-link">
          Pura Bratan (Meru Tower)
        </a>
      ),
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/7/77/Pura_Ulun_Danu_Bratan%2C_2022.jpg"
    },
    {
      geocode: [-8.719266, 115.16864],
      popUp: (
        <a href="https://www.google.com/maps/dir/-6.2342116,106.6173419/pantai+kuta/@-7.4205761,105.60504,6z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x2dd246bc2ab70d43:0x82feaae12f4ab48e!2m2!1d115.1686322!2d-8.7184926?entry=ttu" target="_blank" className="popup-link">
          Pantai Kuta
        </a>
      ),
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv1iTVWdWUN0XiEBEXcdTOcdh5h_wUMr3oeoxbseoYug&s"
    },
    {
      geocode: [-8.64, 115.1],
      popUp: (
        <a href="https://www.google.com/maps?sca_esv=6965cced8725ff61&rlz=1C1ONGR_enID1048ID1048&sxsrf=ADLYWII1NhKX15qz8IdPqiZ2kH-1fNM89g:1715968486567&biw=1280&bih=559&dpr=1.5&um=1&ie=UTF-8&fb=1&gl=id&sa=X&geocode=KavecU-CN9ItMWlN4_dw4qvK&daddr=Beraban,+Kediri,+Tabanan+Regency,+Bali+82121" target="_blank" className="popup-link">
          Tanah Lot
        </a>
      ),
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/TanahLot_2014.JPG/390px-TanahLot_2014.JPG"
    },
    {
      geocode: [-8.826880, 115.084267],
      popUp: (
        <a href="https://www.google.com/maps?sca_esv=6965cced8725ff61&rlz=1C1ONGR_enID1048ID1048&sxsrf=ADLYWIJi7TKGgtp9RuXaz2jxFhK-caF3ug:1715968758081&biw=1280&bih=559&dpr=1.5&um=1&ie=UTF-8&fb=1&gl=id&sa=X&geocode=KZGByyD8T9ItMZUE26cbjbkM&daddr=Pecatu,+South+Kuta,+Badung+Regency,+Bali" target="_blank" className="popup-link">
          Uluwatu Temple
        </a>
      ),
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg/330px-Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg"
    },
    {
      geocode: [-8.3764, 115.517],
      popUp: (
        <a href="https://www.google.com/maps/dir//Besakih,+Rendang,+Karangasem+Regency,+Bali+80863/@-8.3739891,115.3701548,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2dd21cbe3748b2b7:0xbfc39798cd1bb4a!2m2!1d115.4525567!2d-8.3739976?entry=ttu" target="_blank" className="popup-link">
          Besakih Great Temple
        </a>
      ),
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Besakih_Bali_Indonesia_Pura-Besakih-02.jpg/450px-Besakih_Bali_Indonesia_Pura-Besakih-02.jpg"
    },
    {
      geocode: [-8.51795792816, 115.25502898],
      popUp: (
        <a href="https://www.google.com/maps?sca_esv=6965cced8725ff61&rlz=1C1ONGR_enID1048ID1048&sxsrf=ADLYWIJi7TKGgtp9RuXaz2jxFhK-caF3ug:1715968758081&cshid=1715968921438153&biw=1280&bih=559&dpr=1.5&um=1&ie=UTF-8&fb=1&gl=id&sa=X&geocode=KWebGPZDPdItMVbD70sWQ-y2&daddr=Jl.+Monkey+Forest,+Ubud,+Kecamatan+Ubud,+Kabupaten+Gianyar,+Bali+80571" target="_blank" className="popup-link">
          Sacred Monkey Forest Sanctuary
        </a>
      ),
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/a/aa/Ubud-3.jpg"
    },
  ];

  const customIcon = new Icon({
    iconUrl:
      '/components/location.png',
    iconSize: [38, 38]
  });

  const ResetMapView = () => {
    const map = useMap();
    const resetMap = () => {
      map.setView([-8.409518, 115.1], 10);
    };
    return (
      <button className="reset-button" onClick={resetMap}>
        Reset Map
      </button>
    );
  };

  return (
    <div ref={mapRef} className="map-container container">
      <MapContainer center={[-8.409518, 115.1]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>
                <div className="popup-content">
                  {marker.popUp}
                  {marker.imageSrc && (
                    <div className="image-container">
                      <img
                        src={marker.imageSrc}
                        alt="Image"
                        className="popup-image img-fluid"
                      />
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <ResetMapView />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
