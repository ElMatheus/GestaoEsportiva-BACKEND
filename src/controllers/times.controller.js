import Times from '../models/times/Times.js';
import TimesRepository from '../models/times/TimesRepository.js';

const timesRepository = new TimesRepository();

export const createTimes = async (req, res) => {
    try {
        const { nome, sala, modalidade_id, status } = req.body;

        const times = new Times(nome, sala, modalidade_id, status);

        await timesRepository.createTimes(times);

        return res.status(201).send(times);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar time", error: error.message });
    }
}

export const getTimes = async (req, res) => {
    try {
        const times = await timesRepository.getAllTimes();

        return res.status(200).send(times);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar times", error: error.message });
    }
}

export const getTimesById = async (req, res) => {
    try {
        const { id } = req.params;

        const times = await timesRepository.getTimesById(id);

        if (!times) {
            return res.status(404).send({ message: "Time não encontrado" });
        }

        return res.status(200).send({ message: "Time encontrado", times });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar time", error: error.message });
    }
}

export const updateTimes = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sala, modalidade_id, status, pontos } = req.body;

        const times = await timesRepository.updateTimes(id, nome, sala, modalidade_id, status, pontos);

        if (!times) {
            return res.status(404).send({ message: "Time não encontrado" });
        }

        return res.status(200).send({ message: "Time atualizado", times });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar time", error: error.message });
    }
}

export const getTimesByModalidadeID = async (req, res) => {
    try {
        const { modalidade_id } = req.params;

        const times = await timesRepository.getTimesByModalidadeID(modalidade_id);

        return res.status(200).send(times);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar time", error: error.message });
    }
}

export const getTimesBySala = async (req, res) => {
    try {
        const { sala } = req.params;

        const times = await timesRepository.getTimesBySala(sala);

        return res.status(200).send(times);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar time", error: error.message });
    }
}

export const deleteTimes = async (req, res) => {
    try {
        const { id } = req.params;

        const times = await timesRepository.getTimesById(id);

        if (!times) {
            return res.status(404).send({ message: "Time não encontrado" });
        }

        await timesRepository.deleteTimes(id);

        return res.status(200).send({ message: "Time deletado" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar time", error: error.message });
    }
}