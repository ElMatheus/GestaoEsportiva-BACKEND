import Confronto from "../models/confronto/Confronto";
import confrontosRepository from "../models/confrontos/ConfrontosRepository";

const confrontoRepository = new confrontosRepository();

export const getAllConfrontos = async (req, res) => {
    try {
        const confrontos = await confrontoRepository.getConfrontos();

        return res.status(200).send(confrontos);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar confrontos", error: error.message });
    }
};

export const createConfronto = async (req, res) => {
    try {
        const { idPartida, timeId, data, winner, tie, updAtDate, updAtIdUser } = req.body;

        const confronto = new Confronto(idPartida, timeId, data, winner, tie, updAtDate, updAtIdUser);

        await confrontoRepository.createConfronto(confronto);

        return res.status(201).send(confronto);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar confronto", error: error.message });
    }
};