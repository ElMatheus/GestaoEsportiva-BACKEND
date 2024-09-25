import { compare, hash } from "bcrypt";

import User from "../models/users/User.js";
import UsersRepository from "../models/users/UsersRepository.js";
import RefreshRepository from "../models/refreshToken/RefreshRepository.js";
import jwt from 'jsonwebtoken';
import Refresh from "../models/refreshToken/Refresh.js";
const { sign } = jwt;

const usersRepository = new UsersRepository();
const refreshRepository = new RefreshRepository();
// pegar todos os usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await usersRepository.getUsers();
    // verificacao se tem usuarios cadastrados
    if (!users) {
      return res.status(404).send({ message: "Não há usuários cadastrados" });
    }
    return res.status(200).send({ totalUsers: users.length, users });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuários", error: error.message });
  }
}
// pegar usuario por id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await usersRepository.getUserById(id);
    // verificacao se usuario existe
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    return res.status(200).send({ message: "Usuário encontrado", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuário", error: error.message });
  }
};
// pegar usuario por nome
export const getUserByName = async (req, res) => {
  try {
    const { nome } = req.params;

    const user = await usersRepository.getUserByName(nome);
    // verificacao se usuario existe
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    return res.status(200).send({
      message: "Usuário encontrado",
      user
    });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuário", error: error.message });
  }
};
// criar usuario
export const createUser = async (req, res) => {
  try {
    const { nome, senha, tipo } = req.body;

    const userAlreadyExistsName = await usersRepository.getUserByName(nome);
    if (userAlreadyExistsName) {
      return res.status(409).send({ message: "Nome já cadastrado" });
    }
    // hash na senha
    const passwordHash = await hash(senha, 8);

    const user = new User(nome, passwordHash, tipo);

    await usersRepository.createUser(user);

    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar usuário", error: error.message });
  }
};

// faça um post para o insomina com o seguinte json
// {
// 	"nome": "admin",
// 	"senha": "admin",
// 	"tipo": "admin"
// }

// atualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, senha, admin } = req.body;

    const userById = await usersRepository.getUserById(id);
    // verificacao se usuario existe
    if (!userById) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    // hash na senha
    const passwordHash = await hash(senha, 8);

    const user = await usersRepository.updateUser(id, nome, passwordHash, tipo);

    return res
      .status(200)
      .send({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar usuário", error: error.message });
  }
};
// deletar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await usersRepository.getUserById(id);
    // verificacao se usuario existe
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    await usersRepository.deleteUser(id);

    return res
      .status(200)
      .send({ message: "Usuário deletado com sucesso", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar usuário", error: error.message });
  }
};
// login users
export const loginUser = async (req, res) => {
  try {
    const { nome, senha } = req.body;

    const user = await usersRepository.getUserByName(nome);
    // verificacao se usuario existe pelo nome
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    // comparacao de senha com hash
    const passwordMatch = await compare(senha, user.senha);
    // se tiver erro na senha retorna isso
    if (!passwordMatch) {
      return res.status(401).send({ message: "Nome ou senha inválidos" });
    }
    // geracao do acess token
    const token = sign({}, '8d59240f-7a89-4817-bfb0-2d0d5e717ed3', {
      subject: user.id,
      expiresIn: '15m'
    });
    // geracao do refresh token
    const generateRefreshToken = new Refresh(user.id);
    const refreshToken = await refreshRepository.createRefreshToken(generateRefreshToken);

    return res.status(200).send({ user, token: token, refreshToken });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao realizar login", error: error.message });
  }
};
// login automatico (refersh)
export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const token = await refreshRepository.getRefreshToken(refreshToken);
    // verificacao se token existe
    if (!token) {
      return res.status(404).send({ message: "Token inválido ou expirado" });
    }
    // geracao de novo acess token
    const newToken = sign({}, '8d59240f-7a89-4817-bfb0-2d0d5e717ed3', {
      subject: token.user_id,
      expiresIn: '15m'
    });

    return res.status(200).send({ token: newToken, user_id: token.user_id });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao realizar refresh", error: error.message });
  }
};