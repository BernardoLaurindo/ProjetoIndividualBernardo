const db = require('../config/db');

class User {
  static async getAll() {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createUser(data) {
    const result = await db.query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) RETURNING *`,
      [data.name, data.email, data.password]
    );
    return result.rows[0];
  }

  static async updateUser(id, data) {
    const result = await db.query(
      `UPDATE users 
       SET name = $1, email = $2, password = $3 
       WHERE id = $4 RETURNING *`,
      [data.name, data.email, data.password, id]
    );
    return result.rows[0];
  }

  static async deleteUser(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = User;
