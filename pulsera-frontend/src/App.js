import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import DevicePanel from './components/DevicePanel';

const App = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 19.4326, lng: -99.1332 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyA-JDW1_wZjD9uXS_v-LpOAs8YXb1E7FhI'
  });

  const centrarEn = (lat, lng) => {
    setCenter({ lat, lng });
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
    }
  };

  const eliminarDispositivo = async (id) => {
    if (!window.confirm(`¿Eliminar el dispositivo ${id}?`)) return;
    try {
      await axios.delete(`http://localhost:5001/api/ubicacion/${id}`);
      setDispositivos((prev) => prev.filter(d => d.dispositivoId !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/ubicacion');
        setDispositivos(res.data);
        if (res.data.length > 0)
          setCenter({ lat: res.data[0].latitud, lng: res.data[0].longitud });
      } catch (err) {
        console.error('Error al obtener datos:', err);
      }
    };

    fetchUbicaciones();
    const intervalo = setInterval(fetchUbicaciones, 10000);
    return () => clearInterval(intervalo);
  }, []);

  return isLoaded ? (
    <div style={{ display: 'flex' }}>
      <DevicePanel
        dispositivos={dispositivos}
        centrarEn={centrarEn}
        eliminarDispositivo={eliminarDispositivo}
      />
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        onLoad={(map) => (mapRef.current = map)}
      >
        {dispositivos.map((d, i) => (
          <Marker
            key={i}
            position={{ lat: d.latitud, lng: d.longitud }}
            label={d.dispositivoId}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <div>Cargando mapa...</div>
  );
};

export default App;