import { compare, hash } from "bcrypt";

import Campeonato from "../models/campeonato/Campeonato.js";
import CampeonatoRepository from "../models/campeonato/CampeonatoRepository.js";

const campeonatoRepository = new CampeonatoRepository();

// pegar todos os campeonatos
export const getCampeonato = async (req, res) => {
    try {
        const campeonato = await campeonatoRepository.getCampeonato();
        if (!campeonato) {
        return res.status(404).send({ message: "Não há campeonatos cadastrados" });
        }
        return res.status(200).send({ totalCampeonato: campeonato.length, campeonato });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar campeonatos", error: error.message });
    }
};

// pegar campeonato por id
export const getCampeonatoById = async (req, res) => {
    try {
        const { id } = req.params;

        const campeonato = await campeonatoRepository.getCampeonatoById(id);
        if (!campeonato) {
        return res.status(404).send({ message: "Campeonato não encontrado" });
        }

        return res.status(200).send({ message: "Campeonato encontrado", campeonato });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar campeonato", error: error.message });
    }
}

// criar campeonato
export const createCampeonato = async (req, res) => {
    try {
        const { id, titulo, data_inicio, data_final } = req.body;

        const campeonato = new Campeonato(id, titulo, data_inicio, data_final);

        await campeonatoRepository.createCampeonato(campeonato);

        return res.status(201).send({ message: "Campeonato criado com sucesso", campeonato });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar campeonato", error: error.message });
    }
}

// atualizar campeonato
export const updateCampeonato = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, data_inicio, data_final } = req.body;

        await campeonatoRepository.updateCampeonato(id, titulo, data_inicio, data_final);

        return res.status(200).send({ message: "Campeonato atualizado com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar campeonato", error: error.message });
    }
}

// deletar campeonato
export const deleteCampeonato = async (req, res) => {
    try {
        const { id } = req.params;

        await campeonatoRepository.deleteCampeonato(id);

        return res.status(200).send({ message: "Campeonato deletado com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar campeonato", error: error.message });
    }
}

// campeonato pelo titulo
export const getCampeonatoByTitulo = async (req, res) => {
    try {
        const { titulo } = req.params;

        const campeonato = await campeonatoRepository.getCampeonatoByTitulo(titulo);
        if (!campeonato) {
        return res.status(404).send({ message: "Campeonato não encontrado" });
        }

        return res.status(200).send({ message: "Campeonato encontrado", campeonato });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar campeonato", error: error.message });
    }
}

// duração do campeonato
export const getCampeonatoDuracao = async (req, res) => {
    try {
        const { id } = req.params;

        const campeonato = await campeonatoRepository.getCampeonatoById(id);
        if (!campeonato) {
        return res.status(404).send({ message: "Campeonato não encontrado" });
        }

        const data_inicio = new Date(campeonato.data_inicio);
        const data_final = new Date(campeonato.data_final);

        const diff = Math.abs(data_final - data_inicio);
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        return res.status(200).send({ message: "Duração do campeonato", days });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar duração do campeonato", error: error.message });
    }
}
