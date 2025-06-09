const db = require('../config/db');

class Task {
  static async getAll() {
    const result = await db.query('SELECT * FROM tasks');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createTask(
    titulo, descricao, prazo, status, prioridade, categoria, tags, historico, usuario_id
  ) {
    const result = await db.query(
      `INSERT INTO tasks 
        (titulo, descricao, prazo, status, prioridade, categoria, tags, historico, usuario_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [
        titulo,
        descricao,
        prazo,
        status,
        prioridade,
        categoria,
        tags,
        historico,
        usuario_id
      ]
    );
    return result.rows[0];
  }

  static async updateTask(
    id, titulo, descricao, prazo, status, prioridade, categoria, tags, historico, usuario_id
  ) {
    const result = await db.query(
      `UPDATE tasks 
       SET titulo = $1, descricao = $2, prazo = $3, status = $4, 
           prioridade = $5, categoria = $6, tags = $7, historico = $8, usuario_id = $9, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $10 RETURNING *`,
      [
        titulo,
        descricao,
        prazo,
        status,
        prioridade,
        categoria,
        tags,
        historico,
        usuario_id,
        id
      ]
    );
    return result.rows[0];
  }

  static async deleteTask(id) {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Task;