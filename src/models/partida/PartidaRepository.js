import pg from "../../database/index.js"
export default class PartidaRepository {
  constructor() {
    this.pg = pg;
  };

  async getPartidas() {
    const partidas = await this.pg.manyOrNone("SELECT * FROM partida");
    return partidas;
  };

  async createPartida(partida) {
    await this.pg.none("INSERT INTO partida (data, anotacao, updAtDate, updAtIdUser) VALUES ($1, $2, $3, $4)", [
      partida.data,
      partida.anotacao,
      partida.updateDate,
      partida.updateUser
    ]);
    return partida;
  };

  async getPartidaById(id) {
    const partida = await this.pg.oneOrNone("SELECT * FROM partida WHERE id = $1", id);
    return partida;
  };

  async updatePartida(id, partida) {
    await this.pg.none("UPDATE partida SET data = $1, anotacao = $2, updAtDate = $3, updAtIdUser = $4 WHERE id = $5", [
      partida.data,
      partida.anotacao,
      partida.updateDate,
      partida.updateUser,
      id
    ]);
    return partida;
  };
};
