import pg from "../../database/index.js"
export default class UsersRepository {
  constructor() {
    this.pg = pg;
  };

  async getCampeonato() {
    try {
      const allCampeonato = await this.pg.manyOrNone("SELECT * FROM Campeonato");
      return allCampeonato
    }
    catch (error) {
      throw error;
    }
    }
    async getCampeonatoById(id) {
    try {
        const campeonato = await this.pg.oneOrNone("SELECT * FROM Campeonato WHERE id = $1", id);
        return campeonato;
        }
        catch (error) {
        throw error;
        }
    }
    async createcampeonato(campeonato) {
    try {
        await this.pg.none("INSERT INTO Campeonato (id, titulo, data_inicio, data_final) VALUES ($1, $2, $3, $4)", [
            campeonato.id,
            campeonato.titulo,
            campeonato.data_inicio,
            campeonato.data_final
        ]);
        return campeonato;
        }
        catch (error) {
        throw error;
        }
    }
    async updatecampeonato(id, titulo, data_inicio, data_final) {