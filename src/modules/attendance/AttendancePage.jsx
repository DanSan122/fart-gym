import { useState, useEffect } from 'react';

function AttendancePage() {
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));
  const [filtro, setFiltro] = useState('');
  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    cargarAsistenciasPorFecha(fecha);
  }, [fecha]);

  const cargarAsistenciasPorFecha = (fecha) => {
    const fechaUTC = new Date(`${fecha}T00:00:00Z`).toISOString().slice(0, 10);

    const BASE_URL = import.meta.env.VITE_API_URL;
    fetch(`${BASE_URL}/asistencias/lista?fecha=${fechaUTC}`)
      .then(res => res.json())
      .then(asistencias => {
        setAsistencias(asistencias);
      })
      .catch(err => console.error('Error al cargar asistencias:', err));
  };

  const handleToggle = (index) => {
    const updated = [...asistencias];
    updated[index].asistio = !updated[index].asistio;

    const { clienteId, fecha, asistio } = updated[index];

    // Actualiza en estado local
    setAsistencias(updated);

    // Actualiza en la base de datos inmediatamente
    fetch(`${import.meta.env.VITE_API_URL}/asistencias/marcar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clienteId, fecha, asistio })
    })
      .then(res => res.json())
      .then(data => {
        console.log('✅ Asistencia actualizada:', data.mensaje);
      })
      .catch(err => {
        console.error('Error al actualizar asistencia:', err);
      });
  };


  const formatUTCDate = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toISOString().split('T')[0].split('-').reverse().join('/');
  };


  const handleGuardar = () => {
    const payload = asistencias.map(({ clienteId, fecha, asistio }) => ({
      clienteId,
      fecha,
      asistio
    }));

    fetch('http://localhost:5000/api/asistencias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => alert('✅ Asistencia guardada: ' + data.mensaje))
    .catch(err => console.error('Error al guardar:', err));
  };

  const handleFechaChange = (newFecha) => {
    setFecha(newFecha);
  };

  const filtrados = asistencias.filter((item) =>
    `${item.nombres} ${item.apellidos}`.toLowerCase().includes(filtro.toLowerCase())
  );

  const asistieron = filtrados.filter((i) => i.asistio).length;
  const faltaron = filtrados.length - asistieron;

  return (
    <div className="main-content">
      <h2>Asistencia</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => handleFechaChange(e.target.value)}
          style={{ padding: '8px' }}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Asistió</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((item, index) => (
            <tr key={index}>
              <td>{item.nombres} {item.apellidos}</td>
              <td>{formatUTCDate(item.fecha)}</td>

              <td>
                <input
                  type="checkbox"
                  checked={item.asistio}
                  onChange={() => handleToggle(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleGuardar}
          style={{
            background: 'linear-gradient(135deg, #748c34, #748c34)',
            color: '#1a1a1a',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          💾 Guardar asistencia
        </button>


        <div style={{ textAlign: 'right' }}>
          <p>✅ Asistieron: <strong>{asistieron}</strong></p>
          <p>❌ Faltaron: <strong>{faltaron}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;
