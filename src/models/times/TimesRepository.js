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
            const time = this.getTimeById(id);

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
            const time = await this.pg.oneOrNone("SELECT * FROM times WHERE LOWER(modalidade_id) LIKE $1", modalidade_id.toLocaleLowerCase());
            return time;
        } catch (error) {
            throw error;
        }
    }


    async getTimeBySala(sala) {
        try {
            const time = await this.pg.oneOrNone("SELECT * FROM times WHERE LOWER(sala) LIKE $1", sala.toLocaleLowerCase());
            return time;
        } catch (error) {
            throw error;
        }
    }


    async deleteTime(id) {
        try {
            const time = this.getTimeById(id);

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

