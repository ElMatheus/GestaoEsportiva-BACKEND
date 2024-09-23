import pg from "../../database/index.js"
export default class UsersRepository {
  constructor() {
    this.pg = pg;
  };
  async getCampeonatos() {
    try {
      const allCampeonatos = await this.pg.manyOrNone("SELECT * FROM Campeonato");
      return allCampeonatos;
    } catch (error) {
      throw error;
    } 
   }
  async getCampeonatoById(id) {
    try {
      const campeonato = await this.pg.oneOrNone("SELECT * FROM Campeonato WHERE id = $1", id);
      return campeonato;
    } catch (error) {
      throw error;
    }
  }
  async createCampeonato(campeonato) {
    try {
      await this.pg.none("INSERT INTO Campeonato (id, titulo, data_inicio, data_final) VALUES ($1, $2, $3, $4)", [
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
  async updateCampeonato(id, titulo, data_inicio, data_final) {
    try {
      const campeonato = this.getCampeonatoById(id);
      if (!campeonato) {
        return null;
      }
      await this.pg.none("UPDATE Campeonato SET titulo = $1, data_inicio = $2, data_final = $3 WHERE id = $4", [titulo, data_inicio, data_final, id]);
      return campeonato;
    }
    catch (error) {
      throw error;
    }
  }
  async deleteCampeonato(id) {
    try {
      const campeonato = this.getCampeonatoById(id);
      if (!campeonato) {
        return null;
      }
      await this.pg.none("DELETE FROM Campeonato WHERE id = $1", id);
      return campeonato;
    }
    catch (error) {
      throw error;
    }
  }
}
  