import pg from "../../database/index.js";

export default class ConfrontosRepository {
    constructor() {
        this.pg = pg;
    };
    async getConfrontos() {
        try {
            const allConfrontos = await this.pg.manyOrNone("SELECT * FROM confronto");
            return allConfrontos;
        } catch (error) {
            throw error;
        }
    };
    async getConfrontoById(id) {
        try {
            const confronto = await this.pg.oneOrNone("SELECT * FROM confronto WHERE id = $1", id);
            return confronto;
        } catch (error) {
            throw error;
        }
    };
    async getConfrontosByIdPartida(id) {
        try {
            const confrontos = await this.pg.manyOrNone("SELECT * FROM confronto WHERE id_partida = $1", id);
            return confrontos;
        } catch (error) {
            throw error;
        }
    };
    async createConfronto(confronto) {
        try {
            await this.pg.none("INSERT INTO confronto (id, idPartida, timeId, data, winner, tie, updAtDate, updAtIdUser) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [confronto.id ,confronto.idPartida, confronto.timeId, confronto.data, confronto.winner, confronto.tie, confronto.updAtDate, confronto.updAtIdUser]);
        } catch (error) {
            throw error;
        }
    };
}