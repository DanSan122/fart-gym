import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';
import logo from '../assets/fart-logo.png'; // ✅ logo importado correctamente

function LoginPage() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin123') {
      login();
      navigate('/clientes');
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-message">
          <h1>Bienvenido a <span>FART GYM</span></h1>
          <p>Tu entrenamiento comienza aquí.</p>
        </div>
      </div>
      <div className="login-right">
        <div className="form-container">
          <img src={logo} alt="Fart Gym" className="logo-login" />
          <p className="tagline">Actitud, energía y constancia 💪</p>
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <span className="input-icon">👤 Usuario</span>
            <input
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <span className="input-icon">🔒 Contraseña</span>
            <input
              type="password"
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <div className="login-options">
                <label><input type="checkbox" /> Recordarme</label>
                <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
