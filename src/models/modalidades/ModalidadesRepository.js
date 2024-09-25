import pg from "../../database/index.js"
export default class ModalidadesRepository {
  constructor() {
    this.pg = pg;
  };
  async getModalidades() {
    try {
      const allModalidades = await this.pg.manyOrNone("SELECT * FROM modalidade");
      return allModalidades;
    } catch (error) {
      throw error;
    }
  }
  async getModalidadeById(id) {
    try {
      const modalidade = await this.pg.oneOrNone("SELECT * FROM modalidade WHERE id = $1", id);
      return modalidade;
    } catch (error) {
      throw error;
    }
  }
  async getModalidadeByNome(nome) {
    try {
      const modalidade = await this.pg.manyOrNone("SELECT * FROM modalidade WHERE LOWER(nome_modalidade) LIKE $1", nome.toLowerCase());
      return modalidade;
    } catch (error) {
      throw error;
    }
  }
  async getModalidadeByCampeonatoId(campeonato_id) {
    try {
      const modalidade = await this.pg.manyOrNone("SELECT * FROM modalidade WHERE campeonato_id = $1", campeonato_id);
      return modalidade;
    } catch (error) {
      throw
    }
  }
  async createModalidade(modalidade) {
    try {
      await this.pg.none("INSERT INTO modalidade (id, nome_modalidade, descricao, limite_pessoas, campeonato_id, valor_por_pessoa, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
        modalidade.id,
        modalidade.nome,
        modalidade.descricao,
        modalidade.limite_pessoas,
        modalidade.campeonato_id,
        modalidade.valor_por_pessoa,
        modalidade.tipo
      ]);
      return modalidade;
    } catch (error) {
      throw error;
    }
  }
  async updateModalidade(modalidade, id) {
    try {
      await this.pg.none("UPDATE modalidade SET nome_modalidade = $1, descricao = $2, limite_pessoas = $3, campeonato_id = $4, valor_por_pessoa = $5, tipo = $6 WHERE id = $7", [modalidade.nome, modalidade.descricao, modalidade.limite_pessoas, modalidade.campeonato_id, modalidade.valor_por_pessoa, modalidade.tipo, id]);
      return modalidade;
    }
    catch (error) {
      throw error;
    }
  }
  async deleteModalidade(id) {
    try {
      await this.pg.none("DELETE FROM modalidade WHERE id = $1", id);
    } catch (error) {
      throw error;
    }
  }

  async getModalidadeByTipo(tipo) {
    try {
      const modalidade = await this.pg.manyOrNone("SELECT * FROM modalidade WHERE tipo = $1", tipo);
      return modalidade;
    } catch (error) {
      throw error;
    }
  }

}

