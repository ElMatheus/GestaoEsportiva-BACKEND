import pg from "../../database/index.js"
export default class TimesRepository {
    constructor() {
        this.pg = pg;
    };


    async getAllTimes() {
        try {
            const allTimes = await this.pg.manyOrNone("SELECT * FROM times");
            return allTimes;
        } catch (error) {
            throw error;
        }
    }

    async getAllTimesByCampeonato(campeonato_id) {
        try {
            const allTimes = await this.pg.manyOrNone("SELECT * FROM times INNER JOIN modalidade ON times.modalidade_id = modalidade.id WHERE modalidade.campeonato_id = $1", campeonato_id);
            return allTimes;
        } catch (error) {
            throw error;
        }
    }

    async getJogadoresPorTime() {
        try {
            const jogadoresPorTime = await this.pg.manyOrNone(`
                SELECT 
                    times.id AS id_time, 
                     times.nome AS nome_time,
                    jogadores.id AS id_jogador, 
                    jogadores.nome AS nome_jogador, 
                    jogadores.sala AS sala_jogador 
                FROM 
                    times 
                INNER JOIN 
                    jogadores 
                ON 
                    times.id = jogadores.time_id
            `);
            return jogadoresPorTime;
        } catch (error) {
            throw error;
        }
    }

    async getTimesById(id) {
        try {
            const time = await this.pg.oneOrNone("SELECT * FROM times WHERE id = $1", id);
            return time;
        } catch (error) {
            throw error;
        }
    }

    async createTime(time) {
        try {
            await this.pg.none("INSERT INTO times (id, nome, sala, modalidade_id, status) VALUES ($1, $2, $3, $4, $5)", [
                time.id,
                time.nome,
                time.sala,
                time.modalidade_id,
                time.status,
            ]);
            return time;
        } catch (error) {
            throw error;
        }
    }

    async updateTime(id, nome, sala, modalidade_id, status, pontos) {
        try {
            const time = this.getTimesById(id);

            if (!time) {
                return null;
            }

            const updateTime = await this.pg.oneOrNone(
                "UPDATE times SET nome = $1, sala = $2, modalidade_id = $3, status = $4, pontos = $5 WHERE id = $6 RETURNING *",
                [nome, sala, modalidade_id, status, pontos, id]
            );

            return updateTime;
        } catch (error) {
            throw error;
        }
    }

    async getTimeByModalidadeID(modalidade_id) {
        try {
            const time = await this.pg.manyOrNone(`
                SELECT 
                    times.id, 
                    times.nome, 
                    times.sala, 
                    times.modalidade_id, 
                    times.status, 
                    times.pontos, 
                    SUM(CASE WHEN confronto.winner = TRUE THEN 1 ELSE 0 END) AS vitorias, 
                    SUM(CASE WHEN confronto.winner = FALSE AND confronto.tie = FALSE THEN 1 ELSE 0 END) AS derrotas,
                    SUM(CASE WHEN confronto.tie = TRUE THEN 1 ELSE 0 END) AS empates
                FROM 
                    times 
                LEFT JOIN 
                    confronto 
                ON 
                    times.id = confronto.timeId 
                WHERE 
                    LOWER(times.modalidade_id) LIKE $1 
                GROUP BY 
                    times.id, 
                    times.nome
            `, modalidade_id.toLocaleLowerCase());
            return time;
        } catch (error) {
            throw error;
        }
    }

    async getTimeByCampeonatoID(campeonato_id, status, name) {
        try {
            if (name) {
                const time = await this.pg.manyOrNone(
                    "SELECT times.id AS time_id, times.nome AS time_nome, times.sala AS time_sala, times.modalidade_id, times.status, times.pontos, modalidade.nome_modalidade, modalidade.limite_pessoas, modalidade.valor_por_pessoa, modalidade.campeonato_id FROM times INNER JOIN modalidade ON times.modalidade_id = modalidade.id WHERE LOWER(times.status) LIKE $1 AND LOWER(modalidade.campeonato_id) LIKE $2 AND LOWER(times.nome) ILIKE $3",
                    [status.toLocaleLowerCase(), campeonato_id.toLocaleLowerCase(), `%${name.toLocaleLowerCase()}%`]
                );
                return time;
            } else {
                const time = await this.pg.manyOrNone(
                    "SELECT times.id AS time_id, times.nome AS time_nome, times.sala AS time_sala, times.modalidade_id, times.status, times.pontos, modalidade.nome_modalidade, modalidade.limite_pessoas, modalidade.valor_por_pessoa, modalidade.campeonato_id FROM times INNER JOIN modalidade ON times.modalidade_id = modalidade.id WHERE LOWER(times.status) LIKE $1 AND LOWER(modalidade.campeonato_id) LIKE $2",
                    [status.toLocaleLowerCase(), campeonato_id.toLocaleLowerCase()]
                );
                return time;
            }

        } catch (error) {
            throw error;
        }
    }


    async getTimeBySala(sala) {
        try {
            const time = await this.pg.manyOrNone("SELECT * FROM times WHERE LOWER(sala) LIKE $1", sala.toLocaleLowerCase());
            return time;
        } catch (error) {
            throw error;
        }
    }

    async getJogadoresByTimeID(time_id) {
        try {
            const jogador = await this.pg.manyOrNone("SELECT * FROM jogadores WHERE time_id = $1", time_id);
            return jogador;
        } catch (error) {
            throw error;
        }
    }


    async deleteTime(id) {
        try {
            const time = this.getTimesById(id);

            if (!time) {
                return null;
            }

            await this.pg.none("DELETE FROM times WHERE id = $1", id);

            return time;
        } catch (error) {
            throw error;
        }
    }

}

