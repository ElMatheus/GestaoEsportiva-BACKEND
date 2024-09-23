import { v4 as uuidv4 } from "uuid";

export default class User {
  constructor(nome, senha, tipo) {
    this.id = uuidv4();
    this.nome = nome;
    this.senha = senha;
    this.tipo = tipo;
  }
}
