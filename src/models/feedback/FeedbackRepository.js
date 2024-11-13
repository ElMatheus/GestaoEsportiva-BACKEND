import pg from "../../database/index.js"

export default class FeedbackRepository {
    constructor() {
        this.pg = pg;
    };

    async createFeedback(feedback) {
        try {
            await this.pg.none("INSERT INTO feedback (nome_usuario, comentario, nota, data, resposta) VALUES ($1, $2, $3, $4, $5)", [
                feedback.nome_usuario,
                feedback.comentario,
                feedback.nota,
                feedback.data,
                feedback.resposta
            ]);
            return feedback;
        } catch (error) {
            throw error;
        }
    }

    async getAllFeedbacks() {
        try {
            const allFeedbacks = await this.pg.manyOrNone("SELECT * FROM feedback");
            return allFeedbacks;
        } catch (error) {
            throw error;
        }
    }

    async getFeedbackById(id) {
        try {
            const feedback = await this.pg.oneOrNone("SELECT * FROM feedback WHERE id = $1", id);
            return feedback;
        } catch (error) {
            throw error;
        }
    }

    async updateFeedback(id, nome_usuario, comentario, nota, data, resposta) {
        try {
            const feedback = this.getFeedbackById(id);

            if (!feedback) {
                return null;
            }

            const updateFeedback = await this.pg.oneOrNone(
                "UPDATE feedback SET nome_usuario = $1, comentario = $2, nota = $3, data = $4, reposta = $5 WHERE id = $6 RETURNING *",
                [nome_usuario, comentario, nota, data, resposta, id]
            );

            return updateFeedback;
        } catch (error) {
            throw error;
        }
    }

    async deleteFeedback(id) {
        try {
            const feedback = this.getFeedbackById(id);

            if (!feedback) {
                return null;
            }

            await this.pg.none("DELETE FROM feedback WHERE id = $1", id);

            return feedback;
        } catch (error) {
            throw error;
        }
    }

    async getFeedbackByNota(nota) {
        try {
            const feedback = await this.pg.oneOrNone("SELECT * FROM feedback WHERE nota = $1", nota);
            return feedback;
        } catch (error) {
            throw error;
        }
    }
}