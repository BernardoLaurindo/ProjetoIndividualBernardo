const db = require('../config/db');

class TaskItem {
  static async getAll() {
    const result = await db.query('SELECT * FROM task_items');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM task_items WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO task_items (task_id, user_id, type, content, file_url) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        data.task_id,
        data.user_id,
        data.type,
        data.content || null,
        data.file_url || null
      ]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      `UPDATE task_items 
       SET content = $1, file_url = $2 
       WHERE id = $3 RETURNING *`,
      [data.content, data.file_url, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM task_items WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = TaskItem;
