import Partida from "../models/partida/Partida.js";
import PartidaRepository from "../models/partida/PartidaRepository.js";

const partidasRepository = new PartidaRepository();

export const getPartidas = async (req, res) => {
    try {
        const partidas = await partidasRepository.getPartidas();
        const { data } = req.query;

        if (data) {
            const partida = await partidasRepository.getPartidaByData(data);

            if (!partida) {
                return res.status(404).send({ message: "Partida não encontrada" });
            }

            return res.status(200).send(partida);
        }

        return res.status(200).send(partidas);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar partidas", error: error.message });
    }
};

export const getPartidaAndConfrontos = async (req, res) => {
    try {
        const partidas = await partidasRepository.getPartidas();
        const confrontos = await partidasRepository.getPartidaAndConfrontos();
        const { data } = req.query;

        if (data) {
            const partida = await partidasRepository.getPartidaByData(data);

            if (!partida) {
                return res.status(404).send({ message: "Partida não encontrada" });
            }
        }
        const confrontosDaPartida = partidas.map(partida => {
            partida.confrontos = confrontos.filter(confronto => confronto.id_partida == partida.id).map(confronto => ({
                confrontoid: confronto.confronto_id,
                timeid: confronto.timeid,
                winner: confronto.winner,
                tie: confronto.tie,
                time: {
                    nome: confronto.nome_time,
                    modalidade_id: confronto.modalidade_id_time
                }
            })
            );
            return partida;
        });
        return res.json({
            status: "sucess",
            message: "Partida encontrada",
            total: confrontosDaPartida.length,
            data: confrontosDaPartida
        });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar partidas", error: error.message });
    }
}

export const getPartidaAndConfrontosBymodalidade = async (req, res) => {
    try {
        const { modalidade_id } = req.params;
        const partidas = await partidasRepository.getPartidas();
        const confrontos = await partidasRepository.getPartidaAndConfrontosBymodalidade(modalidade_id);

        const confrontosDaPartida = partidas.map(partida => {
            partida.confrontos = confrontos.filter(confronto => confronto.id_partida == partida.id).map(confronto => ({
                confrontoid: confronto.confronto_id,
                timeid: confronto.timeid,
                winner: confronto.winner, // Ensure winner remains static
                tie: confronto.tie,
                time: {
                    nome: confronto.nome_time,
                    modalidade_id: confronto.modalidade_id_time
                }
            }));
            return partida.confrontos.length > 0 ? partida : null;
        }).filter(partida => partida != null);

        return res.json({
            status: "success",
            message: "Partida encontrada",
            total: confrontosDaPartida.length,
            data: confrontosDaPartida
        });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar partidas", error: error.message });
    }
};

export const createPartida = async (req, res) => {
    try {
        const { data, anotacao, updateUser } = req.body;

        const partida = new Partida(data, anotacao, updateUser);

        // Chame o repositório e capture a nova partida retornada
        const novaPartida = await partidasRepository.createPartida(partida);

        return res.status(201).send(novaPartida); // Retorna a nova partida com ID
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar partida", error: error.message });
    }
};


// faça uma query de create para insomina
//  {
//      "data": "2022-12-31",
//      "anotacao": "Partida de teste",
//      "updateUser": 1
//  }

export const getPartidaById = async (req, res) => {
    try {
        const { id } = req.params;

        const partida = await partidasRepository.getPartidaById(id);
        const confrontos = await partidasRepository.getPartidaAndConfrontos();

        if (!partida) {
            return res.status(404).send({ message: "Partida não encontrada" });
        }

        partida.confrontos = confrontos.filter(confronto => confronto.id_partida == partida.id).map(confronto => ({
            id: confronto.confronto_id,
            timeid: confronto.timeid,
            winner: confronto.winner,
            tie: confronto.tie
        }));

        return res.json({
            status: "sucess",
            message: "Partida encontrada",
            data: partida
        });

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

export const deletePartida = async (req, res) => {
    try {
        const { id } = req.params;

        const partida = await partidasRepository.getPartidaById(id);

        if (!partida) {
            return res.status(404).send({ message: "Partida não encontrada" });
        }

        await partidasRepository.deletePartida(id);

        return res.status(200).send({ message: "Partida deletada com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar partida", error: error.message });
    }
};