import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Sidebar from './layout/Sidebar';
import ClientsPage from './modules/clients/ClientsPage';
import MembershipsPage from './modules/memberships/MembershipsPage';
import AttendancePage from './modules/attendance/AttendancePage';
import ClassesPage from './modules/classes/ClassesPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={
            <PrivateRoute>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Navigate to="/clientes" />} />
                <Route path="/clientes" element={<ClientsPage />} />
                <Route path="/membresias" element={<MembershipsPage />} />
                <Route path="/asistencia" element={<AttendancePage />} />
                <Route path="/clases" element={<ClassesPage />} />
              </Routes>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
