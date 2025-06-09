-- Criar extensão para suportar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tarefas
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    prazo TIMESTAMP,
    status VARCHAR(50) NOT NULL, -- Ex: pendente, em andamento, concluída
    prioridade VARCHAR(50) CHECK (prioridade IN ('Alta', 'Média', 'Baixa')),
    categoria VARCHAR(100),
    tags TEXT[], -- lista de tags como array
    historico JSONB, -- log de alterações (opcional)
    usuario_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela genérica para Comentários e Anexos
CREATE TABLE IF NOT EXISTS task_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tarefa_id UUID NOT NULL,
    usuario_id UUID, -- apenas para comentários
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('comentario', 'anexo')),
    conteudo TEXT, -- usado se for comentário
    url_arquivo VARCHAR(500), -- usado se for anexo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tarefa_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE SET NULL
);