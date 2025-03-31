import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '127.0.0.1', // or 'localhost'
  user: 'root',
  port:3308,
  password: '', // If you set a password, update it here
  database: 'jcrm',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


export default pool;
