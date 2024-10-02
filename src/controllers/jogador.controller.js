import Jogador from '../models/jogador/Jogador.js';
import JogadorRepository from '../models/jogador/JogadorRepository.js';

const jogadorRepository = new JogadorRepository();

export const createJogador = async (req, res) => {
    try {
        const { nome, sala, time_id } = req.body;

        const jogador = new Jogador(nome, sala, time_id);

        await jogadorRepository.createJogador(jogador);

        return res.json({
            status: "success",
            message: "Jogador criado com sucesso",
            total: jogador.length,
            data: jogador
        })
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar jogador", error: error.message });
    }
}
//faça uma query de create para o insomina 

export const getJogadores = async (req, res) => {
    try {
        const jogadores = await jogadorRepository.getAllJogadores();

        res.json({
            status: "success",
            message: "Jogadores listados com sucesso",
            data: jogadores
        })
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar jogadores", error: error.message });
    }
}

export const getJogadorById = async (req, res) => {
    try {
        const { id } = req.params;

        const jogador = await jogadorRepository.getJogadorById(id);

        if (!jogador) {
            return res.status(404).send({ message: "Jogador não encontrado" });
        }

        return res.status(200).send({ message: "Jogador encontrado", jogador });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar jogador", error: error.message });
    }
}

export const updateJogador = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sala, time_id } = req.body;

        const jogador = await jogadorRepository.updateJogador(id, nome, sala, time_id);

        if (!jogador) {
            return res.status(404).send({ message: "Jogador não encontrado" });
        }

        return res.status(200).send({ message: "Jogador atualizado", jogador });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar jogador", error: error.message });
    }
}


export const getJogadorByTimeID = async (req, res) => {
    try {
        const { time_id } = req.params;

        const jogador = await jogadorRepository.getJogadorByTimeID(time_id);

        if (!jogador) {
            return res.status(404).send({ message: "Jogador não encontrado" });
        }

        return res.status(200).send({ message: "Jogador encontrado", jogador });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar jogador", error: error.message });
    }
}


export const deleteJogador = async (req, res) => {
    try {
        const { id } = req.params;

        const jogador = await jogadorRepository.getJogadorById(id);

        if (!jogador) {
            return res.status(404).send({ message: "Jogador não encontrado" });
        }

        await jogadorRepository.deleteJogador(id);

        return res.status(200).send({ message: "Jogador deletado", jogador });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar jogador", error: error.message });
    }
}

export const getJogadorBySala = async (req, res) => {
    try {
        const { sala } = req.params;

        const jogador = await jogadorRepository.getJogadorBySala(sala);

        if (!jogador) {
            return res.status(404).send({ message: "Jogador não encontrado" });
        }

        return res.status(200).send({ message: "Jogador encontrado", jogador });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar jogador", error: error.message });
    }
}

