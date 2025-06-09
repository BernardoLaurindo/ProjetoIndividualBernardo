const userModel = require('../models/userModel');

const getAll = async (req, res) => {
  try {
    const users = await userModel.getAll();
    res.status(200).json({ sucesso: true, users });
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const user = await userModel.getById(req.params.id);
    if (user) {
      res.status(200).json({ sucesso: true, user });
    } else {
      res.status(404).json({ sucesso: false, error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { nome, email, senha, confirmar_senha } = req.body;
    if (senha !== confirmar_senha) {
      return res.status(400).json({ sucesso: false, error: 'Senhas não conferem' });
    }
    const newUser = await userModel.create({ nome, email, senha });
    res.status(201).json({ sucesso: true, user: newUser });
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ sucesso: false, error: 'Usuário não encontrado' });
    }
    // Compare senha (ideal: use hash/bcrypt)
    if (user.senha !== senha) {
      return res.status(401).json({ sucesso: false, error: 'Senha incorreta' });
    }
    res.json({ sucesso: true, user: { id: user.id, nome: user.nome, email: user.email } });
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const updatedUser = await userModel.update(req.params.id, { nome, email, senha });
    if (updatedUser) {
      res.status(200).json({ sucesso: true, user: updatedUser });
    } else {
      res.status(404).json({ sucesso: false, error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await userModel.delete(req.params.id);
    if (deleted) {
      res.status(200).json({ sucesso: true, message: 'Usuário deletado com sucesso' });
    } else {
      res.status(404).json({ sucesso: false, error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ sucesso: false, error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  createUser,
  loginUser,
  updateUser,
  deleteUser
};