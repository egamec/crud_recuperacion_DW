const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const usuariosRoutes = require('./routes/usuarios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/usuarios', usuariosRoutes);

// Ruta raíz para confirmar
app.get('/api', (req, res) => res.json({ msg: 'API funcionando' }));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
