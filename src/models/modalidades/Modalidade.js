import { v4 as uuidv4 } from "uuid";

export default class Modalidade {
  constructor(nome, descricao, limite_pessoas, campeonato_id, valor_por_pessoa, tipo) {
    this.id = uuidv4();
    this.nome = nome;
    this.descricao = descricao;
    this.limite_pessoas = limite_pessoas;
    this.campeonato_id = campeonato_id;
    this.valor_por_pessoa = valor_por_pessoa;
    this.tipo = tipo;
  }
}
