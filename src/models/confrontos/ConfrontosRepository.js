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

    async getConfrontoWinnerByModalidade(id) {
        try {
            const confrontos = await this.pg.manyOrNone("SELECT * FROM confronto LEFT JOIN times ON confronto.timeId = times.id WHERE times.modalidade_id = $1 AND winner = true", id);
            return confrontos;
        } catch (error) {
            throw error;
        }
    };

    async getWinnerCountByTimeId(timeId) {
        try {
            const count = await this.pg.one("SELECT COUNT(*) FROM confronto WHERE timeId = $1 AND winner = true", [timeId]);
            return count.count;
        } catch (error) {
            throw error;
        }
    }

    async createConfronto(confronto) {
        try {
            await this.pg.none("INSERT INTO confronto (id, idPartida, timeId, winner, tie, updAtDate, updAtIdUser) VALUES ($1, $2, $3, $4, $5, $6, $7)", [confronto.id, confronto.idPartida, confronto.timeId, confronto.winner, confronto.tie, confronto.updAtDate, confronto.updAtIdUser]);
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
    async findNameTimeByConfronto(id) {
        try {
            const time = await this.pg.oneOrNone("SELECT confronto.id AS id_confronto, confronto.idPartida, confronto.timeID, confronto.winner, confronto.tie, times.id AS time_id, times.nome AS time_nome FROM times INNER JOIN confronto ON times.id = confronto.timeID", id);
            return time;
        } catch (error) {
            throw error;
        }
    }

    async getTopWinningTeamsByChampionship() {
        try {
            const topTeams = await this.pg.manyOrNone(`
SELECT 
    campeonato.id AS campeonato_id,
    campeonato.titulo AS campeonato_titulo,
    campeonato.data_final AS campeonato_data_final,
    times.id AS time_id, 
    times.nome AS time_nome, 
    COUNT(confronto.winner) AS win_count
FROM 
    confronto
INNER JOIN 
    times ON confronto.timeId = times.id
INNER JOIN 
    modalidade ON times.modalidade_id = modalidade.id
INNER JOIN 
    campeonato ON modalidade.campeonato_id = campeonato.id
WHERE 
    confronto.winner = true
GROUP BY 
    campeonato.id, campeonato.titulo, campeonato.data_final, times.id, times.nome
ORDER BY 
    campeonato.id, win_count DESC
            `);
            return topTeams;
        } catch (error) {
            throw error;
        }
    }
}