import pg from "../../database/index.js"
export default class JogadorRepository {
    constructor() {
        this.pg = pg;
    };


    async getAllJogadores() {
        try {
            const allJogadores = await this.pg.manyOrNone("SELECT * FROM jogadores");
            return allJogadores;
        } catch (error) {
            throw error;
        }
    }

    async getJogadorById(id) {
        try {
            const jogador = await this.pg.oneOrNone("SELECT * FROM jogadores WHERE id = $1", id);
            return jogador;
        } catch (error) {
            throw error;
        }
    }

    async createJogador(jogador) {
        try {
            await this.pg.none("INSERT INTO jogadores (id, nome, sala, time_id) VALUES ($1, $2, $3, $4)", [
                jogador.id,
                jogador.nome,
                jogador.sala,
                jogador.time_id
            ]);
            return jogador;
        } catch (error) {
            throw error;
        }
    }

    async updateJogador(id, nome, sala, time_id) {
        try {
            const jogador = this.getJogadorById(id);

            if (!jogador) {
                return null;
            }

            const updateJogador = await this.pg.oneOrNone(
                "UPDATE jogadores SET nome = $1, sala = $2, time_id = $4 WHERE id = $4 RETURNING *",
                [nome, sala, time_id, id]
            );

            return updateJogador;
        } catch (error) {
            throw error;
        }
    }

    async getJogadorByTimeID(time_id) {
        try {
            const jogador = await this.pg.oneOrNone("SELECT * FROM jogadores WHERE time_id = $1", time_id);
            return jogador;
        } catch (error) {
            throw error;
        }
    }

    async getJogadorBySala(sala) {
        try {
            const jogador = await this.pg.oneOrNone("SELECT * FROM jogadores WHERE LOWER(sala) LIKE $1", sala.toLocaleLowerCase());
            return jogador;
        } catch (error) {
            throw error;
        }
    }

    async deleteJogador(id) {
        try {
            await this.pg.none("DELETE FROM jogadores WHERE id = $1", id);
        } catch (error) {
            throw error;
        }
    }


}