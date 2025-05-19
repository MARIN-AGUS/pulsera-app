import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [sonidoReproducido, setSonidoReproducido] = useState(false);
  const navigate = useNavigate();

  const USUARIO_VALIDO = "admin";
  const PASSWORD_VALIDO = "pulsera123";

  const reproducirSonido = (e) => {
    if (!sonidoReproducido && e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON" && e.target.tagName !== "I") {
      const audio = new Audio('/intro.mp3');
      audio.play().catch(() => {});
      setSonidoReproducido(true);
    }
  };

  const handleLogin = () => {
    if (usuario === USUARIO_VALIDO && clave === PASSWORD_VALIDO) {
      navigate('/app');
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const habilitarBoton = usuario.trim() !== '' && clave.trim() !== '';

  return (
    <div className="login-container" onClick={reproducirSonido}>
      <h1 className="titulo-bienvenida animacion-bienvenida">Bienvenido a UBI.com</h1>

      <video autoPlay muted loop className="logo-video">
        <source src="/logoo.mp4" type="video/mp4" />
        Tu navegador no soporta video.
      </video>

      <div className="login-form">
        <div className="input-container">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            type={mostrarClave ? "text" : "password"}
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
          <i
            className={`fas ${mostrarClave ? "fa-eye-slash" : "fa-eye"} toggle-icon`}
            onClick={() => setMostrarClave(!mostrarClave)}
          ></i>
        </div>

        {habilitarBoton && (
          <button className="fade-in" onClick={handleLogin}>Iniciar</button>
        )}
      </div>
    </div>
  );
};

export default Login;