const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura Firebase Admin SDK con tu configuración de Firebase
const serviceAccount = require('../Servidor/firebase-CRUD.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://login-con-base-de-datos-fb17c-default-rtdb.firebaseio.com', // Reemplaza con la URL de tu base de datos
});

// Rutas para operaciones CRUD

// Agregar elemento
app.post('/usuario', async (req, res) => {
  try {
    const usuarios = Array.isArray(req.body) ? req.body : [req.body]; // Convierte a un array si no lo es

    // Itera a través de los usuarios y agrégalos a Firestore
    const resultados = [];
    for (const usuario of usuarios) {
      const docRef = await admin.firestore().collection('Usuarios').add(usuario);
      resultados.push({ id: docRef.id, ...usuario });
    }

    res.json(resultados);
  } catch (error) {
    console.error('Error al agregar los usuarios:', error);
    res.status(500).json({ error: 'Error al agregar los usuarios.' });
  }
});


// Editar elemento
app.put('/usuario/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedItem = req.body;
    await admin.firestore().collection('Usuarios').doc(id).update(updatedItem);
    res.json({ id, ...updatedItem });
  } catch (error) {
    console.error('Error al editar el elemento:', error);
    res.status(500).json({ error: 'Error al editar el elemento.' });
  }
});

// Eliminar elemento
app.delete('/usuario/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await admin.firestore().collection('Usuarios').doc(id).delete();
    res.json({ message: 'Elemento eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el elemento:', error);
    res.status(500).json({ error: 'Error al eliminar el elemento.' });
  }
});

// Listar elementos de la colección 'Usuarios'
app.get('/usuarios', async (req, res) => {
    try {
      const usersRef = admin.firestore().collection('Usuarios');
      const snapshot = await usersRef.get();
      const usuarios = [];
  
      snapshot.forEach((doc) => {
        usuarios.push({ id: doc.id, ...doc.data() });
      });
  
      console.log('Datos de Usuarios:', usuarios);
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
});

// Inicio de sesión
app.post('/iniciosesion', async (req, res) => {
  try {
    const { ema_num_user, pass_user } = req.body;
    const usersRef = admin.firestore().collection('Usuarios');
    // Realizar la consulta para encontrar un usuario con las credenciales proporcionadas
    const querySnapshot = await usersRef.where('ema_num_user', '==', ema_num_user)
                                       .where('pass_user', '==', pass_user)
                                       .get();

    if (querySnapshot.empty) {
      // No se encontró ningún usuario con las credenciales proporcionadas
      res.json({ success: false, message: 'Credenciales incorrectas' });
    } else {
      // Se encontró un usuario con las credenciales proporcionadas
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const userId = userDoc.id; // Obtener el ID del documento
      res.json({ success: true, usuario: { id: userId, ...userData } });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
  }
});

// Asientos
// Agregar elemento
app.post('/asiento', async (req, res) => {
  try {
    const asientos = Array.isArray(req.body) ? req.body : [req.body]; // Convierte a un array si no lo es

    // Itera a través de los asientos y agrégalos a Firestore
    const resultados = [];
    for (const asiento of asientos) {
      const docRef = await admin.firestore().collection('Asientos').add(asiento);
      resultados.push({ id: docRef.id, ...asiento });
    }

    res.json(resultados);
  } catch (error) {
    console.error('Error al agregar los asientos:', error);
    res.status(500).json({ error: 'Error al agregar los asientos.' });
  }
});

// Listar elementos de la colección 'Asientos'
app.get('/asientos', async (req, res) => {
  try {
    const asientosRef = admin.firestore().collection('Asientos');
    const snapshot = await asientosRef.get();
    const asientos = [];

    snapshot.forEach((doc) => {
      asientos.push({ id: doc.id, ...doc.data() });
    });

    console.log('Datos de Asientos:', asientos);
    res.json(asientos);
  } catch (error) {
    console.error('Error al obtener los asientos:', error);
    res.status(500).json({ error: 'Error al obtener los asientos.' });
  }
});


// Editar elementos
app.put('/asientos', async (req, res) => {
  try {
    const updatedItems = req.body; // Debe ser una lista de elementos a actualizar

    // Itera a través de la lista y actualiza cada elemento
    const updatedResults = [];
    for (const updatedItem of updatedItems) {
      const id = updatedItem.id; // Supongamos que cada elemento tiene un campo 'id'
      delete updatedItem.id; // Borramos el id del objeto
      await admin.firestore().collection('Asientos').doc(id).update(updatedItem);
      updatedResults.push({ id, ...updatedItem });
    }

    res.json(updatedResults);
  } catch (error) {
    console.error('Error al editar los elementos:', error);
    res.status(500).json({ error: 'Error al editar los elementos.' });
  }
});


//Eliminar
app.delete('/asientos', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('Asientos').get();
    snapshot.forEach(async (doc) => {
      await admin.firestore().collection('Asientos').doc(doc.id).delete();
    });
    res.json({ message: 'Todos los elementos han sido eliminados correctamente.' });
  } catch (error) {
    console.error('Error al eliminar todos los elementos:', error);
    res.status(500).json({ error: 'Error al eliminar todos los elementos.' });
  }
});

//Compra
// Agregar elemento
app.post('/compra', async (req, res) => {
  try {
    const compras = Array.isArray(req.body) ? req.body : [req.body]; // Convierte a un array si no lo es

    // Itera a través de las compras y agrégalos a Firestore
    const resultados = [];
    for (const compra of compras) {
      const docRef = await admin.firestore().collection('Compras').add(compra);
      resultados.push({ id: docRef.id, ...compra });
    }

    res.json(resultados);
  } catch (error) {
    console.error('Error al agregar las compras:', error);
    res.status(500).json({ error: 'Error al agregar las compras.' });
  }
});

// Listar elementos de la colección 'Compras'
app.get('/compras', async (req, res) => {
  try {
    const comprasRef = admin.firestore().collection('Compras');
    const snapshot = await comprasRef.get();
    const compras = [];

    snapshot.forEach((doc) => {
      compras.push({ id: doc.id, ...doc.data() });
    });

    console.log('Datos de Compras:', compras);
    res.json(compras);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ error: 'Error al obtener las compras.' });
  }
});

//SalaCine
// Listar elementos de la colección 'Asientos'
app.get('/sala_cine', async (req, res) => {
  try {
    const salacineRef = admin.firestore().collection('Salas');
    const snapshot = await salacineRef.get();
    const salas = [];

    snapshot.forEach((doc) => {
      salas.push({ id: doc.id, ...doc.data() });
    });

    console.log('Datos de Salas:', salas);
    res.json(salas);
  } catch (error) {
    console.error('Error al obtener salas:', error);
    res.status(500).json({ error: 'Error al obtener salas.' });
  }
});

//Editar elementos
app.put('/salas', async (req, res) => {
  try {
    const updatedItems = req.body; // Debe ser una lista de elementos a actualizar

    // Itera a través de la lista y actualiza cada elemento
    const updatedResults = [];
    for (const updatedItem of updatedItems) {
      const id = updatedItem.id; // Supongamos que cada elemento tiene un campo 'id'
      const capacidad = updatedItem.capacidad;

      if (capacidad >= 1) {
        updatedItem.capacidad = capacidad - 1;

        if (updatedItem.capacidad === 0) {
          updatedItem.estado = false;
        }

        await admin.firestore().collection('Salas').doc(id).update(updatedItem);
        updatedResults.push({ id, ...updatedItem });
      }
    }

    res.json(updatedResults);
  } catch (error) {
    console.error('Error al editar los elementos:', error);
    res.status(500).json({ error: 'Error al editar los elementos.' });
  }
});

// Agregar elemento
app.post('/ocuparsala', async (req, res) => {
  try {
    const salas = Array.isArray(req.body) ? req.body : [req.body]; // Convierte a un array si no lo es

    // Itera a través de las compras y agrégalos a Firestore
    const resultados = [];
    for (const sala of salas) {
      const docRef = await admin.firestore().collection('SalasOcupadas').add(sala);
      resultados.push({ id: docRef.id, ...sala });
    }

    res.json(resultados);
  } catch (error) {
    console.error('Error al agregar las salas:', error);
    res.status(500).json({ error: 'Error al agregar las salas.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor API en funcionamiento en el puerto ${port}`);
});
