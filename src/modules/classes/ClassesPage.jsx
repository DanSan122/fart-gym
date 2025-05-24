import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es';
import Modal from 'react-modal';

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => 1, // lunes
  getDay,
  locales,
});

const colores = {
  duo: '#44ccaa',
  entrenamiento: '#f4a236',
  kickboxing: '#00aaff',
  bootcamp: '#39c06b',
};

const eventStyleGetter = (event) => ({
  style: {
    backgroundColor: colores[event.tipo] || '#ccc',
    color: '#fff',
    borderRadius: '6px',
    padding: '4px',
    border: 'none',
  },
});

function ClassesPage() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClase, setSelectedClase] = useState(null);

  const [formData, setFormData] = useState({
    tipo: 'duo',
    instructor: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    inscritos: 0,
    cupo: 10,
  });

  const handleRangeChange = (range) => {
    const start = Array.isArray(range) ? range[0] : range.start;
    const end = Array.isArray(range) ? range[range.length - 1] : range.end;

    fetch(`http://localhost:5000/api/sesiones`)
      .then(res => res.json())
      .then(data => {
        const eventos = data.map((sesion, index) => ({
          id: sesion._id || index,
          title: `Clase - ${sesion.estado}`,
          start: new Date(sesion.inicio),
          end: new Date(sesion.fin),
          tipo: sesion.clase?.toLowerCase() || 'otro',
          clase: sesion.clase,
          descripcionClase: sesion.descripcionClase,
          nombreInstructor: sesion.nombreInstructor,
          capacidadMax: sesion.capacidadMax
        }));
        setEvents(eventos);
      })
      .catch(err => console.error('Error cargando sesiones:', err));
  };


  const handleNavigate = (date) => {
    setCurrentDate(date);
    handleRangeChange({ start: date });
  };

  const handleEventClick = (event) => {
    setSelectedClase(event);
    setModalOpen(true);
  };

  useEffect(() => {
    handleRangeChange({ start: currentDate });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { tipo, instructor, fecha, horaInicio, horaFin, inscritos, cupo } = formData;

    const start = new Date(`${fecha}T${horaInicio}`);
    const end = new Date(`${fecha}T${horaFin}`);

    if (new Date(end) <= new Date(start)) {
      alert('La hora de fin debe ser posterior a la de inicio.');
      return;
    }

    const nuevoEvento = {
      id: `temp-${Date.now()}`,
      title: `${inscritos}/${cupo} ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} - ${instructor}`,
      start,
      end,
      tipo,
    };

    setEvents([...events, nuevoEvento]);

    setFormData({
      tipo: 'duo',
      instructor: '',
      fecha: '',
      horaInicio: '',
      horaFin: '',
      inscritos: 0,
      cupo: 10,
    });
  };

  return (
    <div className="main-content" style={{ padding: '20px' }}>
      <h2>Clases Grupales</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <select value={formData.tipo} onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}>
          <option value="duo">Duo</option>
          <option value="entrenamiento">Entrenamiento</option>
          <option value="kickboxing">Kickboxing</option>
          <option value="bootcamp">Bootcamp</option>
        </select>
        <input type="text" placeholder="Instructor" value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} required />
        <input type="date" value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} required />
        <input type="time" value={formData.horaInicio} onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })} required />
        <input type="time" value={formData.horaFin} onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })} required />
        <input type="number" min="0" placeholder="Inscritos" value={formData.inscritos} onChange={(e) => setFormData({ ...formData, inscritos: e.target.value })} required />
        <input type="number" min="1" placeholder="Cupo" value={formData.cupo} onChange={(e) => setFormData({ ...formData, cupo: e.target.value })} required />
        <button type="submit" style={{ backgroundColor: '#b4c638', border: 'none', padding: '6px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
          Agregar clase
        </button>
      </form>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week']}
        date={currentDate}
        onNavigate={handleNavigate}
        onRangeChange={handleRangeChange}
        style={{ height: '600px' }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
      />

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Detalle de Clase"
        ariaHideApp={false}
        style={{
          content: {
            maxWidth: '500px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px'
          }
        }}
      >
        <h3>Detalle de Clase</h3>
        {selectedClase && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr><td><strong>Clase:</strong></td><td>{selectedClase.clase}</td></tr>
              <tr><td><strong>Descripción:</strong></td><td>{selectedClase.descripcionClase}</td></tr>
              <tr><td><strong>Horario:</strong></td><td>{new Date(selectedClase.start).toLocaleString()} - {new Date(selectedClase.end).toLocaleTimeString()}</td></tr>
              <tr><td><strong>Instructor:</strong></td><td>{selectedClase.nombreInstructor}</td></tr>
              <tr><td><strong>Capacidad:</strong></td><td>{selectedClase.capacidadMax}</td></tr>
            </tbody>
          </table>


        )}
        <button onClick={() => setModalOpen(false)} style={{ marginTop: '15px', padding: '5px 15px' }}>
          Cerrar
        </button>
      </Modal>
    </div>
  );
}

export default ClassesPage;