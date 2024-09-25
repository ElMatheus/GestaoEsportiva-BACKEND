import Campeonato from "../models/campeonatos/Campeonato.js";
import CampeonatosRepository from "../models/campeonatos/CampeonatosRepository.js";

const campeonatosRepository = new CampeonatosRepository();

export const createCampeonato = async (req, res) => {
    try {
        const { titulo, data_inicio, data_final } = req.body;

        if (data_final < data_inicio) {
            return res.status(400).send({ message: "Data final menor que data inicial" });
        }

        const campeonato = new Campeonato(titulo, data_inicio, data_final);

        await campeonatosRepository.createCampeonato(campeonato);

        return res.status(201).send(campeonato);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar campeonato", error: error.message });
    }
};

export const getCampeonatos = async (req, res) => {
    try {
        const campeonatos = await campeonatosRepository.getCampeonatos();
        return res.status(200).send({ total: campeonatos.length, campeonatos });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar campeonatos", error: error.message });
    }
};

export const getCampeonatoById = async (req, res) => {
    try {
        const { id } = req.params;
        const campeonato = await campeonatosRepository.getCampeonatoById(id);
        if (!campeonato) {
            return res.status(404).send({ message: "Campeonato não encontrado" });
        }
        return res.status(200).send(campeonato);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar campeonato", error: error.message });
    }
};

export const getCampeonatoByTitulo = async (req, res) => {
    try {
        const { titulo } = req.params;
        const { date } = req.query;
        console.log(date);
        const campeonato = await campeonatosRepository.getCampeonatoByTitulo(titulo);
        if (!campeonato) {
            return res.status(404).send({ message: "Campeonato não encontrado" });
        }
        if (date) {
            const campeonatoDate = await campeonatosRepository.getCampeonatoByTituloWithDate(titulo, date);
            return res.status(200).send(campeonatoDate);
        }
        return res.status(200).send(campeonato);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar campeonato", error: error.message });
    }
};

export const updateCampeonato = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, data_inicio, data_final } = req.body;

        const campeonatoVerify = await campeonatosRepository.getCampeonatoById(id);
        if (!campeonatoVerify) {
            return res.status(404).send({ message: "Campeonato não encontrado" });
        }
        const campeonato = new Campeonato(titulo, data_inicio, data_final);

        await campeonatosRepository.updateCampeonato(campeonato, id);

        return res.status(200).send(campeonato);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar campeonato", error: error.message });
    }
};

export const deleteCampeonato = async (req, res) => {
    try {
        const { id } = req.params;
        const campeonato = await campeonatosRepository.deleteCampeonato(id);
        if (!campeonato) {
            return res.status(404).send({ message: "Campeonato não encontrado" });
        }
        return res.status(200).send(campeonato);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar campeonato", error: error.message });
    }
};

export const getDurationCampeonato = async (req, res) => {
    try {
        const { id } = req.params;
        const campeonato = await campeonatosRepository.getCampeonatoById(id);
        if (!campeonato) {
            return res.status(404).send({ message: "Campeonato não encontrado" });
        }
        const duration = campeonato.getDuration();
        return res.status(200).send({ duration });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar duração do campeonato", error: error.message });
    }
};