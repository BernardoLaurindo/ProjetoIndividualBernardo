const db = require('../config/db');

class TaskItem {
  static async getAllTaskItems() {
    const result = await db.query('SELECT * FROM task_items');
    return result.rows;
  }

  static async getTaskItemById(id) {
    const result = await db.query('SELECT * FROM task_items WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createTaskItem(tarefa_id, usuario_id, tipo, conteudo, url_arquivo) {
    const result = await db.query(
      `INSERT INTO task_items (tarefa_id, usuario_id, tipo, conteudo, url_arquivo) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        tarefa_id,
        usuario_id,
        tipo,
        conteudo || null,
        url_arquivo || null
      ]
    );
    return result.rows[0];
  }

  static async updateTaskItem(id, tarefa_id, usuario_id, tipo, conteudo, url_arquivo) {
    const result = await db.query(
      `UPDATE task_items 
       SET tarefa_id = $1, usuario_id = $2, tipo = $3, conteudo = $4, url_arquivo = $5 
       WHERE id = $6 RETURNING *`,
      [tarefa_id, usuario_id, tipo, conteudo, url_arquivo, id]
    );
    return result.rows[0];
  }

  static async deleteTaskItem(id) {
    const result = await db.query('DELETE FROM task_items WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = TaskItem;