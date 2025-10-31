import { Pool } from 'pg'

const pool = new Pool({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'usuarios_db',
})
try {
    console.log(await pool.query('SELECT NOW()'))
    console.log('Conexión exitosa a la base de datos')
} catch (error) {
    console.error('Error de conexión a la base de datos:', error)
}

export default pool