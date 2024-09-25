import { v4 as uuidv4 } from "uuid";

export default class User {
  constructor(nome, sala, modalidade_id, status, pontos) {
    this.id = uuidv4();
    this.nome = nome;
    this.sala = sala;
    this.modalidade_id = modalidade_id,
    this.status = status,
    this.pontos = pontos;
  }
}