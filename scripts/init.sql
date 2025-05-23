-- Tabela de Usuários
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL
);

-- Tabela de Categorias
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de Prioridades
CREATE TABLE priorities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    level VARCHAR(50) NOT NULL -- Ex: Alta, Média, Baixa
);

-- Tabela de Tarefas
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATETIME,
    status VARCHAR(50) NOT NULL, -- Ex: pendente, em andamento, concluída
    user_id INT,
    category_id INT,
    priority_id INT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (priority_id) REFERENCES priorities(id)
);

-- Tabela de Comentários
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    user_id INT,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de Anexos
CREATE TABLE attachments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    file_url VARCHAR(500) NOT NULL,
    uploaded_at DATETIME NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);

-- Tabela de Tags
CREATE TABLE tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Tabela de Associação de Tags nas Tarefas (Many-to-Many)
CREATE TABLE task_tags (
    task_id INT,
    tag_id INT,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- Tabela de Histórico de Alterações das Tarefas
CREATE TABLE task_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    user_id INT,
    field_changed VARCHAR(100) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    changed_at DATETIME NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
