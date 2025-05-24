import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function MembershipsPage() {
  const [searchParams] = useSearchParams();
  const dni = searchParams.get('dni');
  const [membresias, setMembresias] = useState([]);

  useEffect(() => {
    if (!dni) return;

    fetch(`http://localhost:5000/api/membresias?dni=${dni}`)
      .then(res => res.json())
      .then(data => setMembresias(data))
      .catch(err => console.error('Error al cargar membresías:', err));
  }, [dni]);

  const formatearFecha = (f) => f ? new Date(f).toLocaleDateString('es-PE') : '-';

  return (
    <div className="main-content">
      <h2>Membresías para DNI: {dni}</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Pagado</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {membresias.map((m, i) => (
            <tr key={i}>
              <td>{m.tipo}</td>
              <td>{formatearFecha(m.fechaInicio)}</td>
              <td>{formatearFecha(m.fechaFin)}</td>
              <td>S/ {m.pagado}</td>
              <td>S/ {m.total}</td>
              <td>{m.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MembershipsPage;
