import Confronto from "../models/confrontos/Confronto.js";
import ConfrontosRepository from "../models/confrontos/ConfrontosRepository.js";
import PartidaRepository from "../models/partida/PartidaRepository.js"; 
import TimesRepository from '../models/times/TimesRepository.js';

const confrontoRepository = new ConfrontosRepository();
const partidaRepository = new PartidaRepository();
const timesRepository = new TimesRepository();

export const getAllConfrontos = async (req, res) => {
    try {
        const confrontos = await confrontoRepository.getConfrontos();

        return res.status(200).send(confrontos);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar confrontos", error: error.message });
    }
};

export const getConfrontoById = async (req, res) => {
    try {
        const { id } = req.params;

        const confronto = await confrontoRepository.getConfrontoById(id);

        return res.status(200).send(confronto);
    }
    catch (error) {
        return res.status(500).send({ message: "Erro ao buscar confronto", error: error.message });
    }
}

export const getConfrontosByIdPartida = async (req, res) => {
    try {
        const { id } = req.params;

        const confrontos = await confrontoRepository.getConfrontosByIdPartida(id);

        return res.status(200).send(confrontos);
    }
    catch (error) {
        return res.status(500).send({ message: "Erro ao buscar confrontos", error: error.message });
    }
}

export const createConfronto = async (req, res) => {
    try {
        const { idPartida, timeId, data, winner, tie, updAtDate, updAtIdUser } = req.body;
        const verificaPartida = await partidaRepository.getPartidaById(idPartida);
        const verificaTime = await timesRepository.getTimesById(timeId);

        if (!verificaPartida) {
            return res.status(404).send({ message: "Partida não encontrada" });
        };

        if (!verificaTime) {
            return res.status(404).send({ message: "Time não encontrado" });
        };

        const confronto = new Confronto(idPartida, timeId, data, winner, tie, updAtIdUser);

        await confrontoRepository.createConfronto(confronto);

        return res.status(201).send(confronto);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar confronto", error: error.message });
    }
};