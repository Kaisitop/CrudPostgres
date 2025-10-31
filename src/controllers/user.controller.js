import pool from '../config/db.js';

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING *',
      [nombre, correo, contrasena]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error al crear usuario');
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    return res.status(200).json({message: 'Lista de usuarios', users: result.rows});
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error al obtener usuarios');
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).send('Error al obtener usuario');
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contrasena } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, correo = $2, contrasena = $3 WHERE id = $4 RETURNING *',
      [nombre, correo, contrasena, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error al actualizar usuario');
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error al eliminar usuario');
  }
};
