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

    async getConfrontosLimpo() {
        try {
            const allConfrontos = await this.pg.manyOrNone(`
                SELECT 
                    LEAST(time1, time2) AS time1,
                    GREATEST(time1, time2) AS time2
                FROM 
                    confronto
                GROUP BY 
                    LEAST(time1, time2), GREATEST(time1, time2);
            `);
            return allConfrontos;
        } catch (error) {
            throw error;
        }
    }
    

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
        console.log(confronto)
        try {
            await this.pg.none("INSERT INTO confronto (id, idPartida, timeId, winner, tie, updAtDate, updAtIdUser, data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [confronto.id ,confronto.idPartida, confronto.timeId, confronto.winner, confronto.tie, confronto.updAtDate, confronto.updAtIdUser, confronto.data]);
        } catch (error) {
            throw error;
        }
    };
    async updateConfronto(confronto, id) {
        try {
            await this.pg.none("UPDATE confronto SET idPartida = $1, timeId = $2, winner = $3, tie = $4, updAtDate = $5, updAtIdUser = $6 WHERE id = $7", [confronto.idPartida, confronto.timeId, confronto.winner, confronto.tie, confronto.updAtDate, confronto.updAtIdUser, id]);
        } catch (error) {
            throw error;
        }
    };
    async deleteConfronto(id) {
        try {
            await this.pg.none("DELETE FROM confronto WHERE id = $1", id);
        } catch (error) {
            throw error;
        }
    };
}