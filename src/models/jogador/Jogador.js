import { v4 as uuidv4 } from "uuid";

export default class User {
  constructor(nome, sala, time_id) {
    this.id = uuidv4();
    this.nome = nome;
    this.sala = sala;
    this.time_id = time_id;
  }
}