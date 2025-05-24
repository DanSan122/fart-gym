import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/fart-logo.png';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import tiktok from '../assets/tiktok.png';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Fart Gym Logo" className="logo-img" />
      </div>
      <nav className="nav-links">
        <ul>
        <li>
            <Link to="/clientes">
            <span className="icon">👤</span>
            <span className="text">Clientes</span>
            </Link>
        </li>
        <li>
            <Link to="/asistencia">
            <span className="icon">✅</span>
            <span className="text">Asistencia</span>
            </Link>
        </li>
        <li>
            <Link to="/clases">
            <span className="icon">📅</span>
            <span className="text">Clases grupales</span>
            </Link>
        </li>

        </ul>

      </nav>
        <div className="social-icons">
            <a href="https://www.youtube.com/"><img src={facebook} alt="FB" /></a>
            <a href="#"><img src={instagram} alt="IG" /></a>
            <a href="#"><img src={tiktok} alt="TikTok" /></a>
        </div>

    </div>
  );
}

export default Sidebar;
