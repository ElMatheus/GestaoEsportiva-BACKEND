import pg from "../../database/index.js"
export default class UsersRepository {
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

    async getTimeById(id) {
        try {
            const time = await this.pg.oneOrNone("SELECT * FROM times WHERE id = $1", id);
            return time;
        } catch (error) {
            throw error;
        }
    }

    async createTime(time) {
        try {
            await this.pg.none("INSERT INTO times (id, nome, modalidade_id, status, pontos) VALUES ($1, $2, $3, $4)", [
                time.id,
                time.nome,
                time.modalidade_id,
                time.status,
            ]);
            return time;
        } catch (error) {
            throw error;
        }
    }

    async updateTime(id, nome, modalidade_id, status, pontos) {
        try {
            const time = this.getTimeById(id);

            if (!time) {
                return null;
            }

            const updateTime = await this.pg.oneOrNone(
                "UPDATE times SET nome = $1, modalidade_id = $2, status = $3, pontos = $4 WHERE id = $5 RETURNING *",
                [nome, modalidade_id, status, pontos, id]
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

