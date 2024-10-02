import pg from "../../database/index.js"
export default class CampeonatosRepository {
  constructor() {
    this.pg = pg;
  };
  async getCampeonatos() {
    try {
      const allCampeonatos = await this.pg.manyOrNone("SELECT * FROM campeonato");
      return allCampeonatos;
    } catch (error) {
      throw error;
    }
  }
  async getCampeonatosModalidades() {
    try {
      const jogadoresPorTime = await this.pg.manyOrNone(`
            SELECT
                campeonato.id AS id_campeonato,
                campeonato.titulo AS titulo_campeonato,
                modalidade.id AS id,
                modalidade.nome_modalidade AS nome_modalidade,
                modalidade.tipo AS tipo,
                modalidade.campeonato_id AS campeonato_id
            FROM
                campeonato
            INNER JOIN
                modalidade
            ON
                campeonato.id = modalidade.campeonato_id

        `);
      return jogadoresPorTime;
    } catch (error) {
      throw error;
    }
  }
  async getCampeonatoById(id) {
    try {
      const campeonato = await this.pg.oneOrNone("SELECT * FROM campeonato WHERE id = $1", id);
      return campeonato;
    } catch (error) {
      throw error;
    }
  }
  async getCampeonatoByTitulo(titulo) {
    try {
      const campeonato = await this.pg.manyOrNone("SELECT * FROM campeonato WHERE LOWER(titulo) LIKE $1", titulo.toLowerCase());
      return campeonato;
    } catch (error) {
      throw error;
    }
  }
  async getCampeonatoByTituloWithDate(titulo, data) {
    try {
      const date = new Date(data).toISOString().split('T')[0];
      const campeonato = await this.pg.manyOrNone("SELECT * FROM campeonato WHERE LOWER(titulo) LIKE $1 AND $2 BETWEEN data_inicio AND data_final", [titulo.toLowerCase(), date]);
      return campeonato;
    } catch (error) {
      throw error;
    }
  }
  async createCampeonato(campeonato) {
    try {
      await this.pg.none("INSERT INTO campeonato (id, titulo, data_inicio, data_final) VALUES ($1, $2, $3, $4)", [
        campeonato.id,
        campeonato.titulo,
        campeonato.data_inicio,
        campeonato.data_final
      ]);
      return campeonato;
    } catch (error) {
      throw error;
    }
  }
  async updateCampeonato(campeonato, id) {
    try {
      await this.pg.none("UPDATE campeonato SET titulo = $1, data_inicio = $2, data_final = $3 WHERE id = $4", [campeonato.titulo, campeonato.data_inicio, campeonato.data_final, id]);
      return campeonato;
    }
    catch (error) {
      throw error;
    }
  }
  async deleteCampeonato(id) {
    try {
      await this.pg.none("DELETE FROM campeonato WHERE id = $1", id);
    }
    catch (error) {
      throw error;
    }
  }
}
