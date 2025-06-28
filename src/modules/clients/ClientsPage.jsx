import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';

function ClientsPage() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';


  useEffect(() => {
    fetch(`${BASE_URL}/clientes`)
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error('Error al cargar clientes:', err));
  }, []);

  const irAMembresias = (dni) => {
    navigate(`/membresias?dni=${dni}`);
  };

  const clientesFiltrados = clientes.filter(c => {
    const nombre = c.nombres?.toLowerCase() || '';
    const apellido = c.apellidos?.toLowerCase() || '';
    const dni = String(c.dni);
    const texto = filtro.toLowerCase();
    return nombre.includes(texto) || apellido.includes(texto) || dni.includes(texto);
  });

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return '-';
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-PE'); // dd/mm/aaaa
  };

  return (
    <div className="main-content">
      <h2>Clientes</h2>

      <input
        type="text"
        placeholder="Buscar por nombre, apellido o DNI"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '300px',
        }}
      />

      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Nacimiento</th>
            <th>Celular</th>
            <th>Correo</th>
            <th>DNI</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((c, i) => (
            <tr key={i}>
              <td>{c.nombres}</td>
              <td>{c.apellidos}</td>
              <td>{formatearFecha(c.fechaNacimiento)}</td>
              <td>{c.telefono}</td>
              <td>{c.correo}</td>
              <td>{c.dni}</td>
              <td>
                <button
                  onClick={() => irAMembresias(c.dni)}
                  style={{
                    backgroundColor: '#b4c638',
                    color: '#222318',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  Ver membresías
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientsPage;
