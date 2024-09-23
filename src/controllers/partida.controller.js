import Partida from "../models/partida/Partida";
import partidasRepository from "../models/partida/PartidaRepository";

export const createPartida = async (req, res) => {
    try {
        const { data, anotacao, updateUser } = req.body;

        const partida = new Partida(data, anotacao, updateUser);

        await partidasRepository.createPartida(partida);

        return res.status(201).send(partida);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar partida", error: error.message });
    }
};

export const getPartidaById = async (req, res) => {
    try {
        const { id } = req.params;

        const partida = await partidasRepository.getPartidaById(id);

        if (!partida) {
            return res.status(404).send({ message: "Partida não encontrada" });
        }

        return res.status(200).send(partida);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar partida", error: error.message });
    }
};

export const updatePartida = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, anotacao, updateUser } = req.body;

        const partida = new Partida(data, anotacao, updateUser);

        await partidasRepository.updatePartida(id, partida);

        return res.status(200).send(partida);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar partida", error: error.message });
    }
};