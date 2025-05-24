# 🏋️‍♂️ FART GYM

Sistema de gestión para un gimnasio con módulos de clientes, membresías, clases grupales y asistencia. Proyecto desarrollado con **React**, **Node.js/Express** y **MongoDB**.

---

## 📦 Tecnologías usadas

| Parte        | Stack                                |
|--------------|---------------------------------------|
| Frontend     | React + Vite                         |
| Backend      | Node.js + Express                    |
| Base de Datos| MongoDB (Atlas)                      |
| Deploy       | Vercel (Frontend) + Render (API)     |

---

## 🚀 Requisitos previos

- Node.js >= 18
- npm o yarn
- MongoDB Atlas (o local, si se prefiere)
- Cuenta en Vercel y Render (para producción)

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/fart-gym.git
cd fart-gym
```

### 2. Configurar variables de entorno

#### Backend (`backend/.env`):

```
PORT=5000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/fartgym_db
```

> Reemplaza con tus credenciales reales de MongoDB Atlas

### 3. Instalar dependencias

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## 🧪 Ejecutar en desarrollo

### Backend

```bash
cd backend
node server.js
```

### Frontend

```bash
cd frontend
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la app.

---

## ☁️ Despliegue

### Vercel (Frontend)

1. Ve a [vercel.com](https://vercel.com/)
2. Importa tu repo de GitHub
3. Configura el framework como **Vite**
4. Define la variable de entorno `VITE_API_URL=https://fartgym-api.onrender.com`

### Render (Backend)

1. Ve a [render.com](https://render.com/)
2. Crea un nuevo servicio Web
3. Elige el repo y define:
   - **Start Command:** `node server.js`
   - **Environment Variables:**
     - `PORT=10000` (Render lo ignora)
     - `MONGO_URI=...` (como arriba)

---

## 📁 Carga de datos JSON a MongoDB

Para cargar tus archivos `.json` en MongoDB Atlas:

```bash
mongoimport --uri "mongodb+srv://<usuario>:<password>@cluster.mongodb.net/fartgym_db" --collection sesiones_clase --file sesiones_clase.json --jsonArray
```

---

## 📂 Estructura del proyecto

```
fart-gym/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── vite.config.js
└── README.md
```

---

## 📬 Contacto

Desarrollado por [Tu Nombre] – [tu.email@example.com]  
Repositorio: https://github.com/tuusuario/fart-gym
