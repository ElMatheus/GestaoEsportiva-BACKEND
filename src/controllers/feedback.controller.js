import Feedback from "../models/feedback/feedback.js";
import FeedbackRepository from "../models/feedback/FeedbackRepository.js";

const feedbackRepository = new FeedbackRepository();

export const createFeedback = async (req, res) => {
    try {
        const { nome_usuario, comentario, nota } = req.body;

        if (!nome_usuario || !comentario || !nota) {
            return res.status(400).send({ message: "Dados obrigatórios faltando" });
        }

        if(nota < 1 || nota > 5) {
            return res.status(400).send({ message: "Nota deve ser entre 1 e 5" });
        }

        const feedback = new Feedback(nome_usuario, comentario, nota);

        await feedbackRepository.createFeedback(feedback);

        return res.status(201).send(feedback);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar feedback", error: error.message });
    }
}

export const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await feedbackRepository.getAllFeedbacks();
        return res.status(200).send({ total: feedbacks.length, feedbacks });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar feedbacks", error: error.message });
    }
}

export const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await feedbackRepository.getFeedbackById(id);
        if (!feedback) {
            return res.status(404).send({ message: "Feedback não encontrado" });
        }
        return res.status(200).send(feedback);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar feedback", error: error.message });
    }
}


export const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_usuario, comentario, nota } = req.body;

        const feedback = await feedbackRepository.getFeedbackById(id);

        if (!feedback) {
            return res.status(404).send({ message: "Feedback não encontrado" });
        }

        const updateFeedback = await feedbackRepository.updateFeedback(id, nome_usuario, comentario, nota);

        return res.status(200).send(updateFeedback);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar feedback", error: error.message });
    }
}

export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await feedbackRepository.getFeedbackById(id);

        if (!feedback) {
            return res.status(404).send({ message: "Feedback não encontrado" });
        }

        await feedbackRepository.deleteFeedback(id);

        return res.status(200).send({ message: "Feedback deletado" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar feedback", error: error.message });
    }
}