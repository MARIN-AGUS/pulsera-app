import React from 'react';

const getBatteryIcon = (percent) => {
  if (percent > 75) return "🔋";
  if (percent > 50) return "🔋";
  if (percent > 25) return "🪫";
  return "🟥";
};

const getWifiIcon = (ssid) => {
  if (!ssid) return "❌";
  return "📶";
};

const DevicePanel = ({ dispositivos, centrarEn, eliminarDispositivo }) => {
  return (
    <div style={{
      width: '300px',
      background: '#f7f7f7',
      padding: '1rem',
      overflowY: 'auto',
      height: '100vh',
      borderRight: '1px solid #ccc'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>📍 Dispositivos</h2>
      {dispositivos.map((d, i) => (
        <div key={i} style={{
          borderBottom: '1px solid #ddd',
          paddingBottom: '1rem',
          marginBottom: '1rem'
        }}>
          <h4 style={{ margin: 0 }}>{d.dispositivoId}</h4>
          <p>🧭 {d.latitud.toFixed(4)}, {d.longitud.toFixed(4)}</p>
          <p>{getBatteryIcon(d.bateria)} {d.bateria}%</p>
          <p>{getWifiIcon(d.red)} {d.red}</p>
          <p>⏰ {new Date(d.hora).toLocaleString()}</p>
          <button onClick={() => centrarEn(d.latitud, d.longitud)} style={{ marginRight: 8 }}>🧭 Centrar</button>
          <button onClick={() => alert("Historial no disponible aún")} style={{ marginRight: 8 }}>🕓 Ver historial</button>
          <button onClick={() => eliminarDispositivo(d.dispositivoId)} style={{ color: 'red' }}>🗑️ Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default DevicePanel;