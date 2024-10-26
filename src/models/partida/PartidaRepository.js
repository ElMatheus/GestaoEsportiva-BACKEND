import pg from "../../database/index.js"
export default class PartidaRepository {
  constructor() {
    this.pg = pg;
  };

  async getPartidas() {
    const partidas = await this.pg.manyOrNone("SELECT * FROM partida");
    return partidas;
  };

  async getPartidaAndConfrontos() {
    try {
        const PartidaPorConfronto = await this.pg.manyOrNone(
            "SELECT partida.id AS id_partida, partida.data AS data_da_partida, partida.anotacao AS anotacao_da_partida, confronto.id AS confronto_id, confronto.timeId, confronto.winner, confronto.tie FROM partida INNER JOIN confronto ON partida.id = confronto.idPartida"
        );
        return PartidaPorConfronto
    } catch (error) {
        throw error;
    }
};


async createPartida(partida) {
  const newPartida = await this.pg.one(
    "INSERT INTO partida (data, anotacao, updAtDate, updAtIdUser) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      partida.data,
      partida.anotacao,
      partida.updateDate,
      partida.updateUser
    ]
  );
  return newPartida; // Retorna todos os dados, incluindo o ID
}


  async getPartidaById(id) {
    const partida = await this.pg.oneOrNone("SELECT * FROM partida WHERE id = $1", id);
    return partida;
  };

  async getPartidaByData(data) {
    const partida = await this.pg.oneOrNone("SELECT * FROM partida WHERE data = $1", data);
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

  async deletePartida(id) {
    await this.pg.none("DELETE FROM partida WHERE id = $1", id);
  };
};
